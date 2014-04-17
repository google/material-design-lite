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

assert.equal(fs.existsSync('/asdfasdf'), false); // sanity check
var result = shell.ls('/asdfasdf'); // no such file or dir
assert.ok(shell.error());
assert.equal(result.length, 0);

//
// Valids
//

var result = shell.ls();
assert.equal(shell.error(), null);

var result = shell.ls('/');
assert.equal(shell.error(), null);

// no args
shell.cd('resources/ls');
var result = shell.ls();
assert.equal(shell.error(), null);
assert.equal(result.indexOf('file1') > -1, true);
assert.equal(result.indexOf('file2') > -1, true);
assert.equal(result.indexOf('file1.js') > -1, true);
assert.equal(result.indexOf('file2.js') > -1, true);
assert.equal(result.indexOf('filename(with)[chars$]^that.must+be-escaped') > -1, true);
assert.equal(result.indexOf('a_dir') > -1, true);
assert.equal(result.length, 6);
shell.cd('../..');

// simple arg
var result = shell.ls('resources/ls');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('file1') > -1, true);
assert.equal(result.indexOf('file2') > -1, true);
assert.equal(result.indexOf('file1.js') > -1, true);
assert.equal(result.indexOf('file2.js') > -1, true);
assert.equal(result.indexOf('filename(with)[chars$]^that.must+be-escaped') > -1, true);
assert.equal(result.indexOf('a_dir') > -1, true);
assert.equal(result.length, 6);

// no args, 'all' option
shell.cd('resources/ls');
var result = shell.ls('-A');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('file1') > -1, true);
assert.equal(result.indexOf('file2') > -1, true);
assert.equal(result.indexOf('file1.js') > -1, true);
assert.equal(result.indexOf('file2.js') > -1, true);
assert.equal(result.indexOf('filename(with)[chars$]^that.must+be-escaped') > -1, true);
assert.equal(result.indexOf('a_dir') > -1, true);
assert.equal(result.indexOf('.hidden_file') > -1, true);
assert.equal(result.indexOf('.hidden_dir') > -1, true);
assert.equal(result.length, 8);
shell.cd('../..');

// no args, 'all' option
shell.cd('resources/ls');
var result = shell.ls('-a'); // (deprecated) backwards compatibility test
assert.equal(shell.error(), null);
assert.equal(result.indexOf('file1') > -1, true);
assert.equal(result.indexOf('file2') > -1, true);
assert.equal(result.indexOf('file1.js') > -1, true);
assert.equal(result.indexOf('file2.js') > -1, true);
assert.equal(result.indexOf('filename(with)[chars$]^that.must+be-escaped') > -1, true);
assert.equal(result.indexOf('a_dir') > -1, true);
assert.equal(result.indexOf('.hidden_file') > -1, true);
assert.equal(result.indexOf('.hidden_dir') > -1, true);
assert.equal(result.length, 8);
shell.cd('../..');

// wildcard, simple
var result = shell.ls('resources/ls/*');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('resources/ls/file1') > -1, true);
assert.equal(result.indexOf('resources/ls/file2') > -1, true);
assert.equal(result.indexOf('resources/ls/file1.js') > -1, true);
assert.equal(result.indexOf('resources/ls/file2.js') > -1, true);
assert.equal(result.indexOf('resources/ls/filename(with)[chars$]^that.must+be-escaped') > -1, true);
assert.equal(result.indexOf('resources/ls/a_dir') > -1, true);
assert.equal(result.length, 6);

// wildcard, hidden only
var result = shell.ls('resources/ls/.*');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('resources/ls/.hidden_file') > -1, true);
assert.equal(result.indexOf('resources/ls/.hidden_dir') > -1, true);
assert.equal(result.length, 2);

// wildcard, mid-file
var result = shell.ls('resources/ls/f*le*');
assert.equal(shell.error(), null);
assert.equal(result.length, 5);
assert.equal(result.indexOf('resources/ls/file1') > -1, true);
assert.equal(result.indexOf('resources/ls/file2') > -1, true);
assert.equal(result.indexOf('resources/ls/file1.js') > -1, true);
assert.equal(result.indexOf('resources/ls/file2.js') > -1, true);
assert.equal(result.indexOf('resources/ls/filename(with)[chars$]^that.must+be-escaped') > -1, true);

