var shell = require('..');

var assert = require('assert'),
    path = require('path'),
    fs = require('fs');

// Node shims for < v0.7
fs.existsSync = fs.existsSync || path.existsSync;

shell.config.silent = true;

function numLines(str) {
  return typeof str === 'string' ? str.match(/\n/g).length : 0;
}

shell.rm('-rf', 'tmp');
shell.mkdir('tmp');

//
// Invalids
//

shell.grep();
assert.ok(shell.error());

shell.grep(/asdf/g); // too few args
assert.ok(shell.error());

assert.equal(fs.existsSync('/asdfasdf'), false); // sanity check
shell.grep(/asdf/g, '/asdfasdf'); // no such file
assert.ok(shell.error());

//
// Valids
//

var result = shell.grep('line', 'resources/a.txt');
assert.equal(shell.error(), null);
assert.equal(result.split('\n').length - 1, 4);

var result = shell.grep('-v', 'line', 'resources/a.txt');
assert.equal(shell.error(), null);
assert.equal(result.split('\n').length - 1, 8);

var result = shell.grep('line one', 'resources/a.txt');
assert.equal(shell.error(), null);
assert.equal(result, 'This is line one\n');

// multiple files
var result = shell.grep(/test/, 'resources/file1.txt', 'resources/file2.txt');
assert.equal(shell.error(), null);
assert.equal(result, 'test1\ntest2\n');

// multiple files, array syntax
var result = shell.grep(/test/, ['resources/file1.txt', 'resources/file2.txt']);
assert.equal(shell.error(), null);
assert.equal(result, 'test1\ntest2\n');

shell.exit(123);
