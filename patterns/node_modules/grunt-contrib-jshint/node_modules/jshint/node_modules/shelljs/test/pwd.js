var shell = require('..');

var assert = require('assert'),
    path = require('path');

shell.config.silent = true;

function numLines(str) {
  return typeof str === 'string' ? str.match(/\n/g).length : 0;
}

shell.rm('-rf', 'tmp');
shell.mkdir('tmp');

//
// Valids
//

var _pwd = shell.pwd();
assert.equal(shell.error(), null);
assert.equal(_pwd, path.resolve('.'));

shell.cd('tmp');
var _pwd = shell.pwd();
assert.equal(shell.error(), null);
assert.equal(path.basename(_pwd), 'tmp');

shell.exit(123);
