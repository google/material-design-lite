<?php

namespace Wrench\Tests\Frame;

use Wrench\Frame\HybiFrame;
use Wrench\Tests\Test;

class BadSubclassFrame extends HybiFrame
{
    protected $payload = 'asdmlasdkm';
    protected $buffer = false;
}

class BadSubclassFrameTest extends Test
{
    /**
     * @expectedException Wrench\Exception\FrameException
     */
    public function testInvalidFrameBuffer()
    {
        $frame = new BadSubclassFrame();
        $frame->getFrameBuffer();
    }

    protected function getClass()
    {
        return 'Wrench\Tests\Frame\BadSubclassFrame';
    }
}
