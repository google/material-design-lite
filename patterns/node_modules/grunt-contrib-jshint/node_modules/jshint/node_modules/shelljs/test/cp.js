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

shell.cp();
assert.ok(shell.error());

shell.cp('file1');
assert.ok(shell.error());

shell.cp('-f');
assert.ok(shell.error());

shell.rm('-rf', 'tmp/*');
shell.cp('-@', 'resources/file1', 'tmp/file1'); // option not supported, files OK
assert.ok(shell.error());
assert.equal(fs.existsSync('tmp/file1'), false);

shell.cp('-Z', 'asdfasdf', 'tmp/file2'); // option not supported, files NOT OK
assert.ok(shell.error());
assert.equal(fs.existsSync('tmp/file2'), false);

shell.cp('asdfasdf', 'tmp'); // source does not exist
assert.ok(shell.error());
assert.equal(numLines(shell.error()), 1);
assert.equal(fs.existsSync('tmp/asdfasdf'), false);

shell.cp('asdfasdf1', 'asdfasdf2', 'tmp'); // sources do not exist
assert.ok(shell.error());
assert.equal(numLines(shell.error()), 2);
assert.equal(fs.existsSync('tmp/asdfasdf1'), false);
assert.equal(fs.existsSync('tmp/asdfasdf2'), false);

shell.cp('asdfasdf1', 'asdfasdf2', 'resources/file1'); // too many sources (dest is file)
assert.ok(shell.error());

shell.cp('resources/file1', 'resources/file2'); // dest already exists
assert.ok(shell.error());

shell.cp('resources/file1', 'resources/file2', 'tmp/a_file'); // too many sources
assert.ok(shell.error());
assert.equal(fs.existsSync('tmp/a_file'), false);

//
// Valids
//

// simple - to dir
shell.cp('resources/file1', 'tmp');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file1'), true);

// simple - to file
shell.cp('resources/file2', 'tmp/file2');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file2'), true);

// simple - file list
shell.rm('-rf', 'tmp/*');
shell.cp('resources/file1', 'resources/file2', 'tmp');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file1'), true);
assert.equal(fs.existsSync('tmp/file2'), true);

// simple - file list, array syntax
shell.rm('-rf', 'tmp/*');
shell.cp(['resources/file1', 'resources/file2'], 'tmp');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file1'), true);
assert.equal(fs.existsSync('tmp/file2'), true);

shell.cp('resources/file2', 'tmp/file3');
assert.equal(fs.existsSync('tmp/file3'), true);
shell.cp('-f', 'resources/file2', 'tmp/file3'); // file exists, but -f specified
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file3'), true);

// wildcard
shell.rm('tmp/file1', 'tmp/file2');
shell.cp('resources/file*', 'tmp');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file1'), true);
assert.equal(fs.existsSync('tmp/file2'), true);

//recursive, nothing exists
shell.rm('-rf', 'tmp/*');
shell.cp('-R', 'resources/cp', 'tmp');
assert.equal(shell.error(), null);
assert.equal(shell.ls('-R', 'resources/cp') + '', shell.ls('-R', 'tmp/cp') + '');

//recursive, nothing exists, source ends in '/' (see Github issue #15)
shell.rm('-rf', 'tmp/*');
shell.cp('-R', 'resources/cp/', 'tmp/');
assert.equal(shell.error(), null);
assert.equal(shell.ls('-R', 'resources/cp') + '', shell.ls('-R', 'tmp') + '');

//recursive, everything exists, no force flag
shell.rm('-rf', 'tmp/*');
shell.cp('-R', 'resources/cp', 'tmp');
shell.cp('-R', 'resources/cp', 'tmp');
assert.equal(shell.error(), null); // crash test only

//recursive, everything exists, with force flag
shell.rm('-rf', 'tmp/*');
shell.cp('-R', 'resources/cp', 'tmp');
'changing things around'.to('tmp/cp/dir_a/z');
assert.notEqual(shell.cat('resources/cp/dir_a/z'), shell.cat('tmp/cp/dir_a/z')); // before cp
shell.cp('-Rf', 'resources/cp', 'tmp');
assert.equal(shell.error(), null);
assert.equal(shell.cat('resources/cp/dir_a/z'), shell.cat('tmp/cp/dir_a/z')); // after cp

//recursive, creates dest dir since it's only one level deep (see Github issue #44)
shell.rm('-rf', 'tmp/*');
shell.cp('-r', 'resources/issue44/*', 'tmp/dir2');
assert.equal(shell.error(), null);
assert.equal(shell.ls('-R', 'resources/issue44') + '', shell.ls('-R', 'tmp/dir2') + '');
assert.equal(shell.cat('resources/issue44/main.js'), shell.cat('tmp/dir2/main.js'));

//recursive, does *not* create dest dir since it's too deep (see Github issue #44)
shell.rm('-rf', 'tmp/*');
shell.cp('-r', 'resources/issue44/*', 'tmp/dir2/dir3');
assert.ok(shell.error());
assert.equal(fs.existsSync('tmp/dir2'), false);

shell.exit(123);
