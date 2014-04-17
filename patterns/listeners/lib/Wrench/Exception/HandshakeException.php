<?php

namespace Wrench\Exception;

use Wrench\Protocol\Protocol;
use Wrench\Exception\Exception as WrenchException;

class HandshakeException extends WrenchException
{
    /**
     * @param string    $message
     * @param int       $code
     * @param Exception $previous
     */
    public function __construct($message = null, $code = null, $previous = null)
    {
        if ($code == null) {
            $code = Protocol::HTTP_SERVER_ERROR;
        }
        parent::__construct($message, $code, $previous);
    }
}