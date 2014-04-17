/**
 * Temporary - The lord of tmp.
 *
 * Author: Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License.
 */

/**
 * Dependencies.
 */
var generator = require('../lib/generator');
var detector = require('../lib/detector');
var should = require('chai').should();

describe('generator', function() {
  describe('name', function() {
    it('should unique generate name', function() {
      generator.name().should.be.ok;
    });
  });

  describe('build', function() {
    it('should build full names', function() {
      var tmp = detector.tmp();
      generator.build().indexOf(tmp).should.equal(0);
      generator.build('foo').indexOf(tmp + 'foo.').should.equal(0);
    });
  });
});
