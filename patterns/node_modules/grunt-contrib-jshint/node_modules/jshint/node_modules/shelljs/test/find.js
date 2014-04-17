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

var result = shell.find(); // no paths given
assert.ok(shell.error());

//
// Valids
//

// current path
shell.cd('resources/find');
var result = shell.find('.');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('.hidden') > -1, true);
assert.equal(result.indexOf('dir1/dir11/a_dir11') > -1, true);
assert.equal(result.length, 11);
shell.cd('../..');

// simple path
var result = shell.find('resources/find');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('resources/find/.hidden') > -1, true);
assert.equal(result.indexOf('resources/find/dir1/dir11/a_dir11') > -1, true);
assert.equal(result.length, 11);

// multiple paths - comma
var result = shell.find('resources/find/dir1', 'resources/find/dir2');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('resources/find/dir1/dir11/a_dir11') > -1, true);
assert.equal(result.indexOf('resources/find/dir2/a_dir1') > -1, true);
assert.equal(result.length, 6);

// multiple paths - array
var result = shell.find(['resources/find/dir1', 'resources/find/dir2']);
assert.equal(shell.error(), null);
assert.equal(result.indexOf('resources/find/dir1/dir11/a_dir11') > -1, true);
assert.equal(result.indexOf('resources/find/dir2/a_dir1') > -1, true);
assert.equal(result.length, 6);

shell.exit(123);
