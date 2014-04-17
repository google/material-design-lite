var shell = require('..');

var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    child = require('child_process');

// Node shims for < v0.7
fs.existsSync = fs.existsSync || path.existsSync;

shell.config.silent = true;

function numLines(str) {
  return typeof str === 'string' ? str.match(/\n/g).length : 0;
}

shell.rm('-rf', 'tmp');
shell.mkdir('tmp');

//
// Valids
//


// From here on we use child.exec() to intercept the stdout


// simple test with defaults
shell.mkdir('-p', 'tmp');
var file = 'tmp/tempscript'+Math.random()+'.js',
    script = 'require(\'../../global.js\'); echo("-asdf", "111");'; // test '-' bug (see issue #20)
script.to(file);
child.exec('node '+file, function(err, stdout, stderr) {
  assert.ok(stdout === '-asdf 111\n' || stdout === '-asdf 111\nundefined\n'); // 'undefined' for v0.4

  // simple test with silent(true)
  shell.mkdir('-p', 'tmp');
  var file = 'tmp/tempscript'+Math.random()+'.js',
      script = 'require(\'../../global.js\'); config.silent=true; echo(555);';
  script.to(file);
  child.exec('node '+file, function(err, stdout, stderr) {
    assert.ok(stdout === '555\n' || stdout === '555\nundefined\n'); // 'undefined' for v0.4

    theEnd();
  });
});

function theEnd() {
  shell.exit(123);
}
