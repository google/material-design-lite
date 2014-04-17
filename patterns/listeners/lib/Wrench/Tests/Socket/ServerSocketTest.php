<?php

namespace Wrench\Tests\Socket;

use \Exception;

class ServerSocketTest extends UriSocketTest
{
    public function getClass()
    {
        return 'Wrench\Socket\ServerSocket';
    }
}