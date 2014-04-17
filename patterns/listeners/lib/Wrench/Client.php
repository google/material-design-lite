<?php

namespace Wrench;

use Wrench\Payload\Payload;

use Wrench\Payload\PayloadHandler;

use Wrench\Util\Configurable;

use Wrench\Socket\ClientSocket;
use Wrench\Protocol\Protocol;
use Wrench\Protocol\Rfc6455Protocol;

use \InvalidArgumentException;
use \RuntimeException;

/**
 * Client class
 *
 * Represents a Wrench client
 */
class Client extends Configurable
{
    /**
     * @var int bytes
     */
    const MAX_HANDSHAKE_RESPONSE = '1500';

    /**
     * @var string
     */
    protected $uri;

    /**
     * @var string
     */
    protected $origin;

    /**
     * @var ClientSocket
     */
    protected $socket;

    /**
     * Request headers
     *
     * @var array
     */
    protected $headers = array();

    /**
     * Whether the client is connected
     *
     * @var boolean
     */
    protected $connected = false;

    /**
     * @var PayloadHandler
     */
    protected $payloadHandler = null;

    /**
     * Complete received payloads
     *
     * @var array<Payload>
     */
    protected $received = array();

    /**
     * Constructor
     *
     * @param string $uri
     * @param string $origin  The origin to include in the handshake (required
     *                          in later versions of the protocol)
     * @param array  $options (optional) Array of options
     *                         - socket   => Socket instance (otherwise created)
     *                         - protocol => Protocol
     */
    public function __construct($uri, $origin, array $options = array())
    {
        parent::__construct($options);

        $uri = (string)$uri;
        if (!$uri) {
            throw new InvalidArgumentException('No URI specified');
        }
        $this->uri = $uri;

        $origin = (string)$origin;
        if (!$origin) {
            throw new InvalidArgumentException('No origin specified');
        }
        $this->origin = $origin;

        $this->protocol->validateUri($this->uri);
        $this->protocol->validateOriginUri($this->origin);

        $this->configureSocket();
        $this->configurePayloadHandler();
    }

    /**
     * Configure options
     *
     * @param array $options
     * @return void
     */
    protected function configure(array $options)
    {
        $options = array_merge(array(
            'socket_class'     => 'Wrench\\Socket\\ClientSocket',
            'on_data_callback' => null
        ), $options);

        parent::configure($options);
    }

    /**
     * Configures the client socket
     */
    protected function configureSocket()
    {
        $class = $this->options['socket_class'];
        $this->socket = new $class($this->uri);
    }

    /**
     * Configures the payload handler
     */
    protected function configurePayloadHandler()
    {
        $this->payloadHandler = new PayloadHandler(array($this, 'onData'), $this->options);
    }

    /**
     * Payload receiver
     *
     * Public because called from our PayloadHandler. Don't call us, we'll call
     * you (via the on_data_callback option).
     *
     * @param Payload $payload
     */
    public function onData(Payload $payload)
    {
        $this->received[] = $payload;
        if (($callback = $this->options['on_data_callback'])) {
            call_user_func($callback, $payload);
        }
    }

    /**
     * Adds a request header to be included in the initial handshake
     *
     * For example, to include a Cookie header
     *
     * @param string $name
     * @param string $value
     * @return void
     */
    public function addRequestHeader($name, $value)
    {
        $this->headers[$name] = $value;
    }

    /**
     * Sends data to the socket
     *
     * @param string $data
     * @param string $type Payload type
     * @param boolean $masked
     * @return boolean Success
     */
    public function sendData($data, $type = Protocol::TYPE_TEXT, $masked = true)
    {
        if (is_string($type) && isset(Protocol::$frameTypes[$type])) {
            $type = Protocol::$frameTypes[$type];
        }

        $payload = $this->protocol->getPayload();

        $payload->encode(
            $data,
            $type,
            $masked
        );

        return $payload->sendToSocket($this->socket);
    }

    /**
     * Receives data sent by the server
     *
     * @param callable $callback
     * @return array<Payload> Payload received since the last call to receive()
     */
    public function receive()
    {
        if (!$this->isConnected()) {
            return false;
        }

        $data = $this->socket->receive();

        if (!$data) {
            return $data;
        }

        $old = $this->received;
        $this->payloadHandler->handle($data);
        return array_diff($this->received, $old);
    }

    /**
     * Connect to the Wrench server
     *
     * @return boolean Whether a new connection was made
     */
    public function connect()
    {
        if ($this->isConnected()) {
            return false;
        }

        $this->socket->connect();

        $key       = $this->protocol->generateKey();
        $handshake = $this->protocol->getRequestHandshake(
            $this->uri,
            $key,
            $this->origin,
            $this->headers
        );

        $this->socket->send($handshake);
        $response = $this->socket->receive(self::MAX_HANDSHAKE_RESPONSE);
        return ($this->connected =
                    $this->protocol->validateResponseHandshake($response, $key));
    }

    /**
     * Whether the client is currently connected
     *
     * @return boolean
     */
    public function isConnected()
    {
        return $this->connected;
    }

    /**
     * @todo Bug: what if connect has been called twice. The first socket never
     *        gets closed.
     */
    public function disconnect()
    {
        if ($this->socket) {
            $this->socket->disconnect();
        }
        $this->connected = false;
    }


}
