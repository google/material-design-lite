<?php

namespace Wrench\Tests\Listener;

use Wrench\Listener\RateLimiter;
use Wrench\Tests\Listener\ListenerTest;

class OriginPolicyTest extends ListenerTest
{
    /**
     * @see Wrench\Tests.Test::getClass()
     */
    public function getClass()
    {
        return 'Wrench\Listener\OriginPolicy';
    }

    /**
     * @see Wrench\Tests\Listener.ListenerTest::testConstructor()
     */
    public function testConstructor()
    {
        $instance = $this->getInstance(array());
        $this->assertInstanceOfClass($instance, 'No constructor arguments');
        return $instance;
    }

    /**
     * @dataProvider getValidArguments
     * @param array $allowed
     * @param string $domain
     */
    public function testValidAllowed($allowed, $domain)
    {
        $instance = $this->getInstance($allowed);
        $this->assertTrue($instance->isAllowed($domain));
    }

    /**
     * @dataProvider getValidArguments
     * @param array $allowed
     * @param string $domain
     */
    public function testValidHandshake($allowed, $domain)
    {
        $instance = $this->getInstance($allowed);

        $connection = $this->getMock('Wrench\Connection', array(), array(), '', false);

        $connection
            ->expects($this->never())
            ->method('close');

        $instance->onHandshakeRequest($connection, '/', $domain, 'abc', array());
    }

    /**
     * @dataProvider getInvalidArguments
     * @param array $allowed
     * @param string $bad_domain
     */
    public function testInvalidAllowed($allowed, $bad_domain)
    {
        $instance = $this->getInstance($allowed);
        $this->assertFalse($instance->isAllowed($bad_domain));
    }

    /**
     * @dataProvider getInvalidArguments
     * @param array $allowed
     * @param string $domain
     */
    public function testInvalidHandshake($allowed, $bad_domain)
    {
        $instance = $this->getInstance($allowed);

        $connection = $this->getMock('Wrench\Connection', array(), array(), '', false);

        $connection
            ->expects($this->once())
            ->method('close');

        $instance->onHandshakeRequest($connection, '/', $bad_domain, 'abc', array());
    }

    /**
     * Data provider
     */
    public function getValidArguments()
    {
        return array(
            array(array('localhost'), 'http://localhost'),
            array(array('foobar.com'), 'https://foobar.com'),
            array(array('https://foobar.com'), 'https://foobar.com')
        );
    }

    /**
     * Data provider
     */
    public function getInvalidArguments()
    {
        return array(
            array(array('localhost'), 'localdomain'),
            array(array('foobar.com'), 'foobar.org'),
            array(array('https://foobar.com'), 'http://foobar.com'),
            array(array('http://foobar.com'), 'foobar.com')
        );
    }
}