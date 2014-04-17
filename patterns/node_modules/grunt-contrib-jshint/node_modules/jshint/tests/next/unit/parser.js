// Esprima integration tests.
//
// These shouldn't test actual JSHint behaviour. Instead they should ensure
// that underlying Esprima parser works as expected.

"use strict";

var linter  = require("../../../src/next/jshint.js");
var helpers = require("../lib/helpers.js");

var fixtures = new helpers.Fixtures(__dirname, __filename);

exports.testTree = function (test) {
	test.expect(11);

	var tree = linter.lint({ code: fixtures.get("simple_file.js") }).tree;

	test.equal(tree.type, "Program");
	test.equal(tree.body[0].type, "VariableDeclaration");
	test.equal(tree.body[0].declarations[0].type, "VariableDeclarator");
	test.equal(tree.body[0].declarations[0].id.name, "number");
	test.equal(tree.body[1].type, "FunctionDeclaration");
	test.equal(tree.body[1].id.name, "add");
	test.equal(tree.body[2].type, "ExpressionStatement");
	test.equal(tree.body[2].expression.callee.name, "add");
	test.equal(tree.comments[0].type, "Block");
	test.equal(tree.comments[0].value, " [linter] ");
	test.deepEqual(tree.comments[0].range, [ 0, 14 ]);

	test.done();
};

exports.testTokens = function (test) {
	test.expect(1);

	// The tokens.json file is a tree snapshot I got by using Esprima's
	// online parser demo with the code from simple_file.js.
	// * http://esprima.org/demo/parse.html

	var code = fixtures.get("simple_file.js");
	var tokens = JSON.parse(fixtures.get("tokens.json"));

	test.deepEqual(linter.lint({ code: code }).tree.tokens, tokens);
	test.done();
};

exports.testComments = function (test) {
	test.expect(8);

	var linterObj = new linter.Linter(fixtures.get("comments.js"));
	var addIgnore = linterObj.scopes.addIgnore;
	var addSwitch = linterObj.scopes.addSwitch;

	var ignores = [
		[ "main", "W001" ],
		[ "(anon)", "E001" ]
	];

	var switches = [
		[ "(global)", "var" ],
		[ "main", "strict" ]
	];

	linterObj.scopes.addIgnore = function (code) {
		var exp = ignores.shift();
		test.equal(linterObj.scopes.current.name, exp[0]);
		test.equal(code, exp[1]);
		addIgnore.call(linterObj.scopes, code);
	};

	linterObj.scopes.addSwitch = function (name) {
		var exp = switches.shift();
		test.equal(linterObj.scopes.current.name, exp[0]);
		test.equal(name, exp[1]);
		addSwitch.call(linterObj.scopes, name);
	};

	linterObj.parse();

	linterObj.scopes.addIgnore = addIgnore;
	linterObj.scopes.addSwitch = addSwitch;

	test.done();
};
