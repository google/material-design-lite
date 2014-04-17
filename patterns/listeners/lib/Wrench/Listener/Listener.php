<?php

namespace Wrench\Listener;

use Wrench\Server;

interface Listener
{
    public function listen(Server $server);
}