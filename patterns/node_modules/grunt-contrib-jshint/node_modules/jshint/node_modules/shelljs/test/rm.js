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

shell.rm();
assert.ok(shell.error());

shell.rm('asdfasdf'); // file does not exist
assert.ok(shell.error());

shell.rm('-f'); // no file
assert.ok(shell.error());

shell.rm('-@', 'resources/file1'); // invalid option
assert.ok(shell.error());
assert.equal(fs.existsSync('resources/file1'), true);

//
// Valids
//

// file does not exist, but -f specified
shell.rm('-f', 'asdfasdf');
assert.equal(shell.error(), null);

// simple rm
shell.cp('-f', 'resources/file1', 'tmp/file1');
assert.equal(fs.existsSync('tmp/file1'), true);
shell.rm('tmp/file1');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file1'), false);

// recursive dir removal - small-caps '-r'
shell.mkdir('-p', 'tmp/a/b/c');
assert.equal(fs.existsSync('tmp/a/b/c'), true);
shell.rm('-rf', 'tmp/a');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/a'), false);

// recursive dir removal - capital '-R'
shell.mkdir('-p', 'tmp/a/b/c');
assert.equal(fs.existsSync('tmp/a/b/c'), true);
shell.rm('-Rf', 'tmp/a');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/a'), false);

// recursive dir removal - absolute path
shell.mkdir('-p', 'tmp/a/b/c');
assert.equal(fs.existsSync('tmp/a/b/c'), true);
shell.rm('-Rf', path.resolve('./tmp/a'));
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/a'), false);

// wildcard
shell.cp('-f', 'resources/file*', 'tmp');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file1'), true);
assert.equal(fs.existsSync('tmp/file2'), true);
assert.equal(fs.existsSync('tmp/file1.js'), true);
assert.equal(fs.existsSync('tmp/file2.js'), true);
shell.rm('tmp/file*');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/file1'), false);
assert.equal(fs.existsSync('tmp/file2'), false);
assert.equal(fs.existsSync('tmp/file1.js'), false);
assert.equal(fs.existsSync('tmp/file2.js'), false);

// recursive dir removal
shell.mkdir('-p', 'tmp/a/b/c');
shell.mkdir('-p', 'tmp/b');
shell.mkdir('-p', 'tmp/c');
shell.mkdir('-p', 'tmp/.hidden');
assert.equal(fs.existsSync('tmp/a/b/c'), true);
assert.equal(fs.existsSync('tmp/b'), true);
assert.equal(fs.existsSync('tmp/c'), true);
assert.equal(fs.existsSync('tmp/.hidden'), true);
shell.rm('-rf', 'tmp/*'); 
assert.equal(shell.error(), null);
var contents = fs.readdirSync('tmp');
assert.equal(contents.length, 1);
assert.equal(contents[0], '.hidden'); // shouldn't remove hiddden if no .* given

// recursive dir removal
shell.mkdir('-p', 'tmp/a/b/c');
shell.mkdir('-p', 'tmp/b');
shell.mkdir('-p', 'tmp/c');
shell.mkdir('-p', 'tmp/.hidden');
assert.equal(fs.existsSync('tmp/a/b/c'), true);
assert.equal(fs.existsSync('tmp/b'), true);
assert.equal(fs.existsSync('tmp/c'), true);
assert.equal(fs.existsSync('tmp/.hidden'), true);
shell.rm('-rf', 'tmp/*', 'tmp/.*');
assert.equal(shell.error(), null);
var contents = fs.readdirSync('tmp');
assert.equal(contents.length, 0);

// recursive dir removal - array-syntax
shell.mkdir('-p', 'tmp/a/b/c');
shell.mkdir('-p', 'tmp/b');
shell.mkdir('-p', 'tmp/c');
shell.mkdir('-p', 'tmp/.hidden');
assert.equal(fs.existsSync('tmp/a/b/c'), true);
assert.equal(fs.existsSync('tmp/b'), true);
assert.equal(fs.existsSync('tmp/c'), true);
assert.equal(fs.existsSync('tmp/.hidden'), true);
shell.rm('-rf', ['tmp/*', 'tmp/.*']);
assert.equal(shell.error(), null);
var contents = fs.readdirSync('tmp');
assert.equal(contents.length, 0);

// removal of a read-only file (unforced)
shell.mkdir('-p', 'tmp/readonly');
'asdf'.to('tmp/readonly/file1');
fs.chmodSync('tmp/readonly/file1', '0444'); // -r--r--r--
shell.rm('tmp/readonly/file1');
assert.equal(fs.existsSync('tmp/readonly/file1'), true); // bash's rm always asks before removing read-only files
                                                         // here we just assume "no"

// removal of a read-only file (forced)
shell.mkdir('-p', 'tmp/readonly');
'asdf'.to('tmp/readonly/file2');
fs.chmodSync('tmp/readonly/file2', '0444'); // -r--r--r--
shell.rm('-f', 'tmp/readonly/file2');
assert.equal(fs.existsSync('tmp/readonly/file2'), false);

// removal of a tree containing read-only files (unforced)
shell.mkdir('-p', 'tmp/tree2');
'asdf'.to('tmp/tree2/file1');
'asdf'.to('tmp/tree2/file2');
fs.chmodSync('tmp/tree2/file1', '0444'); // -r--r--r--
shell.rm('-r', 'tmp/tree2');
assert.equal(fs.existsSync('tmp/tree2/file1'), true);
assert.equal(fs.existsSync('tmp/tree2/file2'), false);

// removal of a tree containing read-only files (forced)
shell.mkdir('-p', 'tmp/tree');
'asdf'.to('tmp/tree/file1');
'asdf'.to('tmp/tree/file2');
fs.chmodSync('tmp/tree/file1', '0444'); // -r--r--r--
shell.rm('-rf', 'tmp/tree');
assert.equal(fs.existsSync('tmp/tree'), false);

// removal of a sub-tree containing read-only and hidden files - rm('dir/*')
shell.mkdir('-p', 'tmp/tree3');
shell.mkdir('-p', 'tmp/tree3/subtree');
shell.mkdir('-p', 'tmp/tree3/.hidden');
'asdf'.to('tmp/tree3/subtree/file');
'asdf'.to('tmp/tree3/.hidden/file');
'asdf'.to('tmp/tree3/file');
fs.chmodSync('tmp/tree3/file', '0444'); // -r--r--r--
fs.chmodSync('tmp/tree3/subtree/file', '0444'); // -r--r--r--
fs.chmodSync('tmp/tree3/.hidden/file', '0444'); // -r--r--r--
shell.rm('-rf', 'tmp/tree3/*', 'tmp/tree3/.*'); // erase dir contents
assert.equal(shell.ls('tmp/tree3').length, 0);

// removal of a sub-tree containing read-only and hidden files - rm('dir')
shell.mkdir('-p', 'tmp/tree4');
shell.mkdir('-p', 'tmp/tree4/subtree');
shell.mkdir('-p', 'tmp/tree4/.hidden');
'asdf'.to('tmp/tree4/subtree/file');
'asdf'.to('tmp/tree4/.hidden/file');
'asdf'.to('tmp/tree4/file');
fs.chmodSync('tmp/tree4/file', '0444'); // -r--r--r--
fs.chmodSync('tmp/tree4/subtree/file', '0444'); // -r--r--r--
fs.chmodSync('tmp/tree4/.hidden/file', '0444'); // -r--r--r--
shell.rm('-rf', 'tmp/tree4'); // erase dir contents
assert.equal(fs.existsSync('tmp/tree4'), false);

shell.exit(123);
