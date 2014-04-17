<?php

namespace Wrench\Tests\Socket;

use \Exception;

abstract class UriSocketTest extends SocketTest
{
    /**
     * By default, the socket has not required arguments
     */
    public function testConstructor()
    {
        $instance = $this->getInstance('ws://localhost:8000');
        $this->assertInstanceOfClass($instance);
        return $instance;
    }

    /**
     * @dataProvider getInvalidConstructorArguments
     * @expectedException InvalidArgumentException
     */
    public function testInvalidConstructor($uri)
    {
        $this->getInstance($uri);
    }

    /**
     * @depends testConstructor
     */
    public function testGetIp($instance)
    {
        $this->assertStringStartsWith('localhost', $instance->getIp(), 'Correct host');
    }

    /**
     * @depends testConstructor
     */
    public function testGetPort($instance)
    {
        $this->assertEquals(8000, $instance->getPort(), 'Correct port');
    }

    /**
     * Data provider
     */
    public function getInvalidConstructorArguments()
    {
        return array(
            array(false),
            array('http://www.google.com/'),
            array('ws:///'),
            array(':::::'),
        );
    }
}