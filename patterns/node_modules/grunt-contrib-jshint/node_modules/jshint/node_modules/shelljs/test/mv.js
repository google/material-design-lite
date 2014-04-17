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

// Prepare tmp/
shell.cp('resources/*', 'tmp');

//
// Invalids
//

shell.mv();
assert.ok(shell.error());

shell.mv('file1');
assert.ok(shell.error());

shell.mv('-f');
assert.ok(shell.error());

shell.mv('-Z', 'tmp/file1', 'tmp/file1'); // option not supported
assert.ok(shell.error());
assert.equal(fs.existsSync('tmp/file1'), true);

shell.mv('asdfasdf', 'tmp'); // source does not exist
assert.ok(shell.error());
assert.equal(numLines(shell.error()), 1);
assert.equal(fs.existsSync('tmp/asdfasdf'), false);

shell.mv('asdfasdf1', 'asdfasdf2', 'tmp'); // sources do not exist
assert.ok(shell.error());
assert.equal(numLines(shell.error()), 2);
assert.equal(fs.existsSync('tmp/asdfasdf1'), false);
assert.equal(fs.existsSync('tmp/asdfasdf2'), false);

shell.mv('asdfasdf1', 'asdfasdf2', 'tmp/file1'); // too many sources (dest is file)
assert.ok(shell.error());

shell.mv('tmp/file1', 'tmp/file2'); // dest already exists
assert.ok(shell.error());

shell.mv('tmp/file1', 'tmp/file2', 'tmp/a_file'); // too many sources (exist, but dest is file)
assert.ok(shell.error());
assert.equal(fs.existsSync('tmp/a_file'), false);

shell.mv('tmp/file*', 'tmp/file1'); // can't use wildcard when dest is file
assert.ok(shell.error());
assert.equal(fs.existsSync('tmp/file1'), true);
assert.equal(fs.existsSync('tmp/file2'), true);
assert.equal(fs.existsSync('tmp/file1.js'), true);
assert.equal(fs.existsSync('tmp/file2.js'), true);

//
// Valids
//

shell.cd('tmp');

// handles self OK
shell.mkdir('tmp2');
shell.mv('*', 'tmp2'); // has to handle self (tmp2 --> tmp2) without throwing error
assert.ok(shell.error()); // there's an error, but not fatal
assert.equal(fs.existsSync('tmp2/file1'), true); // moved OK
shell.mv('tmp2/*', '.'); // revert
assert.equal(fs.existsSync('file1'), true); // moved OK

shell.mv('file1', 'file3'); // one source
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('file1'), false);
assert.equal(fs.existsSync('file3'), true);
shell.mv('file3', 'file1'); // revert
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('file1'), true);

// two sources
shell.rm('-rf', 't');
shell.mkdir('-p', 't');
shell.mv('file1', 'file2', 't');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('file1'), false);
assert.equal(fs.existsSync('file2'), false);
assert.equal(fs.existsSync('t/file1'), true);
assert.equal(fs.existsSync('t/file2'), true);
shell.mv('t/*', '.'); // revert
assert.equal(fs.existsSync('file1'), true);
assert.equal(fs.existsSync('file2'), true);

// two sources, array style
shell.rm('-rf', 't');
shell.mkdir('-p', 't');
shell.mv(['file1', 'file2'], 't'); // two sources
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('file1'), false);
assert.equal(fs.existsSync('file2'), false);
assert.equal(fs.existsSync('t/file1'), true);
assert.equal(fs.existsSync('t/file2'), true);
shell.mv('t/*', '.'); // revert
assert.equal(fs.existsSync('file1'), true);
assert.equal(fs.existsSync('file2'), true);

shell.mv('file*.js', 't'); // wildcard
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('file1.js'), false);
assert.equal(fs.existsSync('file2.js'), false);
assert.equal(fs.existsSync('t/file1.js'), true);
assert.equal(fs.existsSync('t/file2.js'), true);
shell.mv('t/*', '.'); // revert
assert.equal(fs.existsSync('file1.js'), true);
assert.equal(fs.existsSync('file2.js'), true);

shell.mv('-f', 'file1', 'file2'); // dest exists, but -f given
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('file1'), false);
assert.equal(fs.existsSync('file2'), true);

shell.exit(123);