// wildcard, mid-file with dot (should escape dot for regex)
var result = shell.ls('resources/ls/f*le*.js');
assert.equal(shell.error(), null);
assert.equal(result.length, 2);
assert.equal(result.indexOf('resources/ls/file1.js') > -1, true);
assert.equal(result.indexOf('resources/ls/file2.js') > -1, true);

// wildcard, should not do partial matches
var result = shell.ls('resources/ls/*.j'); // shouldn't get .js
assert.equal(shell.error(), null);
assert.equal(result.length, 0);

// wildcard, all files with extension
var result = shell.ls('resources/ls/*.*');
assert.equal(shell.error(), null);
assert.equal(result.length, 3);
assert.equal(result.indexOf('resources/ls/file1.js') > -1, true);
assert.equal(result.indexOf('resources/ls/file2.js') > -1, true);
assert.equal(result.indexOf('resources/ls/filename(with)[chars$]^that.must+be-escaped') > -1, true);

// wildcard, with additional path
var result = shell.ls('resources/ls/f*le*.js', 'resources/ls/a_dir');
assert.equal(shell.error(), null);
assert.equal(result.length, 4);
assert.equal(result.indexOf('resources/ls/file1.js') > -1, true);
assert.equal(result.indexOf('resources/ls/file2.js') > -1, true);
assert.equal(result.indexOf('b_dir') > -1, true); // no wildcard == no path prefix
assert.equal(result.indexOf('nada') > -1, true); // no wildcard == no path prefix

// wildcard for both paths
var result = shell.ls('resources/ls/f*le*.js', 'resources/ls/a_dir/*');
assert.equal(shell.error(), null);
assert.equal(result.length, 4);
assert.equal(result.indexOf('resources/ls/file1.js') > -1, true);
assert.equal(result.indexOf('resources/ls/file2.js') > -1, true);
assert.equal(result.indexOf('resources/ls/a_dir/b_dir') > -1, true);
assert.equal(result.indexOf('resources/ls/a_dir/nada') > -1, true);

// wildcard for both paths, array
var result = shell.ls(['resources/ls/f*le*.js', 'resources/ls/a_dir/*']);
assert.equal(shell.error(), null);
assert.equal(result.length, 4);
assert.equal(result.indexOf('resources/ls/file1.js') > -1, true);
assert.equal(result.indexOf('resources/ls/file2.js') > -1, true);
assert.equal(result.indexOf('resources/ls/a_dir/b_dir') > -1, true);
assert.equal(result.indexOf('resources/ls/a_dir/nada') > -1, true);

// recursive, no path
shell.cd('resources/ls');
var result = shell.ls('-R');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('a_dir') > -1, true);
assert.equal(result.indexOf('a_dir/b_dir') > -1, true);
assert.equal(result.indexOf('a_dir/b_dir/z') > -1, true);
assert.equal(result.length, 9);
shell.cd('../..');

// recusive, path given
var result = shell.ls('-R', 'resources/ls');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('a_dir') > -1, true);
assert.equal(result.indexOf('a_dir/b_dir') > -1, true);
assert.equal(result.indexOf('a_dir/b_dir/z') > -1, true);
assert.equal(result.length, 9);

// recusive, path given - 'all' flag
var result = shell.ls('-RA', 'resources/ls');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('a_dir') > -1, true);
assert.equal(result.indexOf('a_dir/b_dir') > -1, true);
assert.equal(result.indexOf('a_dir/b_dir/z') > -1, true);
assert.equal(result.indexOf('a_dir/.hidden_dir/nada') > -1, true);
assert.equal(result.length, 14);

// recursive, wildcard
var result = shell.ls('-R', 'resources/ls/*');
assert.equal(shell.error(), null);
assert.equal(result.indexOf('resources/ls/a_dir') > -1, true);
assert.equal(result.indexOf('resources/ls/a_dir/b_dir') > -1, true);
assert.equal(result.indexOf('resources/ls/a_dir/b_dir/z') > -1, true);
assert.equal(result.length, 9);

shell.exit(123);
