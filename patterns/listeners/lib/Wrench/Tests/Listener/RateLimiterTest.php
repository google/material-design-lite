<?php

namespace Wrench\Tests\Listener;

use Wrench\Listener\RateLimiter;
use Wrench\Tests\Listener\ListenerTest;

class RateLimiterTest extends ListenerTest
{
    /**
     * @see Wrench\Tests.Test::getClass()
     */
    public function getClass()
    {
        return 'Wrench\Listener\RateLimiter';
    }

    /**
     * @see Wrench\Tests\Listener.ListenerTest::testConstructor()
     */
    public function testConstructor()
    {
        $instance = $this->getInstance();
        $this->assertInstanceOfClass($instance, 'No constructor arguments');
        return $instance;
    }

    public function testOnSocketConnect()
    {
        $this->getInstance()->onSocketConnect(null, $this->getConnection());
    }

    public function testOnSocketDisconnect()
    {
        $this->getInstance()->onSocketDisconnect(null, $this->getConnection());
    }

    public function testOnClientData()
    {
        $this->getInstance()->onClientData(null, $this->getConnection());
    }

    protected function getConnection()
    {
        $connection = $this->getMock('Wrench\Connection', array(), array(), '', false);

        $connection
            ->expects($this->any())
            ->method('getIp')
            ->will($this->returnValue('127.0.0.1'));

        $connection
            ->expects($this->any())
            ->method('getId')
            ->will($this->returnValue('abcdef01234567890'));

        $manager = $this->getMock('Wrench\ConnectionManager', array(), array(), '', false);
        $manager->expects($this->any())->method('count')->will($this->returnValue(5));

        $connection
            ->expects($this->any())
            ->method('getConnectionManager')
            ->will($this->returnValue($manager));

        return $connection;
    }
}