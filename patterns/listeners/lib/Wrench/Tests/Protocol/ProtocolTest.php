<?php

namespace Wrench\Tests\Protocol;

use Wrench\Tests\Test;
use \Exception;

abstract class ProtocolTest extends Test
{
    /**
     * @see PHPUnit_Framework_TestCase::setUp()
     */
    public function setUp()
    {
        parent::setUp();
    }

    /**
     * @dataProvider getValidHandshakeRequests
     */
    public function testValidatHandshakeRequestValid($request)
    {
        try {
            list($path, $origin, $key, $extensions, $protocol) = $this->getInstance()->validateRequestHandshake($request);

            $this->assertEquals('/chat', $path);
            $this->assertEquals('http://example.com', $origin);
            $this->assertEquals('dGhlIHNhbXBsZSBub25jZQ==', $key);
            $this->assertTrue(is_array($extensions), 'Extensions returned as array');
            $this->assertEquals(array('x-test', 'x-test2'), $extensions, 'Extensions match');
            $this->assertEquals('chat, superchat', $protocol);
        } catch (Exception $e) {
            $this->fail($e);
        }
    }

    /**
     * @dataProvider getValidHandshakeResponses
     */
    public function testValidateHandshakeResponseValid($response, $key)
    {
        try {
            $valid = $this->getInstance()->validateResponseHandshake($response, $key);
            $this->assertTrue(is_bool($valid), 'Validation return value is boolean');
            $this->assertTrue($valid, 'Handshake response validates');
        } catch (Exception $e) {
            $this->fail('Validated valid response handshake as invalid');
        }
    }

    /**
     * @dataProvider getValidHandshakeResponses
     */
    public function testGetResponseHandsake($unused, $key)
    {
        try {
            $response = $this->getInstance()->getResponseHandshake($key);
            $this->assertHttpResponse($response);
        } catch (Exception $e) {
            $this->fail('Unable to get handshake response: ' . $e);
        }
    }

    /**
     * Asserts the string response is an HTTP response
     *
     * @param string $response
     */
    protected function assertHttpResponse($response, $message = '')
    {
        $this->assertStringStartsWith('HTTP', $response, $message . ' - response starts well');
        $this->assertStringEndsWith("\r\n", $response, $message . ' - response ends well');
    }

    public function testGetVersion()
    {
        $version = $this->getInstance()->getVersion();
        $this->assertTrue(is_int($version));
    }

    public function testGetResponseError()
    {
        $response = $this->getInstance()->getResponseError(400);
        $this->assertHttpResponse($response, 'Code as int');

        $response = $this->getInstance()->getResponseError(new Exception('Some message', 500));
        $this->assertHttpResponse($response, 'Code in Exception');

        $response = $this->getInstance()->getResponseError(888);
        $this->assertHttpResponse($response, 'Invalid code produces unimplemented response');
    }

    /**
     * @dataProvider getValidOriginUris
     */
    public function testValidateOriginUriValid($uri)
    {
        try {
            $this->getInstance()->validateOriginUri($uri);
        } catch (\Exception $e) {
            $this->fail('Valid URI validated as invalid: ' . $e);
        }
    }

    /**
     * @dataProvider getInvalidOriginUris
     * @expectedException InvalidArgumentException
     */
    public function testValidateOriginUriInvalid($uri)
    {
        $this->getInstance()->validateOriginUri($uri);
    }

    public function getValidOriginUris()
    {
        return array(
            array('http://www.example.org'),
            array('http://www.example.com/some/page'),
            array('https://localhost/')
        );
    }

    public function getInvalidOriginUris()
    {
        return array(
            array(false),
            array(true),
            array(''),
            array('blah')
        );
    }

    public function getValidHandshakeRequests()
    {
        $cases = array();


        $cases[] = array("GET /chat HTTP/1.1\r
Host: server.example.com\r
Upgrade: websocket\r
Connection: Upgrade\r
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r
Origin: http://example.com\r
Sec-WebSocket-Extensions: x-test\r
Sec-WebSocket-Extensions: x-test2\r
Sec-WebSocket-Protocol: chat, superchat\r
Sec-WebSocket-Version: 13\r
\r\n");

        $cases[] = array("GET /chat HTTP/1.1\r
Host: server.example.com\r
Upgrade: Websocket\r
Connection: Upgrade\r
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r
Origin: http://example.com\r
Sec-WebSocket-Extensions: x-test\r
Sec-WebSocket-Extensions: x-test2\r
Sec-WebSocket-Protocol: chat, superchat\r
Sec-WebSocket-Version: 13\r
\r\n");

        return $cases;
    }

    public function getValidHandshakeResponses()
    {
       $cases = array();

       for ($i = 10; $i > 0; $i--) {
           $key = sha1(time() . uniqid('', true));
           $response = "Sec-WebSocket-Accept: "
               . base64_encode(sha1($key . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', true))
               . "\r\n\r\n";

           $cases[] = array($response, $key);
       }

       return $cases;
    }
}
