var shell = require('..');

var assert = require('assert'),
    path = require('path'),
    fs = require('fs');

// Node shims for < v0.7
fs.existsSync = fs.existsSync || path.existsSync;

shell.config.silent = true;

shell.rm('-rf', 'tmp');
shell.mkdir('tmp');

//
// Invalids
//

var result = shell.test(); // no expression given
assert.ok(shell.error());

var result = shell.test('asdf'); // bad expression
assert.ok(shell.error());

var result = shell.test('f', 'resources/file1'); // bad expression
assert.ok(shell.error());

var result = shell.test('-f'); // no file
assert.ok(shell.error());

//
// Valids
//

//exists
var result = shell.test('-e', 'resources/file1');
assert.equal(shell.error(), null);
assert.equal(result, true);//true

var result = shell.test('-e', 'resources/404');
assert.equal(shell.error(), null);
assert.equal(result, false);

//directory
var result = shell.test('-d', 'resources');
assert.equal(shell.error(), null);
assert.equal(result, true);//true

var result = shell.test('-f', 'resources');
assert.equal(shell.error(), null);
assert.equal(result, false);

var result = shell.test('-L', 'resources');
assert.equal(shell.error(), null);
assert.equal(result, false);

//file
var result = shell.test('-d', 'resources/file1');
assert.equal(shell.error(), null);
assert.equal(result, false);

var result = shell.test('-f', 'resources/file1');
assert.equal(shell.error(), null);
assert.equal(result, true);//true

var result = shell.test('-L', 'resources/file1');
assert.equal(shell.error(), null);
assert.equal(result, false);

//link
var result = shell.test('-d', 'resources/link');
assert.equal(shell.error(), null);
assert.equal(result, false);

var result = shell.test('-f', 'resources/link');
assert.equal(shell.error(), null);
assert.equal(result, true);//true

var result = shell.test('-L', 'resources/link');
assert.equal(shell.error(), null);
assert.equal(result, true);//true

var result = shell.test('-L', 'resources/badlink');
assert.equal(shell.error(), null);
assert.equal(result, true);//true

var result = shell.test('-L', 'resources/404');
assert.equal(shell.error(), null);
assert.equal(result, false);//false

shell.exit(123);
