<?php

namespace Wrench\Payload;

use Wrench\Frame\HybiFrame;
use Wrench\Exception\PayloadException;

/**
 * Gets a HyBi payload
 * @author Dominic
 *
 */
class HybiPayload extends Payload
{
    /**
     * @see Wrench\Payload.Payload::getFrame()
     */
    protected function getFrame()
    {
        return new HybiFrame();
    }
}