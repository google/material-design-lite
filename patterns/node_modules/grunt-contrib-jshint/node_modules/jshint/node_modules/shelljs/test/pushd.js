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

// Push valid directories
trail = shell.pushd('resources/pushd');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd'),
    root
]);

trail = shell.pushd('a');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root
]);

trail = shell.pushd('../b');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root
]);

trail = shell.pushd('c');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root
]);

// Push stuff around with positive indices
trail = shell.pushd('+0');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root
]);

trail = shell.pushd('+1');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root,
    path.resolve(root, 'resources/pushd/b/c')
]);

trail = shell.pushd('+2');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd'),
    root,
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a')
]);

trail = shell.pushd('+3');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root,
    path.resolve(root, 'resources/pushd/b/c')
]);

trail = shell.pushd('+4');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root
]);

// Push stuff around with negative indices
trail = shell.pushd('-0');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    root,
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd')
]);

trail = shell.pushd('-1');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root,
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b')
]);

trail = shell.pushd('-2');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    root,
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd')
]);

trail = shell.pushd('-3');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root
]);

trail = shell.pushd('-4');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    path.resolve(root, 'resources/pushd/b/c'),
    path.resolve(root, 'resources/pushd/b'),
    path.resolve(root, 'resources/pushd/a'),
    path.resolve(root, 'resources/pushd'),
    root
]);

// Push without changing directory or resolving paths
reset(); trail = shell.pushd('-n', 'resources/pushd');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    root,
    'resources/pushd'
]);

trail = shell.pushd('-n', 'resources/pushd/a');
assert.equal(shell.error(), null);
assert.equal(process.cwd(), trail[0]);
assert.deepEqual(trail, [
    root,
    'resources/pushd/a',
    'resources/pushd'
]);

// Push invalid directory
shell.pushd('does/not/exist');
assert.equal(shell.error(), 'pushd: no such file or directory: ' + path.resolve('.', 'does/not/exist') + '\n');
assert.equal(process.cwd(), trail[0]);

// Push without arguments should swap top two directories when stack length is 2
reset(); trail = shell.pushd('resources/pushd');
assert.equal(shell.error(), null);
assert.equal(trail.length, 2);
assert.equal(path.relative(root, trail[0]), 'resources/pushd');
assert.equal(trail[1], root);
assert.equal(process.cwd(), trail[0]);
trail = shell.pushd();
assert.equal(shell.error(), null);
assert.equal(trail.length, 2);
assert.equal(trail[0], root);
assert.equal(path.relative(root, trail[1]), 'resources/pushd');
assert.equal(process.cwd(), trail[0]);

// Push without arguments should swap top two directories when stack length is > 2
trail = shell.pushd('resources/pushd/a');
assert.equal(shell.error(), null);
assert.equal(trail.length, 3);
assert.equal(path.relative(root, trail[0]), 'resources/pushd/a');
assert.equal(trail[1], root);
assert.equal(path.relative(root, trail[2]), 'resources/pushd');
assert.equal(process.cwd(), trail[0]);

trail = shell.pushd();
assert.equal(shell.error(), null);
assert.equal(trail.length, 3);
assert.equal(trail[0], root);
assert.equal(path.relative(root, trail[1]), 'resources/pushd/a');
assert.equal(path.relative(root, trail[2]), 'resources/pushd');
assert.equal(process.cwd(), trail[0]);

// Push without arguments invalid when stack is empty
reset(); shell.pushd();
assert.equal(shell.error(), 'pushd: no other directory\n');

shell.exit(123);