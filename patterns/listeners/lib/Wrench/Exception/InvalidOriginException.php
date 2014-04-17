<?php

namespace Wrench\Exception;

use Wrench\Protocol\Protocol;
use Wrench\Exception\HandshakeException;

/**
 * Invalid origin exception
 */
class InvalidOriginException extends HandshakeException
{
    /**
     * @param string    $message
     * @param int       $code
     * @param Exception $previous
     */
    public function __construct($message = null, $code = null, $previous = null)
    {
        if ($code == null) {
            $code = Protocol::HTTP_FORBIDDEN;
        }
        parent::__construct($message, $code, $previous);
    }
}
