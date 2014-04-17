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

shell.mkdir();
assert.ok(shell.error());

var mtime = fs.statSync('tmp').mtime.toString();
shell.mkdir('tmp'); // dir already exists
assert.ok(shell.error());
assert.equal(fs.statSync('tmp').mtime.toString(), mtime); // didn't mess with dir

assert.equal(fs.existsSync('/asdfasdf'), false); // sanity check
shell.mkdir('/asdfasdf/asdfasdf'); // root path does not exist
assert.ok(shell.error());
assert.equal(fs.existsSync('/asdfasdf'), false);

//
// Valids
//

assert.equal(fs.existsSync('tmp/t1'), false);
shell.mkdir('tmp/t1'); // simple dir
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/t1'), true);

assert.equal(fs.existsSync('tmp/t2'), false);
assert.equal(fs.existsSync('tmp/t3'), false);
shell.mkdir('tmp/t2', 'tmp/t3'); // multiple dirs
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/t2'), true);
assert.equal(fs.existsSync('tmp/t3'), true);

assert.equal(fs.existsSync('tmp/t1'), true);
assert.equal(fs.existsSync('tmp/t4'), false);
shell.mkdir('tmp/t1', 'tmp/t4'); // one dir exists, one doesn't
assert.equal(numLines(shell.error()), 1);
assert.equal(fs.existsSync('tmp/t1'), true);
assert.equal(fs.existsSync('tmp/t4'), true);

assert.equal(fs.existsSync('tmp/a'), false);
shell.mkdir('-p', 'tmp/a/b/c');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/a/b/c'), true);
shell.rm('-Rf', 'tmp/a'); // revert

// multiple dirs
shell.mkdir('-p', 'tmp/zzza', 'tmp/zzzb', 'tmp/zzzc');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/zzza'), true);
assert.equal(fs.existsSync('tmp/zzzb'), true);
assert.equal(fs.existsSync('tmp/zzzc'), true);

// multiple dirs, array syntax
shell.mkdir('-p', ['tmp/yyya', 'tmp/yyyb', 'tmp/yyyc']);
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('tmp/yyya'), true);
assert.equal(fs.existsSync('tmp/yyyb'), true);
assert.equal(fs.existsSync('tmp/yyyc'), true);

shell.exit(123);
