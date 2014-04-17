"use strict";

var helpers = require("../lib/helpers.js");
var runner = helpers.createRunner(__dirname, __filename);

exports.testMaxErr = function (test) {
	var lines = [];
	for (var i = 5; i <= 55; i++) {
		lines.push(i);
	}

	runner(test)
		.addErrors(lines, "W001")
		.testFile("fifty.js");

	test.done();
};

exports.testEsprimaErrors = function (test) {
	runner(test)
		.addError(3, "E002")
		.testFile("esprima.js", {}, { greatPower: false });

	test.done();
};

exports.testTrailingComma = function (test) {
	runner(test)
		.addErrors([2, 4, 9], "E001")
		.testFile("trailing.js");

	test.done();
};

exports.testDunderIterator = function (test) {
	runner(test)
		.addError(19, "E004")
		.testFile("iterator.js");

	test.done();
};

exports.testDunderProto = function (test) {
	var globals = {
		Error: false
	};

	runner(test)
		.addErrors([7, 8, 10, 29, 33], "E005")
		.testFile("proto.js", {}, globals);

	test.done();
};

exports.testMissingSemicolon = function (test) {
	runner(test)
		.addErrors([6, 29, 31, 44, 45], "E006")
		.testFile("asi.js", {}, { console: false });

	test.done();
};

exports.testDebugger = function (test) {
	runner(test)
		.addError(5, "E007")
		.testFile("debugger.js");

	test.done();
};

exports.testBitwiseOperators = function (test) {
	runner(test)
		.addErrors([5, 6, 7, 8, 9, 10, 11], "W001")
		.testFile("bitwise.js");

	test.done();
};

exports.testUnsafeComparison = function (test) {
	var lines = [2, 5, 8, 11, 14, 17, 28, 31, 34, 37, 40, 43];
	runner(test)
		.addErrors(lines, "W002")
		.testFile("comparison.js");

	test.done();
};

exports.testShadow = function (test) {
	runner(test)
		.addErrors([3, 4, 8, 12, 16, 17], "W003")
		.testFile("shadow.js", {}, { three: false });

	test.done();
};

exports.testUndef = function (test) {
	runner(test)
		.addErrors([4, 7, 8, 18, 19, 22, 23, 27], "W004")
		.addError(41, "E009")
		.testFile("undef.js");

	test.done();
};

exports.testArguments = function (test) {
	runner(test)
		.addErrors([5, 17], "W006")
		.addErrors([6, 18], "W005")
		.addErrors([11, 12, 13, 14], "W007")
		.addErrors([26, 27], "E008")
		.testFile("arguments.js");

	test.done();
};

exports.testExpressionsAsTests = function (test) {
	runner(test)
		.addErrors([8, 9, 10, 11], "W008")
		.testFile("expr_in_test.js");

	test.done();
};

exports.testNative = function (test) {
	runner(test)
		.addErrors([2, 5, 8], "W012")
		.testFile("native.js");

	test.done();
};
