<?php

namespace Wrench\Tests;

use Wrench\Protocol\Protocol;

use Wrench\Client;
use Wrench\Tests\Test;
use Wrench\Socket;

use \InvalidArgumentException;
use \PHPUnit_Framework_Error;

/**
 * Tests the client class
 */
class ClientTest extends Test
{
    /**
     * @see Wrench\Tests.Test::getClass()
     */
    protected function getClass()
    {
        return 'Wrench\Client';
    }

    public function testConstructor()
    {
        $this->assertInstanceOfClass(
            $client = new Client(
                'ws://localhost/test', 'http://example.org/'
            ),
            'ws:// scheme, default socket'
        );

        $this->assertInstanceOfClass(
            $client = new Client(
                'ws://localhost/test', 'http://example.org/',
                array('socket' => $this->getMockSocket())
            ),
            'ws:// scheme, socket specified'
        );
    }

    /**
     * Gets a mock socket
     *
     * @return Socket
     */
    protected function getMockSocket()
    {
        return $this->getMock('Wrench\Socket\ClientSocket', array(), array('wss://localhost:8000'));
    }

    /**
     * @expectedException PHPUnit_Framework_Error
     */
    public function testConstructorSocketUnspecified()
    {
        $w = new Client();
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructorUriInvalid()
    {
        $w = new Client('invalid uri', 'http://www.example.com/');
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructorUriEmpty()
    {
        $w = new Client(null, 'http://www.example.com/');
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructorUriPathUnspecified()
    {
        $w = new Client('ws://localhost', 'http://www.example.com/');
    }

    /**
     * @expectedException PHPUnit_Framework_Error
     */
    public function testConstructorOriginUnspecified()
    {
        $w = new Client('ws://localhost');
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructorOriginEmpty()
    {
        $w = new Client('wss://localhost', null);
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructorOriginInvalid()
    {
        $w = new Client('ws://localhost:8000', 'NOTAVALIDURI');
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testSendInvalidType()
    {
        $client = new Client('ws://localhost/test', 'http://example.org/');
        $client->sendData('blah', 9999);
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testSendInvalidTypeString()
    {
        $client = new Client('ws://localhost/test', 'http://example.org/');
        $client->sendData('blah', 'fooey');
    }

    public function testSend()
    {
        try {
            $helper = new ServerTestHelper();
            $helper->setUp();

            /* @var $instance Wrench\Client */
            $instance = $this->getInstance($helper->getEchoConnectionString(), 'http://www.example.com/send');
            $instance->addRequestHeader('X-Test', 'Custom Request Header');

            $this->assertFalse($instance->receive(), 'Receive before connect');

            $success = $instance->connect();
            $this->assertTrue($success, 'Client can connect to test server');
            $this->assertTrue($instance->isConnected());

            $this->assertFalse($instance->connect(), 'Double connect');

            $this->assertFalse((boolean)$instance->receive(), 'No data');

            $bytes = $instance->sendData('foobar', 'text');
            $this->assertTrue($bytes >= 6, 'sent text frame');
            sleep(1);

            $bytes = $instance->sendData('baz', Protocol::TYPE_TEXT);
            $this->assertTrue($bytes >= 3, 'sent text frame');
            sleep(1);

            $responses = $instance->receive();
            $this->assertTrue(is_array($responses));
            $this->assertCount(2, $responses);
            $this->assertInstanceOf('Wrench\\Payload\\Payload', $responses[0]);
            $this->assertInstanceOf('Wrench\\Payload\\Payload', $responses[1]);

            $instance->disconnect();

            $this->assertFalse($instance->isConnected());
        } catch (\Exception $e) {
            $helper->tearDown();
            throw $e;
        }

        $helper->tearDown();
    }
}
