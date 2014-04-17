'use strict';

var grunt = require('grunt');
var comment = require('../tasks/lib/comment').init(grunt);

function getNormalizedFile(filepath) {
  return grunt.util.normalizelf(grunt.file.read(filepath));
}

exports.concat = {
  default_options: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('tmp/default_options');
    var expected = getNormalizedFile('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('tmp/custom_options');
    var expected = getNormalizedFile('test/expected/custom_options');
    test.equal(actual, expected, 'should utilize custom banner, footer and separator.');

    test.done();
  },
  handling_invalid_files: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('tmp/handling_invalid_files');
    var expected = getNormalizedFile('test/expected/handling_invalid_files');
    test.equal(actual, expected, 'will have warned, but should not fail.');

    test.done();
  },
  strip_banner: function(test) {
    test.expect(7);

    var src = getNormalizedFile('test/fixtures/banner.js');
    test.equal(comment.stripBanner(src), grunt.util.normalizelf('// Comment\n\n/* Comment */\n'), 'It should strip the top banner.');
    test.equal(comment.stripBanner(src, {block: true}), grunt.util.normalizelf('// Comment\n\n/* Comment */\n'), 'It should strip the top banner.');

    src = getNormalizedFile('test/fixtures/banner2.js');
    test.equal(comment.stripBanner(src), grunt.util.normalizelf('\n/*! SAMPLE\n * BANNER */\n\n// Comment\n\n/* Comment */\n'), 'It should not strip the top banner.');
    test.equal(comment.stripBanner(src, {block: true}), grunt.util.normalizelf('// Comment\n\n/* Comment */\n'), 'It should strip the top banner.');

    src = getNormalizedFile('test/fixtures/banner3.js');
    test.equal(comment.stripBanner(src), grunt.util.normalizelf('\n// This is\n// A sample\n// Banner\n\n// But this is not\n\n/* And neither\n * is this\n */\n'), 'It should not strip the top banner.');
    test.equal(comment.stripBanner(src, {block: true}), grunt.util.normalizelf('\n// This is\n// A sample\n// Banner\n\n// But this is not\n\n/* And neither\n * is this\n */\n'), 'It should not strip the top banner.');
    test.equal(comment.stripBanner(src, {line: true}), grunt.util.normalizelf('// But this is not\n\n/* And neither\n * is this\n */\n'), 'It should strip the top banner.');
    test.done();
  },
  process_function: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('tmp/process_function');
    var expected = getNormalizedFile('test/expected/process_function');
    test.equal(actual, expected, 'should have processed file content.');

    test.done();
  }
};