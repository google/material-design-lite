"use strict";

var _ = require("underscore");
var linter = require("../../../src/next/jshint.js");
var utils = require("../../../src/next/utils.js");
var helpers = require("../lib/helpers.js");

var fixtures = new helpers.Fixtures(__dirname, __filename);

exports.testReport = function (test) {
	var report = new utils.Report();

	test.equal(_.size(report.messages), 0);
	test.equal(report.errors.length, 0);
	test.equal(report.warnings.length, 0);

	report.addError("E003", 1);
	report.addError("E002", 2);
	report.addWarning("W003", 3);

	test.equal(_.size(report.messages), 3);
	test.equal(report.errors.length, 2);
	test.equal(report.warnings.length, 1);

	test.deepEqual(report.errors[0], {
		type: report.ERROR,
		line: 1,
		data: {
			code: "E003",
			desc: "'return' can be used only within functions."
		}
	});

	try {
		report.addError("RandomError", 1);
		test.ok(false);
	} catch (err) {
		test.ok(err !== undefined);
	}

	test.done();
};

exports.testTokens = function (test) {
	var code = fixtures.get("simple_file.js");
	var tokens = new utils.Tokens(linter.lint({ code: code }).tree.tokens);
	var slice = tokens.getRange([ 0, 28 ]);

	test.equal(slice.length, 3);
	test.equal(slice.current.value, "var");
	test.equal(slice.next().value, "number");
	test.equal(slice.next().value, "=");

	test.done();
};

exports.testScopeStack = function (test) {
	var scope = new utils.ScopeStack();
	test.equal(scope.current.name, "(global)");

	scope.addVariable({ name: "weebly" });
	scope.addSwitch("strict");
	scope.addIgnore("W002");
	scope.current.strict = true;
	test.ok(scope.isDefined("weebly"));
	test.ok(scope.isSwitchEnabled("strict"));
	test.ok(scope.isMessageIgnored("W002"));
	test.ok(!scope.isSwitchEnabled("var"));
	test.ok(!scope.isMessageIgnored("E001"));

	scope.push("(anon)");
	test.ok(scope.isStrictMode());
	test.equal(scope.current.name, "(anon)");

	scope.addVariable({ name: "wobly" });
	scope.addSwitch("var");
	test.ok(scope.isDefined("wobly"));
	test.ok(scope.isDefined("weebly"));
	test.ok(scope.isSwitchEnabled("var"));
	test.ok(scope.isSwitchEnabled("strict"));

	scope.addGlobalVariable({ name: "stuff" });
	test.ok(scope.isDefined("stuff"));

	scope.pop();
	test.equal(scope.current.name, "(global)");
	test.ok(scope.isDefined("weebly"));
	test.ok(scope.isDefined("stuff"));
	test.ok(!scope.isDefined("wobly"));
	test.ok(!scope.isSwitchEnabled("var"));
	test.ok(scope.isSwitchEnabled("strict"));

	scope.addGlobalVariable({ name: "__proto__" });
	test.ok(scope.isDefined("__proto__"));

	test.done();
};

exports.testSpecialVariables = function (test) {
	var scope = new utils.ScopeStack();
	scope.addUse("foo", [ 0, 1 ]);
	scope.addUse("__proto__", [ 1, 2 ]);
	scope.addUse("toString", [ 2, 3 ]);
	scope.addUse("constructor", [ 3, 4 ]);

	test.equal(_.size(scope.current.uses), 4);
	test.done();
};

exports.testParseComment = function (test) {
	var com = utils.parseComment("TODO: Write more programs.");
	test.equal(com.type, "text");
	test.equal(com.value, "TODO: Write more programs.");

	com = utils.parseComment("jshint:sup unused");
	test.equal(com.type, "text");
	test.equal(com.value, "jshint:sup unused");

	com = utils.parseComment("jshint:set var, strict");
	test.equal(com.type, "set");
	test.deepEqual(com.value, ["var", "strict"]);

	com = utils.parseComment(" jshint:ignore W001, E002  ");
	test.equal(com.type, "ignore");
	test.deepEqual(com.value, ["W001", "E002"]);

	test.done();
};
