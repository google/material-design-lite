var shell = require('..');

var assert = require('assert');

shell.config.silent = true;

shell.rm('-rf', 'tmp');
shell.mkdir('tmp');

//
// Valids
//

assert.equal(shell.env['PATH'], process.env['PATH']);

shell.env['SHELLJS_TEST'] = 'hello world';
assert.equal(shell.env['SHELLJS_TEST'], process.env['SHELLJS_TEST']);

shell.exit(123);
