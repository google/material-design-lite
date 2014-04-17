<?php

namespace Wrench\Payload;

use Wrench\Frame\Frame;

use Wrench\Exception\FrameException;

use Wrench\Socket\Socket;

/**
 * Payload class
 *
 * Represents a WebSocket protocol payload, which may be made up of multiple
 * frames.
 */
abstract class Payload
{
    /**
     * A payload may consist of one or more frames
     *
     * @var array<Frame>
     */
    protected $frames = array();

    /**
     * Gets the current frame for the payload
     *
     * @return mixed
     */
    protected function getCurrentFrame()
    {
        if (empty($this->frames)) {
            array_push($this->frames, $this->getFrame());
        }
        return end($this->frames);
    }

    /**
     * Gets the frame into which data should be receieved
     *
     * @throws PayloadException
     * @return Frame
     */
    protected function getReceivingFrame()
    {
        $current = $this->getCurrentFrame();

        if ($current->isComplete()) {
            if ($current->isFinal()) {
                throw new PayloadException('Payload cannot receieve data: it is already complete');
            } else {
                $current = array_push($this->frames, $this->getFrame());
            }
        }

        return $current;
    }

    /**
     * Get a frame object
     *
     * @return Frame
     */
    abstract protected function getFrame();

    /**
     * Whether the payload is complete
     *
     * @return boolean
     */
    public function isComplete()
    {
        return $this->getCurrentFrame()->isComplete() && $this->getCurrentFrame()->isFinal();
    }

    /**
     * Encodes a payload
     *
     * @param string $data
     * @param int $type
     * @param boolean $masked
     * @return Payload
     * @todo No splitting into multiple frames just yet
     */
    public function encode($data, $type = Protocol::TYPE_TEXT, $masked = false)
    {
        $this->frames = array();

        $frame = $this->getFrame();
        array_push($this->frames, $frame);

        $frame->encode($data, $type, $masked);

        return $this;
    }

    /**
     * Gets the number of remaining bytes before this payload will be
     * complete
     *
     * May return 0 (no more bytes required) or null (unknown number of bytes
     * required).
     *
     * @return number|NULL
     */
    public function getRemainingData()
    {
        if ($this->isComplete()) {
            return 0;
        }

        try {
            if ($this->getCurrentFrame()->isFinal()) {
                return $this->getCurrentFrame()->getRemainingData();
            }
        } catch (FrameException $e) {
            return null;
        }

        return null;
    }

    /**
     * Whether this payload is waiting for more data
     *
     * @return boolean
     */
    public function isWaitingForData()
    {
        return $this->getRemainingData() > 0;
    }

    /**
     * @param Socket $socket
     * @return boolean
     */
    public function sendToSocket(Socket $socket)
    {
        $success = true;
        foreach ($this->frames as $frame) {
            $success = $success && ($socket->send($frame->getFrameBuffer()) !== false);
        }
        return $success;
    }

    /**
     * Receive raw data into the payload
     *
     * @param string $data
     * @return void
     */
    public function receiveData($data)
    {
        while ($data) {
            $frame = $this->getReceivingFrame();

            $size = strlen($data);
            $remaining = $frame->getRemainingData();

            if ($remaining === null) {
                $chunk_size = 2;
            } elseif ($remaining > 0) {
                $chunk_size = $remaining;
            }

            $chunk_size = min(strlen($data), $chunk_size);
            $chunk = substr($data, 0, $chunk_size);
            $data = substr($data, $chunk_size);

            $frame->receiveData($chunk);
        }
    }

    /**
     * @return string
     */
    public function getPayload()
    {
        $this->buffer = '';

        foreach ($this->frames as $frame) {
            $this->buffer .= $frame->getFramePayload();
        }

        return $this->buffer;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        try {
            return $this->getPayload();
        } catch (\Exception $e) {
            // __toString must not throw an exception
            return '';
        }
    }

    /**
     * Gets the type of the payload
     *
     * The type of a payload is taken from its first frame
     *
     * @throws PayloadException
     * @return int
     */
    public function getType()
    {
        if (!isset($this->frames[0])) {
            throw new PayloadException('Cannot tell payload type yet');
        }
        return $this->frames[0]->getType();
    }
}