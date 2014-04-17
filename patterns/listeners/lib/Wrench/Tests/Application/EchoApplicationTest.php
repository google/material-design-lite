<?php

namespace Wrench\Tests\Application;

use Wrench\Protocol\Protocol;
use Wrench\Tests\Test as WrenchTest;

class EchoApplicationTest extends WrenchTest
{
    /**
     * @see Wrench\Tests.Test::getClass()
     */
    protected function getClass()
    {
        return 'Wrench\Application\EchoApplication';
    }

    /**
     * Tests the constructor
     */
    public function testConstructor()
    {
        $this->assertInstanceOfClass($this->getInstance());
    }

    /**
     * @param unknown_type $payload
     * @dataProvider getValidPayloads
     */
    public function testOnData($payload)
    {
        $connection = $this->getMockBuilder('Wrench\Connection')
                     ->disableOriginalConstructor()
                     ->getMock();

        $connection
            ->expects($this->once())
            ->method('send')
            ->with($this->equalTo($payload), $this->equalTo(Protocol::TYPE_TEXT))
            ->will($this->returnValue(true));

        $this->getInstance()->onData($payload, $connection);
    }

    /**
     * Data provider
     *
     * @return array<array<string>>
     */
    public function getValidPayloads()
    {
        return array(
            array('asdkllakdaowidoaw noaoinosdna nwodinado ndsnd aklndiownd'),
            array(' ')
        );
    }
}