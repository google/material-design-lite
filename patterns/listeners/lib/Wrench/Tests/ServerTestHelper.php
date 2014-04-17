<?php

namespace Wrench\Tests;

/**
 * In conjunction with server.php, provides a listening server
 * against which tests can be run.
 */
class ServerTestHelper
{
    const TEST_SERVER_PORT_MIN = 16666;
    const TEST_SERVER_PORT_MAX = 52222;

    public static $nextPort = null;

    protected $port = null;
    protected $process = null;
    protected $pipes = array();

    /**
     * Gets the next available port number to start a server on
     */
    public static function getNextPort()
    {
        if (self::$nextPort === null) {
            self::$nextPort = mt_rand(self::TEST_SERVER_PORT_MIN, self::TEST_SERVER_PORT_MAX);
        }
        return self::$nextPort++;
    }

    /**
     * Destructor
     */
    public function __destruct()
    {
        $this->tearDown();
    }

    /**
     * @return string
     */
    public function getConnectionString()
    {
        return 'ws://localhost:' . $this->port;
    }

    /**
     * @return string
     */
    public function getEchoConnectionString()
    {
        return $this->getConnectionString() . '/echo';
    }

    /**
     * Sets up the server process and sleeps for a few seconds while
     * it wakes up
     */
    public function setUp()
    {
        $this->port = self::getNextPort();

        $this->process = proc_open(
            $this->getCommand(),
            array(
                0 => array('file', '/dev/null', 'r'),
                1 => array('file', __DIR__ . '/../../../build/server.log', 'a+'),
                2 => array('file', __DIR__ . '/../../../build/server.err.log', 'a+')
            ),
            $this->pipes,
            __DIR__ . '../'
        );

        sleep(3);
    }

    /**
     * Tears down the server process
     *
     * This method *must* be called
     */
    public function tearDown()
    {
        if ($this->process) {
            foreach ($this->pipes as &$pipe) {
                fclose($pipe);
            }
            $this->pipes = null;

            // Sigh
            $status = proc_get_status($this->process);

            if ($status && isset($status['pid']) && $status['pid']) {
                // More sigh, this is the pid of the parent sh process, we want
                //  to terminate the server directly
                $this->log('Command: /bin/ps -ao pid,ppid | /usr/bin/col | /usr/bin/tail -n +2 | /bin/grep \'  ' . $status['pid'] . "'", 'info');
                exec('/bin/ps -ao pid,ppid | /usr/bin/col | /usr/bin/tail -n +2 | /bin/grep \' ' . $status['pid'] . "'", $processes, $return);

                if ($return === 0) {
                    foreach ($processes as $process) {
                        list($pid, $ppid) = explode(' ', str_replace('  ', ' ', $process));
                        if ($pid) {
                            $this->log('Killing ' . $pid, 'info');
                            exec('/bin/kill ' . $pid . ' > /dev/null 2>&1');
                        }
                    }
                } else {
                    $this->log('Unable to find child processes', 'warning');
                }

                sleep(1);

                $this->log('Killing ' . $status['pid'], 'info');
                exec('/bin/kill ' . $status['pid'] . ' > /dev/null 2>&1');

                sleep(1);
            }

            proc_close($this->process);
            $this->process = null;
        }
    }

    /**
     * Gets the server command
     *
     * @return string
     */
    protected function getCommand()
    {
        return sprintf('/usr/bin/env php %s/server.php %d', __DIR__, $this->port);
    }

    /**
     * Logs a message
     *
     * @param string $message
     * @param string $priority
     */
    public function log($message, $priority = 'info')
    {
        //echo $message . "\n";
    }
}