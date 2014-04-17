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

// save current dir
var cur = shell.pwd();

shell.rm('-rf', 'tmp');
shell.mkdir('tmp');

//
// Invalids
//

shell.cd();
assert.ok(shell.error());

assert.equal(fs.existsSync('/asdfasdf'), false); // sanity check
shell.cd('/adsfasdf'); // dir does not exist
assert.ok(shell.error());

assert.equal(fs.existsSync('resources/file1'), true); // sanity check
shell.cd('resources/file1'); // file, not dir
assert.ok(shell.error());

//
// Valids
//

shell.cd(cur);
shell.cd('tmp');
assert.equal(shell.error(), null);
assert.equal(path.basename(process.cwd()), 'tmp');

shell.cd(cur);
shell.cd('/');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), path.resolve('/'));

// cd + other commands

shell.cd(cur);
shell.rm('-f', 'tmp/*');
assert.equal(fs.existsSync('tmp/file1'), false);
shell.cd('resources');
assert.equal(shell.error(), null);
shell.cp('file1', '../tmp');
assert.equal(shell.error(), null);
shell.cd('../tmp');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync('file1'), true);

shell.exit(123);
