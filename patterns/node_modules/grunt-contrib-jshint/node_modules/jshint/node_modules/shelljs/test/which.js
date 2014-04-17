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

shell.which();
assert.ok(shell.error());

var result = shell.which('asdfasdfasdfasdfasdf'); // what are the odds...
assert.equal(shell.error(), null);
assert.equal(result, null);

//
// Valids
//

var result = shell.which('node');
assert.equal(shell.error(), null);
assert.equal(fs.existsSync(result), true);

shell.exit(123);
