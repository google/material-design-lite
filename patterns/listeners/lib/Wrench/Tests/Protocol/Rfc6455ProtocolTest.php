<?php

namespace Wrench\Tests\Protocol;

use Wrench\Protocol\Rfc6455Protocol;
use Wrench\Tests\Protocol\ProtocolTest;

class Rfc6455ProtocolTest extends ProtocolTest
{
    protected function getClass()
    {
        return 'Wrench\Protocol\Rfc6455Protocol';
    }
}