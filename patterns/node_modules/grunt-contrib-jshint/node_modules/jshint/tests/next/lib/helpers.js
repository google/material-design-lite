var _ = require("underscore");
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var linter = require("../../../src/next/jshint.js");

// Returns contents of a fixture.
//
// Fixture's parent directory depends on the suite's file name. For example,
// fixtures for test/unit/parser.js should be in test/fixtures/parser/<file>.js

function Fixtures(dirname, filename) {
	this.dirname = dirname;
	this.filename = filename;
}

Fixtures.prototype.get = function (name) {
	var dir, stream;

	dir = path.basename(this.filename).replace(".js", "");
	stream = fs.readFileSync(path.resolve(this.dirname, "..", "fixtures", dir, name));

	return stream.toString().replace(/\r\n/g, "\n");
};

// A test helper designed specifically for JSHint. It allows us to write
// tests in a declarative manner thus reducing code duplication.

function createRunner(dirname, filename) {
	var fixtures = new Fixtures(dirname, filename);

	function runner(test) {
		var expected = [];

		var helper = {
			addError: function (line, code) {
				expected.push({
					line: line,
					code: code
				});

				return helper;
			},

			addErrors: function (lines, code) {
				_.each(lines, function (line) {
					helper.addError(line, code);
				});

				return helper;
			},

			test: function (source, options, globals) {
				var retval = linter.lint({ code: source, predefined: globals });
				var errors = retval.report.getMessages();

				// If the linter didn't produce any errors and we don't
				// expect any, quietly return.

				if (errors.length === 0 && expected.length === 0)
					return;

				// Otherwise get a list of unexpected errors.

				var unexpected = _.reject(errors, function (err, line) {
					return _.any(expected, function (exp) {
						return exp.line === err.line && exp.code === err.data.code;
					});
				});

				// And errors that were expected but not thrown by the linter.

				var unthrown = _.reject(expected, function (exp) {
					return _.any(errors, function (err) {
						return err.line === exp.line && err.data.code === exp.code;
					});
				});

				// If we expected all errors thrown by the linter, quietly return.

				if (unexpected.length === 0 && unthrown.length === 0)
					return void test.ok(true);

				// Otherwise format a message listing all unexpected and unthrown
				// errors and fail the test case by failing an assertion.

				var message = "";

				if (unexpected.length > 0) {
					message += "\n\tUnexpected errors";
					message += "\n" + _.map(unexpected, function (err) {
						return "\t    L" + err.line + ": " + err.data.code;
					}).join("\n");
				}

				if (unthrown.length > 0) {
					message += "\n\tErrors defined, but not thrown by JSHint";
					message += "\n" + _.map(unthrown, function (err) {
						return "\t    L" + err.line + ": " + err.code;
					}).join("\n");
				}

				test.ok(false, message);
			},

			// Shortcut to helper.test that allows us to provide a fixture file name
			// instead of a string.

			testFile: function (name, options, globals) {
				helper.test(fixtures.get(name), options, globals);
			}
		};

		return helper;
	}

	return runner;
}

exports.Fixtures = Fixtures;
exports.createRunner = createRunner;
