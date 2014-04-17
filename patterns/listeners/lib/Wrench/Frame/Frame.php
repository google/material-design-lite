<?php

namespace Wrench\Frame;

use Wrench\Payload\Payload;

use Wrench\Exception\FrameException;

/**
 * Represents a WebSocket frame
 */
abstract class Frame
{
    /**
     * The frame data length
     *
     * @var int
     */
    protected $length = null;

    /**
     * The type of this payload
     *
     * @var int
     */
    protected $type = null;

    /**
     * The buffer
     *
     * May not be a complete payload, because this frame may still be receiving
     * data. See
     *
     * @var string
     */
    protected $buffer = '';

    /**
     * The enclosed frame payload
     *
     * May not be a complete payload, because this frame might indicate a continuation
     * frame. See isFinal() versus isComplete()
     *
     * @var string
     */
    protected $payload = '';

    /**
     * Gets the length of the payload
     *
     * @throws FrameException
     * @return int
     */
    abstract public function getLength();

    /**
     * Resets the frame and encodes the given data into it
     *
     * @param string $data
     * @param int $type
     * @param boolean $masked
     * @return Frame
     */
    abstract public function encode($data, $type = Protocol::TYPE_TEXT, $masked = false);

    /**
     * Whether the frame is the final one in a continuation
     *
     * @return boolean
     */
    abstract public function isFinal();

    /**
     * @return int
     */
    abstract public function getType();

    /**
     * Decodes a frame payload from the buffer
     *
     * @return void
     */
    abstract protected function decodeFramePayloadFromBuffer();

    /**
     * Gets the expected length of the buffer once all the data has been
     *  receieved
     *
     * @return int
     */
    abstract protected function getExpectedBufferLength();

    /**
     * Whether the frame is complete
     *
     * @return boolean
     */
    public function isComplete()
    {
        if (!$this->buffer) {
            return false;
        }

        try {
            return $this->getBufferLength() >= $this->getExpectedBufferLength();
        } catch (FrameException $e) {
            return false;
        }
    }

    /**
     * Receieves data into the frame
     *
     * @param string $buffer
     */
    public function receiveData($data)
    {
        $this->buffer .= $data;
    }

    /**
     * Gets the remaining number of bytes before this frame will be complete
     *
     * @return number
     */
    public function getRemainingData()
    {
        try {
            return $this->getExpectedBufferLength() - $this->getBufferLength();
        } catch (FrameException $e) {
            return null;
        }
    }

    /**
     * Whether this frame is waiting for more data
     *
     * @return boolean
     */
    public function isWaitingForData()
    {
        return $this->getRemainingData() > 0;
    }

    /**
     * Gets the contents of the frame payload
     *
     * The frame must be complete to call this method.
     *
     * @return string
     */
    public function getFramePayload()
    {
        if (!$this->isComplete()) {
            throw new FrameException('Cannot get payload: frame is not complete');
        }

        if (!$this->payload && $this->buffer) {
            $this->decodeFramePayloadFromBuffer();
        }

        return $this->payload;
    }

    /**
     * Gets the contents of the frame buffer
     *
     * This is the encoded value, receieved into the frame with receiveData().
     *
     * @throws FrameException
     * @return string binary
     */
    public function getFrameBuffer()
    {
        if (!$this->buffer && $this->payload) {
            throw new FrameException('Cannot get frame buffer');
        }
        return $this->buffer;
    }

    /**
     * Gets the expected length of the frame payload
     *
     * @return int
     */
    protected function getBufferLength()
    {
        return strlen($this->buffer);
    }
}