<?php

namespace Wrench;

use Wrench\Payload\PayloadHandler;

use Wrench\Protocol\Protocol;

use Wrench\Payload\Payload;

use Wrench\Util\Configurable;
use Wrench\Socket\ServerClientSocket;
use Wrench\Server;
use Wrench\Exception as WrenchException;
use Wrench\Exception\CloseException;
use Wrench\Exception\ConnectionException;
use Wrench\Exception\HandshakeException;
use Wrench\Exception\BadRequestException;

use \Exception;
use \RuntimeException;

/**
 * Represents a client connection on the server side
 *
 * i.e. the `Server` manages a bunch of `Connection`s
 */
class Connection extends Configurable
{
    /**
     * The connection manager
     *
     * @var Wrench\ConnectionManager
     */
    protected $manager;

    /**
     * Socket object
     *
     * Wraps the client connection resource
     *
     * @var ServerClientSocket
     */
    protected $socket;

    /**
     * Whether the connection has successfully handshaken
     *
     * @var boolean
     */
    protected $handshaked = false;

    /**
     * The application this connection belongs to
     *
     * @var Application
     */
    protected $application = null;

    /**
     * The IP address of the client
     *
     * @var string
     */
    protected $ip;

    /**
     * The port of the client
     *
     * @var int
     */
    protected $port;

    /**
     * The array of headers included with the original request (like Cookie for example)
     * The headers specific to the web sockets handshaking have been stripped out
     *
     * @var array
     */
    protected $headers = null;

    /**
     * The array of query parameters included in the original request
     * The array is in the format 'key' => 'value'
     *
     * @var array
     */
    protected $queryParams = null;

    /**
     * Connection ID
     *
     * @var string|null
     */
    protected $id = null;

    /**
     * @var PayloadHandler
     */
    protected $payloadHandler;

    /**
     * Constructor
     *
     * @param Server $server
     * @param ServerClientSocket $socket
     * @param array $options
     * @throws InvalidArgumentException
     */
    public function __construct(
        ConnectionManager $manager,
        ServerClientSocket $socket,
        array $options = array()
    ) {
        $this->manager = $manager;
        $this->socket = $socket;


        parent::__construct($options);

        $this->configureClientInformation();
        $this->configurePayloadHandler();

        $this->log('Connected');
    }

    /**
     * Gets the connection manager of this connection
     *
     * @return \Wrench\ConnectionManager
     */
    public function getConnectionManager()
    {
        return $this->manager;
    }

    /**
     * @see Wrench\Util.Configurable::configure()
     */
    protected function configure(array $options)
    {
        $options = array_merge(array(
            'connection_id_secret' => 'asu5gj656h64Da(0crt8pud%^WAYWW$u76dwb',
            'connection_id_algo'   => 'sha512',
        ), $options);

        parent::configure($options);
    }

    protected function configurePayloadHandler()
    {
        $this->payloadHandler = new PayloadHandler(
            array($this, 'handlePayload'),
            $this->options
        );
    }

    /**
     * @throws RuntimeException
     */
    protected function configureClientInformation()
    {
        $this->ip = $this->socket->getIp();
        $this->port = $this->socket->getPort();
        $this->configureClientId();
    }

    /**
     * Configures the client ID
     *
     * We hash the client ID to prevent leakage of information if another client
     * happens to get a hold of an ID. The secret *must* be lengthy, and must
     * be kept secret for this to work: otherwise it's trivial to search the space
     * of possible IP addresses/ports (well, if not trivial, at least very fast).
     */
    protected function configureClientId()
    {
        $message = sprintf(
            '%s:uri=%s&ip=%s&port=%s',
            $this->options['connection_id_secret'],
            rawurlencode($this->manager->getUri()),
            rawurlencode($this->ip),
            rawurlencode($this->port)
        );

        $algo = $this->options['connection_id_algo'];

        if (extension_loaded('gmp')) {
            $hash = hash($algo, $message);
            $hash = gmp_strval(gmp_init('0x' . $hash, 16), 62);
        } else {
            // @codeCoverageIgnoreStart
            $hash = hash($algo, $message);
            // @codeCoverageIgnoreEnd
        }

        $this->id = $hash;
    }

