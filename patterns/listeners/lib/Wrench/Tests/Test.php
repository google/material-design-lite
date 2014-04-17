<?php

namespace Wrench\Tests;

use \PHPUnit_Framework_TestCase;
use \ReflectionClass;

/**
 * Test base class
 */
abstract class Test extends PHPUnit_Framework_TestCase
{
    /**
     * Gets the class under test
     *
     * @return string
     */
    abstract protected function getClass();

    /**
     * Asserts that the given instance is of the class under test
     *
     * @param object $instance
     * @param string $message Optional
     */
    public function assertInstanceOfClass($instance, $message = null)
    {
        $this->assertInstanceOf(
            $this->getClass(),
            $instance,
            $message
        );
    }

    /**
     * Gets an instance of the class under test
     *
     * @param mixed Normal constructor arguments
     * @magic This method accepts a variable number of arguments
     * @return object Of type given by getClass()
     */
    public function getInstance(/* ... */)
    {
        $reflection = new ReflectionClass($this->getClass());
        return $reflection->newInstanceArgs(func_get_args());
    }

    /**
     * Logging function
     *
     * Passed into some classes under test as a callable
     *
     * @param string $message
     * @param string $priority
     * @return void
     */
    public function log($message, $priority = 'info')
    {
        // nothing
    }
}
