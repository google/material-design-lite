<?php
namespace Wrench\Socket;

use Wrench\Socket\UriSocket;

/**
 * Options:
 *  - timeout_connect      => int, seconds, default 2
 */
class ClientSocket extends UriSocket
{
    /**
     * Default connection timeout
     *
     * @var int seconds
     */
    const TIMEOUT_CONNECT = 2;

    /**
     * @see Wrench\Socket.Socket::configure()
     *   Options include:
     *     - ssl_verify_peer       => boolean, whether to perform peer verification
     *                                 of SSL certificate used
     *     - ssl_allow_self_signed => boolean, whether ssl_verify_peer allows
     *                                 self-signed certs
     *     - timeout_connect       => int, seconds, default 2
     */
    protected function configure(array $options)
    {
        $options = array_merge(array(
            'timeout_connect'       => self::TIMEOUT_CONNECT,
            'ssl_verify_peer'       => false,
            'ssl_allow_self_signed' => true
        ), $options);

        parent::configure($options);
    }

    /**
     * Connects to the given socket
     */
    public function connect()
    {
        if ($this->isConnected()) {
            return true;
        }

        $errno = null;
        $errstr = null;

        $this->socket = stream_socket_client(
            $this->getUri(),
            $errno,
            $errstr,
            $this->options['timeout_connect'],
            STREAM_CLIENT_CONNECT,
            $this->getStreamContext()
        );

        if (!$this->socket) {
            throw new \Wrench\Exception\ConnectionException(sprintf(
                'Could not connect to socket: %s (%d)',
                $errstr,
                $errno
            ));
        }

        stream_set_timeout($this->socket, $this->options['timeout_socket']);

        return ($this->connected = true);
    }

    public function reconnect()
    {
        $this->disconnect();
        $this->connect();
    }

    /**
     * @see Wrench\Socket.UriSocket::getSocketStreamContextOptions()
     */
    protected function getSocketStreamContextOptions()
    {
        $options = array();
        return $options;
    }

    /**
     * @see Wrench\Socket.UriSocket::getSslStreamContextOptions()
     */
    protected function getSslStreamContextOptions()
    {
        $options = array();

        if ($this->options['ssl_verify_peer']) {
            $options['verify_peer'] = true;
        }

        if ($this->options['ssl_allow_self_signed']) {
            $options['allow_self_signed'] = true;
        }

        return $options;
    }
}