/*
 * grunt-lib-phantomjs
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

/*global phantom:true*/

'use strict';

var fs = require('fs');

// The temporary file used for communications.
var tmpfile = phantom.args[0];
// The page .html file to load.
var url = phantom.args[1];
// Extra, optionally overridable stuff.
var options = JSON.parse(phantom.args[2] || {});

// Default options.
if (!options.timeout) { options.timeout = 5000; }

// Keep track of the last time a client message was sent.
var last = new Date();

// Messages are sent to the parent by appending them to the tempfile.
var sendMessage = function(arg) {
  var args = Array.isArray(arg) ? arg : [].slice.call(arguments);
  last = new Date();
  fs.write(tmpfile, JSON.stringify(args) + '\n', 'a');
};

// This allows grunt to abort if the PhantomJS version isn't adequate.
sendMessage('private', 'version', phantom.version);

// Abort if the page doesn't send any messages for a while.
setInterval(function() {
  if (new Date() - last > options.timeout) {
    sendMessage('fail.timeout');
    phantom.exit();
  }
}, 100);

// Create a new page.
var page = require('webpage').create(options.page);

// Inject bridge script into client page.
var injected;
var inject = function() {
  if (injected) { return; }
  // Inject client-side helper script.
  var scripts = Array.isArray(options.inject) ? options.inject : [options.inject];
  sendMessage('inject', options.inject);
  scripts.forEach(page.injectJs);
  injected = true;
};

// Keep track if the client-side helper script already has been injected.
page.onUrlChanged = function(newUrl) {
  injected = false;
  sendMessage('onUrlChanged', newUrl);
};

// The client page must send its messages via alert(jsonstring).
page.onAlert = function(str) {
  // The only thing that should ever alert "inject" is the custom event
  // handler this script adds to be executed on DOMContentLoaded.
  if (str === 'inject') {
    inject();
    return;
  }
  // Otherwise, parse the specified message string and send it back to grunt.
  // Unless there's a parse error. Then, complain.
  try {
    sendMessage(JSON.parse(str));
  } catch(err) {
    sendMessage('error.invalidJSON', str);
  }
};

// Relay console logging messages.
page.onConsoleMessage = function(message) {
  sendMessage('console', message);
};

// For debugging.
page.onResourceRequested = function(request) {
  sendMessage('onResourceRequested', request);
};

page.onResourceReceived = function(request) {
  if (request.stage === 'end') {
    sendMessage('onResourceReceived', request);
  }
};

page.onError = function(msg, trace) {
  sendMessage('error.onError', msg, trace);
};

// Run before the page is loaded.
page.onInitialized = function() {
  sendMessage('onInitialized');
  // Abort if there is no bridge to inject.
  if (!options.inject) { return; }
  // Tell the client that when DOMContentLoaded fires, it needs to tell this
  // script to inject the bridge. This should ensure that the bridge gets
  // injected before any other DOMContentLoaded or window.load event handler.
  page.evaluate(function() {
    /*jshint browser:true, devel:true */
    document.addEventListener('DOMContentLoaded', function() {
      alert('inject');
    }, false);
  });
};

// Run when the page has finished loading.
page.onLoadFinished = function(status) {
  // reset this handler to a no-op so further calls to onLoadFinished from iframes don't affect us
  page.onLoadFinished = function() { /* no-op */};

  // The window has loaded.
  sendMessage('onLoadFinished', status);
  if (status !== 'success') {
    // File loading failure.
    sendMessage('fail.load', url);
    phantom.exit();
  }
};

// Actually load url.
page.open(url);
