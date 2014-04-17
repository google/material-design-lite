<?php

/*!
 * Content Sync Server, v0.1
 *
 * Copyright (c) 2013 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * The server that clients attach to to learn about content updates. See
 * lib/Wrench/Application/contentSyncBroadcasterApplication.php for logic
 *
 */

// turn errors on or off for debugging purposes
ini_set('display_errors', 0);
error_reporting(E_ALL);

require(__DIR__.'/lib/SplClassLoader.php');

// load wrench
$classLoader = new SplClassLoader('Wrench',__DIR__.'/lib');
$classLoader->register();

// parse the main config for the content sync port
if (!($config = @parse_ini_file(__DIR__."/../config/config.ini"))) {
	print "Missing the configuration file. Please build it using the Pattern Lab builder.\n";
	exit;	
}

$port = ($config) ? trim($config['contentSyncPort']) : '8002';

// start the content sync server
$server = new \Wrench\Server('ws://0.0.0.0:'.$port.'/', array());

// register the application 
$server->registerApplication('contentsync', new \Wrench\Application\contentSyncBroadcasterApplication());

print "\n";
print "Auto-reload Server Started...\n";
print "Use CTRL+C to stop this service...\n";

// run it
$server->run();
