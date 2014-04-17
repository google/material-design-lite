<?php

namespace Wrench\Payload;

use Wrench\Exception\PayloadException;
use Wrench\Exception\ConnectionException;
use Wrench\Util\Configurable;
use \InvalidArgumentException;

/**
 * Handles chunking and splitting of payloads into frames
 */
class PayloadHandler extends Configurable
{
    /**
     * A callback that will be called when a complete payload is available
     *
     * @var callable
     */
    protected $callback;

    /**
     * The current payload
     */
    protected $payload;

    /**
     * @param callable $callback
     * @param array $options
     * @throws InvalidArgumentException
     */
    public function __construct($callback, array $options = array())
    {
        parent::__construct($options);

        if (!is_callable($callback)) {
            throw new InvalidArgumentException('You must supply a callback to PayloadHandler');
        }

        $this->callback = $callback;
    }

    /**
     * Handles the raw socket data given
     *
     * @param string $data
     */
    public function handle($data)
    {
        if (!$this->payload) {
            $this->payload = $this->protocol->getPayload();
        }

        while ($data) { // Each iteration pulls off a single payload chunk
            $size = strlen($data);
            $remaining = $this->payload->getRemainingData();

            // If we don't yet know how much data is remaining, read data into
            // the payload in two byte chunks (the size of a WebSocket frame
            // header to get the initial length)
            //
            // Then re-loop. For extended lengths, this will happen once or four
            // times extra, as the extended length is read in.
            if ($remaining === null) {
                $chunk_size = 2;
            } elseif ($remaining > 0) {
                $chunk_size = $remaining;
            } elseif ($remaining === 0) {
                $chunk_size = 0;
            }

            $chunk_size = min(strlen($data), $chunk_size);
            $chunk = substr($data, 0, $chunk_size);
            $data = substr($data, $chunk_size);

            $this->payload->receiveData($chunk);

            if ($remaining !== 0 && !$this->payload->isComplete()) {
                continue;
            }

            if ($this->payload->isComplete()) {
                $this->emit($this->payload);
                $this->payload = $this->protocol->getPayload();
            } else {
                throw new PayloadException('Payload will not complete');
            }
        }
    }

    /**
     * Get the current payload
     *
     * @return Payload
     */
    public function getCurrent()
    {
        return $this->getPayloadHandler->getCurrent();
    }

    /**
     * Emits a complete payload to the callback
     *
     * @param Payload $payload
     */
    protected function emit(Payload $payload)
    {
        call_user_func($this->callback, $payload);
    }
}