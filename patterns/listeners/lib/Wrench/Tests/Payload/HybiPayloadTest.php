<?php

namespace Wrench\Tests\Protocol;

use Wrench\Payload\HybiPayload;
use Wrench\Tests\Payload\PayloadTest;

class HybiPayloadTest extends PayloadTest
{
    protected function getClass()
    {
        return 'Wrench\Payload\HybiPayload';
    }
}