<?php

require_once(__DIR__ . '/../../SplClassLoader.php');

if ($argc != 2 || !$argv[1] || !is_numeric($argv[1]) || (int)$argv[1] <= 1024) {
    throw new InvalidArgumentException('Invalid port number: supply as first argument');
}

$port = (int)$argv[1];

$classLoader = new \SplClassLoader('Wrench', __DIR__ . '/../..');
$classLoader->register();

$server = new Wrench\Server('ws://localhost:' . $port);
$server->registerApplication('echo', new Wrench\Application\EchoApplication());
$server->run();