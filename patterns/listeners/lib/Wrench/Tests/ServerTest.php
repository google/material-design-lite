<?php

namespace Wrench\Tests;

use Wrench\Server;
use Wrench\Tests\Test;
use Wrench\Socket;

use \InvalidArgumentException;
use \PHPUnit_Framework_Error;

/**
 * Tests the Server class
 */
class ServerTest extends Test
{
    /**
     * @see Wrench\Tests.Test::getClass()
     */
    protected function getClass()
    {
        return 'Wrench\Server';
    }

    /**
     * Tests the constructor
     *
     * @param string $url
     * @param array $options
     * @dataProvider getValidConstructorArguments
     */
    public function testConstructor($url, array $options = array())
    {
        $this->assertInstanceOfClass(
            $this->getInstance($url, $options),
            'Valid constructor arguments'
        );
    }

    /**
     * Tests logging
     */
    public function testLogging()
    {
        $test = $this;
        $logged = false;

        $server = $this->getInstance('ws://localhost:8000', array(
            'logger' => function ($message, $priority) use ($test, &$logged) {
                $test->assertTrue(is_string($message), 'Log had a string message');
                $test->assertTrue(is_string($priority), 'Log had a string priority');
                $logged = true;
            }
        ));

        $this->assertTrue($logged, 'The log callback was hit');
    }

    /**
     * Data provider
     *
     * @return array<array<mixed>>
     */
    public function getValidConstructorArguments()
    {
        return array(
            array(
                'ws://localhost:8000',
                array('logger' => array($this, 'log'))
            ),
            array(
                'ws://localhost',
                array('logger' => array($this, 'log'))
            )
        );
    }

}