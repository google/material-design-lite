<?php

namespace Wrench\Protocol;

use Wrench\Payload\HybiPayload;

use Wrench\Exception\ConnectionException;

use Wrench\Protocol\Protocol;
use \InvalidArgumentException;

/**
 * @see http://tools.ietf.org/html/rfc6455#section-5.2
 */
abstract class HybiProtocol extends Protocol
{
    /**
     * @see Wrench\Protocol.Protocol::getPayload()
     */
    public function getPayload()
    {
        return new HybiPayload();
    }
}