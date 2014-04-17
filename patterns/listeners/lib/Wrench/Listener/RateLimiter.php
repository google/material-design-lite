<?php

namespace Wrench\Listener;

use Wrench\Util\Configurable;
use Wrench\Server;

class RateLimiter extends Configurable implements Listener
{
    /**
     * The server being limited
     *
     * @var Server
     */
    protected $server;

    /**
     * Connection counts per IP address
     *
     * @var array<int>
     */
    protected $ips = array();

    /**
     * Request tokens per IP address
     *
     * @var array<array<int>>
     */
    protected $requests = array();

    /**
     * Constructor
     *
     * @param array $options
     */
    public function __construct(array $options = array())
    {
        parent::__construct($options);
    }

    /**
     * @param array $options
     */
    protected function configure(array $options)
    {
        $options = array_merge(array(
            'connections'         => 200, // Total
            'connections_per_ip'  => 5,   // At once
            'requests_per_minute' => 200  // Per connection
        ), $options);

        parent::configure($options);
    }

    /**
     * @see Wrench\Listener.Listener::listen()
     */
    public function listen(Server $server)
    {
        $this->server = $server;

        $server->addListener(
            Server::EVENT_SOCKET_CONNECT,
            array($this, 'onSocketConnect')
        );

        $server->addListener(
            Server::EVENT_SOCKET_DISCONNECT,
            array($this, 'onSocketDisconnect')
        );

        $server->addListener(
            Server::EVENT_CLIENT_DATA,
            array($this, 'onClientData')
        );
    }

    /**
     * Event listener
     *
     * @param resource $socket
     * @param Connection $connection
     */
    public function onSocketConnect($socket, $connection)
    {
        $this->checkConnections($connection);
        $this->checkConnectionsPerIp($connection);
    }

    /**
     * Event listener
     *
     * @param resource $socket
     * @param Connection $connection
     */
    public function onSocketDisconnect($socket, $connection)
    {
        $this->releaseConnection($connection);
    }

    /**
     * Event listener
     *
     * @param resource $socket
     * @param Connection $connection
     */
    public function onClientData($socket, $connection)
    {
        $this->checkRequestsPerMinute($connection);
    }

    /**
     * Idempotent
     *
     * @param Connection $connection
     */
    protected function checkConnections($connection)
    {
        $connections = $connection->getConnectionManager()->count();

        if ($connections > $this->options['connections']) {
            $this->limit($connection, 'Max connections');
        }
    }

    /**
     * NOT idempotent, call once per connection
     *
     * @param Connection $connection
     */
    protected function checkConnectionsPerIp($connection)
    {
        $ip = $connection->getIp();

        if (!$ip) {
            $this->log('Cannot check connections per IP', 'warning');
            return;
        }

        if (!isset($this->ips[$ip])) {
            $this->ips[$ip] = 1;
        } else {
            $this->ips[$ip] = min(
                $this->options['connections_per_ip'],
                $this->ips[$ip] + 1
            );
        }

        if ($this->ips[$ip] > $this->options['connections_per_ip']) {
            $this->limit($connection, 'Connections per IP');
        }
    }

    /**
     * NOT idempotent, call once per disconnection
     *
     * @param Connection $connection
     */
    protected function releaseConnection($connection)
    {
        $ip = $connection->getIp();

        if (!$ip) {
            $this->log('Cannot release connection', 'warning');
            return;
        }

        if (!isset($this->ips[$ip])) {
            $this->ips[$ip] = 0;
        } else {
            $this->ips[$ip] = max(0, $this->ips[$ip] - 1);
        }

        unset($this->requests[$connection->getId()]);
    }

    /**
     * NOT idempotent, call once per data
     *
     * @param Connection $connection
     */
    protected function checkRequestsPerMinute($connection)
    {
        $id = $connection->getId();

        if (!isset($this->requests[$id])) {
            $this->requests[$id] = array();
        }

        // Add current token
        $this->requests[$id][] = time();

        // Expire old tokens
        while (reset($this->requests[$id]) < time() - 60) {
            array_shift($this->requests[$id]);
        }

        if (count($this->requests[$id]) > $this->options['requests_per_minute']) {
            $this->limit($connection, 'Requests per minute');
        }
    }

    /**
     * Limits the given connection
     *
     * @param Connection $connection
     * @param string $limit Reason
     */
    protected function limit($connection, $limit)
    {
        $this->log(sprintf(
            'Limiting connection %s: %s',
            $connection->getIp(),
            $limit
        ), 'notice');

        $connection->close(new RateLimiterException($limit));
    }

    /**
     * Logger
     *
     * @param string $message
     * @param string $priority
     */
    public function log($message, $priority = 'info')
    {
        $this->server->log('RateLimiter: ' . $message, $priority);
    }
}