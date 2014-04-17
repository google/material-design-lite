<?php

namespace Wrench\Socket;

use Wrench\Socket\Socket;

class ServerClientSocket extends Socket
{
    /**
     * Constructor
     *
     * A server client socket is accepted from a listening socket, so there's
     * no need to call ->connect() or whatnot.
     *
     * @param resource $accepted_socket
     * @param array $options
     */
    public function __construct($accepted_socket, array $options = array())
    {
        parent::__construct($options);

        $this->socket = $accepted_socket;
        $this->connected = (boolean)$accepted_socket;
    }
}