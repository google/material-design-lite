<?php

namespace Wrench\Tests\Frame;

use Wrench\Protocol\Protocol;
use Wrench\Frame\Frame;
use Wrench\Tests\Test;
use \Exception;

/**
 * Frame test
 */
abstract class FrameTest extends Test
{
    /**
     * A fresh instance of the class being tested
     *
     * @var Frame
     */
    protected $frame;

    /**
     * @see PHPUnit_Framework_TestCase::setUp()
     */
    public function setUp()
    {
        parent::setUp();
        $this->frame = $this->getNewFrame();
    }

    protected function getNewFrame()
    {
        $class = $this->getClass();
        return new $class();
    }

    /**
     * @see PHPUnit_Framework_TestCase::tearDown()
     */
    protected function tearDown()
    {
        parent::tearDown();
        unset($this->frame);
    }

    /**
     * @param string $payload
     * @dataProvider getValidEncodePayloads
     */
    public function testBijection($type, $payload, $masked)
    {
        // Encode the payload
        $this->frame->encode($payload, $type, $masked);

        // Get the resulting buffer
        $buffer = $this->frame->getFrameBuffer();
        $this->assertTrue((boolean)$buffer, 'Got raw frame buffer');

        // And feed it back into a new frame
        $frame = $this->getNewFrame();
        $frame->receiveData($buffer);

        // Check the properties of the new frame against the old, all match
        $this->assertEquals(
            $this->frame->getType(),
            $frame->getType(),
            'Types match after encode -> receiveData'
        );

        $this->assertEquals(
            $this->frame->getFramePayload(),
            $frame->getFramePayload(),
            'Payloads match after encode -> receiveData'
        );

        // Masking key should not be different, because we read the buffer in directly
        $this->assertEquals(
            $this->frame->getFrameBuffer(),
            $frame->getFrameBuffer(),
            'Raw buffers match too'
        );

        // This time, we create a new frame and read the data in with encode
        $frame = $this->getNewFrame();
        $frame->encode($this->frame->getFramePayload(), $type, $masked);

        // These still match
        $this->assertEquals(
            $this->frame->getType(),
            $frame->getType(),
            'Types match after encode -> receiveData -> encode'
        );

        $this->assertEquals(
            $this->frame->getFramePayload(),
            $frame->getFramePayload(),
            'Payloads match after encode -> receiveData -> encode'
        );

        // But the masking key should be different, thus, so are the buffers
        if ($masked) {
            $this->assertNotEquals(
                $this->frame->getFrameBuffer(),
                $frame->getFrameBuffer(),
                'Raw buffers don\'t match because of masking'
            );
        } else {
            $this->assertEquals(
                $this->frame->getFramePayload(),
                $frame->getFramePayload(),
                'Payloads match after encode -> receiveData -> encode'
            );
        }
    }

    /**
     * @param string $payload
     * @dataProvider getValidEncodePayloads
     */
    public function testEncodeTypeReflection($type, $payload, $masked)
    {
        $this->frame->encode($payload, $type);
        $this->assertEquals(Protocol::TYPE_TEXT, $this->frame->getType(), 'Encode retains type information');
    }

    /**
     * @param string $payload
     * @dataProvider getValidEncodePayloads
     */
    public function testEncodeLengthReflection($type, $payload, $masked)
    {
        $this->frame->encode($payload, $type);
        $this->assertEquals(strlen($payload), $this->frame->getLength(), 'Encode does not alter payload length');
    }

    /**
     * @param string $payload
     * @dataProvider getValidEncodePayloads
     */
    public function testEncodePayloadReflection($type, $payload, $masked)
    {
        $this->frame->encode($payload, $type, $masked);
        $this->assertEquals($payload, $this->frame->getFramePayload(), 'Encode retains payload information');
    }

    /**
     * Data provider
     *
     * @return array<string>
     */
    public function getValidEncodePayloads()
    {
        return array(
            array(
                Protocol::TYPE_TEXT,
                "123456\x007890!@#$%^&*()qwe\trtyuiopQWERTYUIOPasdfghjklASFGH\n
                JKLzxcvbnmZXCVBNM,./<>?;[]{}-=_+\|'asdad0x11\aasdassasdasasdsd",
                true
            ),
            array(
                Protocol::TYPE_TEXT,
                pack('CCCCCCC', 0x00, 0x01, 0x02, 0x03, 0x04, 0xff, 0xf0),
                true
            ),
            array(Protocol::TYPE_TEXT, ' ', true)
        );
    }
}