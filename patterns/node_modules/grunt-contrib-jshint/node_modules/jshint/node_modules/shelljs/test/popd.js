var shell = require('..');

var assert = require('assert'),
    path = require('path'),
    fs = require('fs');

// Node shims for < v0.7
fs.existsSync = fs.existsSync || path.existsSync;

shell.config.silent = true;

var root = path.resolve(), trail;

function reset() {
    shell.dirs('-c');
    shell.cd(root);
}

// Valid
shell.pushd('resources/pushd');
trail = shell.popd();
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [ root ]);

shell.pushd('resources/pushd');
shell.pushd('a');
trail = shell.popd();
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd'),
    root
]);

shell.pushd('b');
trail = shell.popd();
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd'),
    root
]);

shell.pushd('b');
shell.pushd('c');
trail = shell.popd();
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd'),
    root
]);

trail = shell.popd();
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd'),
    root
]);

trail = shell.popd();
assert.equal(shell.error(), null);
assert.equal(trail.length, 1);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [ root ]);

// Valid by index
shell.pushd('resources/pushd');
trail = shell.popd('+0');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [ root ]);

shell.pushd('resources/pushd');
trail = shell.popd('+1');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [ path.resolve(root, 'resources/pushd') ]);

reset(); shell.pushd('resources/pushd');
trail = shell.popd('-0');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [ path.resolve(root, 'resources/pushd') ]);

reset(); shell.pushd('resources/pushd');
trail = shell.popd('-1');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [ root ]);


reset(); shell.pushd('resources/pushd');
trail = shell.popd('-n');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [ path.resolve(root, 'resources/pushd') ]);

// Invalid
trail = shell.popd();
assert.ok(shell.error('popd: directory stack empty\n'));

// Test that the root dir is not stored
shell.cd('resources/pushd');
shell.pushd('b');
trail = shell.popd();
assert.equal(shell.error(), null);
assert.equal(trail[0], path.resolve(root, 'resources/pushd'));
assert.equal(process.cwd(), trail[0]);
shell.popd();
assert.ok(shell.error(), null);

shell.cd(root);

shell.exit(123);