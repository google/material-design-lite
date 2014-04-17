var shell = require('..');

var assert = require('assert'),
    child = require('child_process');

function numLines(str) {
  return typeof str === 'string' ? str.match(/\n/g).length : 0;
}

//
// config.silent
//

assert.equal(shell.config.silent, false); // default

shell.config.silent = true;
assert.equal(shell.config.silent, true);

shell.config.silent = false;
assert.equal(shell.config.silent, false);

//
// config.fatal
//

assert.equal(shell.config.fatal, false); // default

//
// config.fatal = false
//
shell.mkdir('-p', 'tmp');
var file = 'tmp/tempscript'+Math.random()+'.js',
    script = 'require(\'../../global.js\'); config.silent=true; config.fatal=false; cp("this_file_doesnt_exist", "."); echo("got here");';
script.to(file);
child.exec('node '+file, function(err, stdout, stderr) {
  assert.ok(stdout.match('got here'));

  //
  // config.fatal = true
  //
  shell.mkdir('-p', 'tmp');
  var file = 'tmp/tempscript'+Math.random()+'.js',
      script = 'require(\'../../global.js\'); config.silent=true; config.fatal=true; cp("this_file_doesnt_exist", "."); echo("got here");';
  script.to(file);
  child.exec('node '+file, function(err, stdout, stderr) {
    assert.ok(!stdout.match('got here'));

    shell.exit(123);
  });
});
