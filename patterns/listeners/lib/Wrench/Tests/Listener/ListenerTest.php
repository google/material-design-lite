<?php

namespace Wrench\Tests\Listener;

use Wrench\Tests\Test;

/**
 * Payload test
 */
abstract class ListenerTest extends Test
{
    /**
     * @depends testConstructor
     */
    public function testListen($instance)
    {
        $server = $this->getMock('Wrench\Server', array(), array(), '', false);

        $instance->listen($server);
    }

    abstract public function testConstructor();
}