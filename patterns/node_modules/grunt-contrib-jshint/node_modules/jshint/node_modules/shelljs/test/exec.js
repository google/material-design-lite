var shell = require('..');

var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    util = require('util'),
    child = require('child_process');

shell.config.silent = true;

function numLines(str) {
  return typeof str === 'string' ? str.match(/\n/g).length : 0;
}

//
// Invalids
//

shell.exec();
assert.ok(shell.error());

var result = shell.exec('asdfasdf'); // could not find command
assert.ok(result.code > 0);


//
// Valids
//

//
// sync
//

// check if stdout goes to output
var result = shell.exec('node -e \"console.log(1234);\"');
assert.equal(shell.error(), null);
assert.equal(result.code, 0);
assert.ok(result.output === '1234\n' || result.output === '1234\nundefined\n'); // 'undefined' for v0.4

// check if stderr goes to output
var result = shell.exec('node -e \"console.error(1234);\"');
assert.equal(shell.error(), null);
assert.equal(result.code, 0);
assert.ok(result.output === '1234\n' || result.output === '1234\nundefined\n'); // 'undefined' for v0.4

// check if stdout + stderr go to output
var result = shell.exec('node -e \"console.error(1234); console.log(666);\"');
assert.equal(shell.error(), null);
assert.equal(result.code, 0);
assert.ok(result.output === '1234\n666\n' || result.output === '1234\n666\nundefined\n');  // 'undefined' for v0.4

// check exit code
var result = shell.exec('node -e \"process.exit(12);\"');
assert.equal(shell.error(), null);
assert.equal(result.code, 12);

// interaction with cd
shell.cd('resources/external');
var result = shell.exec('node node_script.js');
assert.equal(shell.error(), null);
assert.equal(result.code, 0);
assert.equal(result.output, 'node_script_1234\n');
shell.cd('../..');

// check quotes escaping
var result = shell.exec( util.format('node -e "console.log(%s);"', "\\\"\\'+\\'_\\'+\\'\\\"") );
assert.equal(shell.error(), null);
assert.equal(result.code, 0);
assert.equal(result.output, "'+'_'+'\n");

//
// async
//

// no callback
var c = shell.exec('node -e \"console.log(1234)\"', {async:true});
assert.equal(shell.error(), null);
assert.ok('stdout' in c, 'async exec returns child process object');

//
// callback as 2nd argument
//
shell.exec('node -e \"console.log(5678);\"', function(code, output) {
  assert.equal(code, 0);
  assert.ok(output === '5678\n' || output === '5678\nundefined\n');  // 'undefined' for v0.4

  //
  // callback as 3rd argument
  //
  shell.exec('node -e \"console.log(5566);\"', {async:true}, function(code, output) {
    assert.equal(code, 0);
    assert.ok(output === '5566\n' || output === '5566\nundefined\n');  // 'undefined' for v0.4

    //
    // callback as 3rd argument (slient:true)
    //
    shell.exec('node -e \"console.log(5678);\"', {silent:true}, function(code, output) {
      assert.equal(code, 0);
      assert.ok(output === '5678\n' || output === '5678\nundefined\n');  // 'undefined' for v0.4

      shell.exit(123);

    });

  });

});

assert.equal(shell.error(), null);