    /**
     * Data receiver
     *
     * Called by the connection manager when the connection has received data
     *
     * @param string $data
     */
    public function onData($data)
    {
        if (!$this->handshaked) {
            return $this->handshake($data);
        }
        return $this->handle($data);
    }

    /**
     * Performs a websocket handshake
     *
     * @param string $data
     * @throws BadRequestException
     * @throws HandshakeException
     * @throws WrenchException
     */
    public function handshake($data)
    {
        try {
            list($path, $origin, $key, $extensions, $protocol, $headers, $params)
                = $this->protocol->validateRequestHandshake($data);

            $this->headers = $headers;
            $this->queryParams = $params;

            $this->application = $this->manager->getApplicationForPath($path);
            if (!$this->application) {
                throw new BadRequestException('Invalid application');
            }

            $this->manager->getServer()->notify(
                Server::EVENT_HANDSHAKE_REQUEST,
                array($this, $path, $origin, $key, $extensions)
            );

            $response = $this->protocol->getResponseHandshake($key);

            if (!$this->socket->isConnected()) {
                throw new HandshakeException('Socket is not connected');
            }

            if ($this->socket->send($response) === false) {
                throw new HandshakeException('Could not send handshake response');
            }

            $this->handshaked = true;

            $this->log(sprintf(
                'Handshake successful: %s:%d (%s) connected to %s',
                $this->getIp(),
                $this->getPort(),
                $this->getId(),
                $path
            ), 'info');

            $this->manager->getServer()->notify(
                Server::EVENT_HANDSHAKE_SUCCESSFUL,
                array($this)
            );

            if (method_exists($this->application, 'onConnect')) {
                $this->application->onConnect($this);
            }
        } catch (WrenchException $e) {
            $this->log('Handshake failed: ' . $e, 'err');
            $this->close($e);
        }
    }

    /**
     * Returns a string export of the given binary data
     *
     * @param string $data
     * @return string
     */
    protected function export($data)
    {
        $export = '';
        foreach (str_split($data) as $chr) {
            $export .= '\\x' . ord($chr);
        }
    }

    /**
     * Handle data received from the client
     *
     * The data passed in may belong to several different frames across one or
     * more protocols. It may not even contain a single complete frame. This method
     * manages slotting the data into separate payload objects.
     *
     * @todo An endpoint MUST be capable of handling control frames in the
     *        middle of a fragmented message.
     * @param string $data
     * @return void
     */
    public function handle($data)
    {
        $this->payloadHandler->handle($data);
    }

    /**
     * Handle a complete payload received from the client
     *
     * Public because called from our PayloadHandler
     *
     * @param string $payload
     */
    public function handlePayload(Payload $payload)
    {
        $app = $this->getClientApplication();

        $this->log('Handling payload: ' . $payload->getPayload(), 'debug');

        switch ($type = $payload->getType()) {
            case Protocol::TYPE_TEXT:
                if (method_exists($app, 'onData')) {
                    $app->onData($payload, $this);
                }
                return;

            case Protocol::TYPE_BINARY:
                if(method_exists($app, 'onBinaryData')) {
                    $app->onBinaryData($payload, $this);
                } else {
                    $this->close(1003);
                }
            break;

            case Protocol::TYPE_PING:
                $this->log('Ping received', 'notice');
                $this->send($payload->getPayload(), Protocol::TYPE_PONG);
                $this->log('Pong!', 'debug');
            break;

            /**
             * A Pong frame MAY be sent unsolicited.  This serves as a
             * unidirectional heartbeat.  A response to an unsolicited Pong
             * frame is not expected.
             */
            case Protocol::TYPE_PONG:
                $this->log('Received unsolicited pong', 'info');
            break;

            case Protocol::TYPE_CLOSE:
                $this->log('Close frame received', 'notice');
                $this->close();
                $this->log('Disconnected', 'info');
            break;

            default:
                throw new ConnectionException('Unhandled payload type');
        }
    }

