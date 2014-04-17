<?php

namespace Wrench\Tests;

use Wrench\ConnectionManager;
use Wrench\Tests\Test;

use Wrench\Application\EchoApplication;

use \InvalidArgumentException;
use \PHPUnit_Framework_Error;

/**
 * Tests the ConnectionManager class
 */
class ConnectionManagerTest extends Test
{
    /**
     * @see Wrench\Tests.Test::getClass()
     */
    protected function getClass()
    {
        return 'Wrench\ConnectionManager';
    }

    /**
     * Tests the constructor
     *
     * @dataProvider getValidConstructorArguments
     */
    public function testValidConstructorArguments($server, array $options)
    {
        $this->assertInstanceOfClass(
            $instance = $this->getInstance(
                $server,
                $options
            ),
            'Valid constructor arguments'
        );
    }

    /**
     * Tests the constructor
     */
    public function testConstructor()
    {
        $this->assertInstanceOfClass(
            $instance = $this->getInstance(
                $this->getMockServer(),
                array()
            ),
            'Constructor'
        );
        return $instance;
    }

    /**
     * @depends testConstructor
     * @param ConnectionManager $instance
     */
    public function testCount($instance)
    {
        $this->assertTrue(is_numeric($instance->count()));
    }

    /**
     * Data provider
     */
    public function getValidConstructorArguments()
    {
        return array(
            array($this->getMockServer(), array())
        );
    }

    /**
     * Gets a mock server
     */
    protected function getMockServer()
    {
        $server = $this->getMock('Wrench\Server', array(), array(), '', false);

        $server->registerApplication('/echo', $this->getMockApplication());

        $server->expects($this->any())
                ->method('getUri')
                ->will($this->returnValue('ws://localhost:8000/'));

        return $server;
    }

    /**
     * Gets a mock application
     *
     * @return EchoApplication
     */
    protected function getMockApplication()
    {
        return new EchoApplication();
    }
}