    /**
     * Sends the payload to the connection
     *
     * @param string $payload
     * @param string $type
     * @throws HandshakeException
     * @throws ConnectionException
     * @return boolean
     */
    public function send($data, $type = Protocol::TYPE_TEXT)
    {
        if (!$this->handshaked) {
            throw new HandshakeException('Connection is not handshaked');
        }

        $payload = $this->protocol->getPayload();

        // Servers don't send masked payloads
        $payload->encode($data, $type, false);

        if (!$payload->sendToSocket($this->socket)) {
            $this->log('Could not send payload to client', 'warn');
            throw new ConnectionException('Could not send data to connection: ' . $this->socket->getLastError());
        }

        return true;
    }

    /**
     * Processes data on the socket
     *
     * @throws CloseException
     */
    public function process()
    {
        $data = $this->socket->receive();
        $bytes = strlen($data);

        if ($bytes === 0 || $data === false) {
            throw new CloseException('Error reading data from socket: ' . $this->socket->getLastError());
        }

        $this->onData($data);
    }

    /**
     * Closes the connection according to the WebSocket protocol
     *
     * If an endpoint receives a Close frame and that endpoint did not
     * previously send a Close frame, the endpoint MUST send a Close frame
     * in response.  It SHOULD do so as soon as is practical.  An endpoint
     * MAY delay sending a close frame until its current message is sent
     * (for instance, if the majority of a fragmented message is already
     * sent, an endpoint MAY send the remaining fragments before sending a
     * Close frame).  However, there is no guarantee that the endpoint which
     * has already sent a Close frame will continue to process data.

     * After both sending and receiving a close message, an endpoint
     * considers the WebSocket connection closed, and MUST close the
     * underlying TCP connection.  The server MUST close the underlying TCP
     * connection immediately; the client SHOULD wait for the server to
     * close the connection but MAY close the connection at any time after
     * sending and receiving a close message, e.g. if it has not received a
     * TCP close from the server in a reasonable time period.
     *
     * @param int|Exception $statusCode
     * @return boolean
     */
    public function close($code = Protocol::CLOSE_NORMAL)
    {
        try {
            if (!$this->handshaked) {
                $response = $this->protocol->getResponseError($code);
                $this->socket->send($response);
            } else {
                $response = $this->protocol->getCloseFrame($code);
                $this->socket->send($response);
            }
        } catch (Exception $e) {
            $this->log('Unable to send close message', 'warning');
        }

        if ($this->application && method_exists($this->application, 'onDisconnect')) {
            $this->application->onDisconnect($this);
        }

        $this->socket->disconnect();
        $this->manager->removeConnection($this);
    }

    /**
     * Logs a message
     *
     * @param string $message
     * @param string $priority
     */
    public function log($message, $priority = 'info')
    {
        $this->manager->log(sprintf(
            '%s: %s:%d (%s): %s',
            __CLASS__,
            $this->getIp(),
            $this->getPort(),
            $this->getId(),
            $message
        ), $priority);
    }

    /**
     * Gets the IP address of the connection
     *
     * @return string Usually dotted quad notation
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * Gets the port of the connection
     *
     * @return int
     */
    public function getPort()
    {
        return $this->port;
    }

    /**
     * Gets the non-web-sockets headers included with the original request
     *
     * @return array
     */
    public function getHeaders()
    {
        return $this->headers;
    }

    /**
     * Gets the query parameters included with the original request
     *
     * @return array
     */
    public function getQueryParams()
    {
        return $this->queryParams;
    }

    /**
     * Gets the connection ID
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Gets the socket object
     *
     * @return Socket\ServerClientSocket
     */
    public function getSocket()
    {
        return $this->socket;
    }

    /**
     * Gets the client application
     *
     * @return Application
     */
    public function getClientApplication()
    {
        return (isset($this->application)) ? $this->application : false;
    }
}