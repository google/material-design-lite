/**
 * Tests for all non-environmental options. Non-environmental options are
 * options that change how JSHint behaves instead of just pre-defining a set
 * of global variables.
 */

"use strict";

var JSHINT = require('../../../src/stable/jshint.js').JSHINT;
var fs = require('fs');
var TestRun = require('../helpers/testhelper').setup.testRun;
var fixture = require('../helpers/fixture').fixture;

/**
 * Option `shadow` allows you to re-define variables later in code.
 *
 * E.g.:
 *	 var a = 1;
 *	 if (cond == true)
 *		 var a = 2; // Variable a has been already defined on line 1.
 *
 * More often than not it is a typo, but sometimes people use it.
 */
exports.shadow = function (test) {
	var src = fs.readFileSync(__dirname + "/fixtures/redef.js", "utf8");

	// Do not tolerate variable shadowing by default
	TestRun(test)
		.addError(5, "'a' is already defined.")
		.addError(10, "'foo' is already defined.")
		.test(src);

	// Allow variable shadowing when shadow is true
	TestRun(test)
		.test(src, { shadow: true });

	test.done();
};

/**
 * Option `latedef` allows you to prohibit the use of variable before their
 * definitions.
 *
 * E.g.:
 *	 fn(); // fn will be defined later in code
 *	 function fn() {};
 *
 * Since JavaScript has function-scope only, you can define variables and
 * functions wherever you want. But if you want to be more strict, use
 * this option.
 */
exports.latedef = function (test) {
	var src  = fs.readFileSync(__dirname + '/fixtures/latedef.js', 'utf8'),
		src1 = fs.readFileSync(__dirname + '/fixtures/redef.js', 'utf8');

	// By default, tolerate the use of variable before its definition
	TestRun(test)
		.test(src);

	// However, JSHint must complain if variable is actually missing
	TestRun(test)
		.addError(1, "'fn' is not defined.")
		.test('fn();', { undef: true });

	// And it also must complain about the redefinition (see option `shadow`)
	TestRun(test)
		.addError(5, "'a' is already defined.")
		.addError(10, "'foo' is already defined.")
		.test(src1);

	// When latedef is true, JSHint must not tolerate the use before definition
	TestRun(test)
		.addError(2, "'fn' was used before it was defined.")
		.addError(6, "'fn1' was used before it was defined.")
		.addError(10, "'vr' was used before it was defined.")
		.addError(18, "Inner functions should be listed at the top of the outer function.")
		.test(src, { latedef: true });

	test.done();
};

exports['combination of latedef and undef'] = function (test) {
	var src = fixture('latedefundef.js');

	// Assures that when `undef` is set to true, it'll report undefined variables
	// and late definitions won't be reported as `latedef` is set to false.
	TestRun(test)
		.addError(29, "'hello' is not defined.")
		.addError(35, "'world' is not defined.")
		.test(src, { latedef: false, undef: true });

	// When we suppress `latedef` and `undef` then we get no warnings.
	TestRun(test)
		.test(src, { latedef: false, undef: false });

	// If we warn on `latedef` but supress `undef` we only get the
	// late definition warnings.
	TestRun(test)
		.addError(5, "'func2' was used before it was defined.")
		.addError(12, "'foo' was used before it was defined.")
		.addError(18, "'fn1' was used before it was defined.")
		.addError(26, "'baz' was used before it was defined.")
		.addError(34, "'fn' was used before it was defined.")
		.addError(41, "'q' was used before it was defined.")
		.addError(46, "'h' was used before it was defined.")
		.test(src, { latedef: true, undef: false });

	// If we warn on both options we get all the warnings.
	TestRun(test)
		.addError(5, "'func2' was used before it was defined.")
		.addError(12, "'foo' was used before it was defined.")
		.addError(18, "'fn1' was used before it was defined.")
		.addError(26, "'baz' was used before it was defined.")
		.addError(29, "'hello' is not defined.")
		.addError(34, "'fn' was used before it was defined.")
		.addError(35, "'world' is not defined.")
		.addError(41, "'q' was used before it was defined.")
		.addError(46, "'h' was used before it was defined.")
		.test(src, { latedef: true, undef: true });

	test.done();
};

exports.undefwstrict = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/undefstrict.js', 'utf8');
	TestRun(test).test(src, { undef: false });

	test.done();
};

// Regression test for GH-431
exports["implied and unused should respect hoisting"] = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/gh431.js', 'utf8');
	TestRun(test)
		.addError(14, "'fun4' is not defined.")
		.test(src, { undef: true });

	JSHINT.flag = true;
	JSHINT(src, { undef: true });
	var report = JSHINT.data();

	test.equal(report.implieds.length, 1);
	test.equal(report.implieds[0].name, 'fun4');
	test.deepEqual(report.implieds[0].line, [14]);

	test.equal(report.unused.length, 3);

	test.done();
};

/**
 * The `proto` and `iterator` options allow you to prohibit the use of the
 * special `__proto__` and `__iterator__` properties, respectively.
 */
exports.testProtoAndIterator = function (test) {
	var source = fs.readFileSync(__dirname + '/fixtures/protoiterator.js', 'utf8');
	var json = '{"__proto__": true, "__iterator__": false, "_identifier": null, "property": 123}';

	// JSHint should not allow the `__proto__` and
	// `__iterator__` properties by default
	TestRun(test)
		.addError(7, "The '__proto__' property is deprecated.")
		.addError(8, "The '__proto__' property is deprecated.")
		.addError(10, "The '__proto__' property is deprecated.")
		.addError(27, "'__iterator__' is only available in JavaScript 1.7.")
		.addError(33, "The '__proto__' property is deprecated.")
		.addError(37, "The '__proto__' property is deprecated.")
		.test(source);

	TestRun(test)
		.addError(1, "The '__proto__' key may produce unexpected results.")
		.addError(1, "The '__iterator__' key may produce unexpected results.")
		.test(json);

	// Should not report any errors when proto and iterator
	// options are on
	TestRun("source").test(source, { proto: true, iterator: true });
	TestRun("json").test(json, { proto: true, iterator: true });

	test.done();
};

/**
 * The `camelcase` option allows you to enforce use of the camel case convention.
 */
exports.testCamelcase = function (test) {
	var source = fs.readFileSync(__dirname + '/fixtures/camelcase.js', 'utf8');

	// By default, tolerate arbitrary identifiers
	TestRun(test)
		.test(source);

	// Require identifiers in camel case if camelcase is true
	TestRun(test)
		.addError(5, "Identifier 'Foo_bar' is not in camel case.")
		.addError(5, "Identifier 'test_me' is not in camel case.")
		.addError(6, "Identifier 'test_me' is not in camel case.")
		.addError(6, "Identifier 'test_me' is not in camel case.")
		.addError(13, "Identifier 'test_1' is not in camel case.")
		.test(source, { camelcase: true });


	test.done();
};

/**
 * Option `curly` allows you to enforce the use of curly braces around
 * control blocks. JavaScript allows one-line blocks to go without curly
 * braces but some people like to always use curly bracse. This option is
 * for them.
 *
 * E.g.:
 *	 if (cond) return;
 *	   vs.
 *	 if (cond) { return; }
 */
exports.curly = function (test) {
	var src  = fs.readFileSync(__dirname + '/fixtures/curly.js', 'utf8'),
		src1 = fs.readFileSync(__dirname + '/fixtures/curly2.js', 'utf8');

	// By default, tolerate one-line blocks since they are valid JavaScript
	TestRun(test).test(src);
	TestRun(test).test(src1);

	// Require all blocks to be wrapped with curly braces if curly is true
	TestRun(test)
		.addError(2, "Expected '{' and instead saw 'return'.")
		.addError(5, "Expected '{' and instead saw 'doSomething'.")
		.addError(8, "Expected '{' and instead saw 'doSomething'.")
		.test(src, { curly: true });

	TestRun(test).test(src1, { curly: true });

	test.done();
};

/** Option `noempty` prohibits the use of empty blocks. */
exports.noempty = function (test) {
	var code = 'for (;;) {}';

	// By default, tolerate empty blocks since they are valid JavaScript
	TestRun(test).test(code);

	// Do not tolerate, when noempty is true
	TestRun(test)
		.addError(1, 'Empty block.')
		.test(code, { noempty: true });

	test.done();
};

/**
 * Option `noarg` prohibits the use of arguments.callee and arguments.caller.
 * JSHint allows them by default but you have to know what you are doing since:
 *	- They are not supported by all JavaScript implementations
 *	- They might prevent an interpreter from doing some optimization tricks
 *	- They are prohibited in the strict mode
 */
exports.noarg = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/noarg.js', 'utf8');

	// By default, tolerate both arguments.callee and arguments.caller
	TestRun(test).test(src);

	// Do not tolerate both .callee and .caller when noarg is true
	TestRun(test)
		.addError(2, 'Avoid arguments.callee.')
		.addError(6, 'Avoid arguments.caller.')
		.test(src, { noarg: true });

	test.done();
};

/** Option `nonew` prohibits the use of constructors for side-effects */
exports.nonew = function (test) {
	var code  = "new Thing();",
		code1 = "var obj = new Thing();";

	TestRun(test).test(code);
	TestRun(test).test(code1);

	TestRun(test)
		.addError(1, "Do not use 'new' for side effects.", {
			character: 1
		})
		.test(code, { nonew: true });

	test.done();
};

// Option `asi` allows you to use automatic-semicolon insertion
exports.asi = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/asi.js', 'utf8');

	TestRun(test, 1)
		.addError(2, "Missing semicolon.")
		.addError(4, "Line breaking error 'return'.")
		.addError(4, "Missing semicolon.")
		.addError(5, "Missing semicolon.")
		.addError(9, "Line breaking error 'continue'.")
		.addError(9, "Missing semicolon.")
		.addError(10, "Missing semicolon.")
		.addError(11, "Line breaking error 'break'.")
		.addError(11, "Missing semicolon.")
		.addError(12, "Missing semicolon.")
		.addError(16, "Missing semicolon.")
		.addError(17, "Line breaking error 'return'.")
		.addError(17, "Missing semicolon.")
		.addError(19, "Line breaking error 'break'.")
		.addError(19, "Missing semicolon.")
		.addError(21, "Line breaking error 'break'.")
		.addError(21, "Missing semicolon.")
		.addError(25, "Missing semicolon.")
		.addError(26, "Missing semicolon.", { character: 10 })
		.addError(27, "Missing semicolon.", { character: 12 })
		.addError(28, "Missing semicolon.", { character: 12 })
		.test(src);

	TestRun(test, 2)
		.addError(2, "Missing semicolon.") // throw on "use strict", even option asi is used
		.test(src, { asi: true });

	test.done();
};

/** Option `lastsemic` allows you to skip the semicolon after last statement in a block,
  * if that statement is followed by the closing brace on the same line. */
exports.lastsemic = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/lastsemic.js', 'utf8');

	// without lastsemic
	TestRun(test)
		.addError(2, "Missing semicolon.") // missing semicolon in the middle of a block
		.addError(4, "Missing semicolon.") // missing semicolon in a one-liner function
		.addError(5, "Missing semicolon.") // missing semicolon at the end of a block
		.test(src);

	// with lastsemic
	TestRun(test)
		.addError(2, "Missing semicolon.")
		.addError(5, "Missing semicolon.")
		.test(src, { lastsemic: true });
	// this line is valid now: [1, 2, 3].forEach(function(i) { print(i) });
	// line 5 isn't, because the block doesn't close on the same line

	// it shouldn't interfere with asi option
	TestRun(test).test(src, { lastsemic: true, asi: true });

	test.done();
};

/**
 * Option `expr` allows you to use ExpressionStatement as a Program code.
 *
 * Even though ExpressionStatement as a Program (i.e. without assingment
 * of its result) is a valid JavaScript, more often than not it is a typo.
 * That's why by default JSHint complains about it. But if you know what
 * are you doing, there is nothing wrong with it.
 */
exports.expr = function (test) {
	var exps = [
		"obj && obj.method && obj.method();",
		"myvar && func(myvar);",
		"1;",
		"true;",
		"+function (test) {};"
	];

	for (var i = 0, exp; exp = exps[i]; i += 1) {
		TestRun(test)
			.addError(1, 'Expected an assignment or function call and instead saw an expression.')
			.test(exp);
	}

	for (i = 0, exp = null; exp = exps[i]; i += 1) {
		TestRun(test).test(exp, { expr: true });
	}

	test.done();
};

// Option `undef` requires you to always define variables you use.
exports.undef = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/undef.js', 'utf8');

	// Make sure there are no other errors
	TestRun(test).test(src);

	// Make sure it fails when undef is true
	TestRun(test)
		.addError(1, "'undef' is not defined.")
		.addError(5, "'undef' is not defined.")
		.addError(6, "'undef' is not defined.")
		.addError(8, "'undef' is not defined.")
		.addError(9, "'undef' is not defined.")
		.addError(13, "'localUndef' is not defined.")
		.addError(18, "'localUndef' is not defined.")
		.addError(19, "'localUndef' is not defined.")
		.addError(21, "'localUndef' is not defined.")
		.addError(22, "'localUndef' is not defined.")
		.test(src, { undef: true });

	// Regression test for GH-668.
	src = fs.readFileSync(__dirname + "/fixtures/gh668.js", "utf8");
	test.ok(JSHINT(src, { undef: true }));
	test.ok(!JSHINT.data().implieds);

	test.ok(JSHINT(src));
	test.ok(!JSHINT.data().implieds);

	test.done();
};

exports.unused = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/unused.js', 'utf8');

	TestRun(test).test(src);

	var var_errors = [
		[1, "'a' is defined but never used."],
		[7, "'c' is defined but never used."],
		[15, "'foo' is defined but never used."],
		[20, "'bar' is defined but never used."]
	];

	var last_param_errors = [[6, "'f' is defined but never used."]];
	var all_param_errors = [[15, "'err' is defined but never used."]];
	var true_run = TestRun(test);

	var_errors.concat(last_param_errors).forEach(function (e) {
		true_run.addError.apply(true_run, e);
	});

	true_run.test(src, { unused: true });
	test.ok(!JSHINT(src, { unused: true }));

	// Test checking all function params via unused="strict"
	var all_run = TestRun(test);
	var_errors.concat(last_param_errors, all_param_errors).forEach(function (e) {
		all_run.addError.apply(true_run, e);
	});

	all_run.test(src, {unused: "strict"});

	// Test checking everything except function params
	var vars_run = TestRun(test);
	var_errors.forEach(function (e) { vars_run.addError.apply(vars_run, e); });
	vars_run.test(src, {unused: "vars"});

	var unused = JSHINT.data().unused;
	test.equal(6, unused.length);
	test.ok(unused.some(function (err) { return err.line === 1 && err.name === "a"; }));
	test.ok(unused.some(function (err) { return err.line === 6 && err.name === "f"; }));
	test.ok(unused.some(function (err) { return err.line === 7 && err.name === "c"; }));
	test.ok(unused.some(function (err) { return err.line === 15 && err.name === "foo"; }));

	test.done();
};

// Regressions for "unused" getting overwritten via comment (GH-778)
exports['unused overrides'] = function (test) {
	var code;
	
	code = ['function foo(a) {', '/*jshint unused:false */', '}', 'foo();'];
	TestRun(test).test(code, {unused: true});
	
	code = ['function foo(a, b) {', '/*jshint unused:vars */', 'var i = 3;', '}', 'foo();'];
	TestRun(test)
		.addError(3, "'i' is defined but never used.")
		.test(code, {unused: true});

	code = ['function foo(a, b) {', '/*jshint unused:true */', 'var i = 3;', '}', 'foo();'];
	TestRun(test)
		.addError(1, "'b' is defined but never used.")
		.addError(3, "'i' is defined but never used.")
		.test(code, {unused: "strict"});

	code = ['function foo(a, b) {', '/*jshint unused:strict */', 'var i = 3;', '}', 'foo();'];
	TestRun(test)
		.addError(1, "'a' is defined but never used.")
		.addError(1, "'b' is defined but never used.")
		.addError(3, "'i' is defined but never used.")
		.test(code, {unused: true});

	code = ['/*jshint unused:vars */', 'function foo(a, b) {}', 'foo();'];
	TestRun(test).test(code, {unused: "strict"});
	
	code = ['/*jshint unused:vars */', 'function foo(a, b) {', 'var i = 3;', '}', 'foo();'];
	TestRun(test)
		.addError(3, "'i' is defined but never used.")
		.test(code, {unused: "strict"});

	test.done();
};

// Regression test for `undef` to make sure that ...
exports['undef in a function scope'] = function (test) {
	var src = fixture('undef_func.js');

	// Make sure that the lint is clean with and without undef.
	TestRun(test).test(src);
	TestRun(test).test(src, { undef: true });

	test.done();
};

/** Option `scripturl` allows the use of javascript-type URLs */
exports.scripturl = function (test) {
	var code = [
			"var foo = { 'count': 12, 'href': 'javascript:' };",
			"foo = 'javascript:' + 'xyz';"
		],
		src = fs.readFileSync(__dirname + '/fixtures/scripturl.js', 'utf8');

	// Make sure there is an error
	TestRun(test)
		.addError(1, "Script URL.")
		.addError(2, "Script URL.") // 2 times?
		.addError(2, "JavaScript URL.")
		.test(code);

	// Make sure the error goes away when javascript URLs are tolerated
	TestRun(test).test(code, { scripturl: true });

	// Make sure an error exists for labels that look like URLs
	TestRun(test)
		.addError(2, "Label 'javascript' looks like a javascript url.")
		.test(src);

	// Make sure the label error exists even if javascript URLs are tolerated
	TestRun(test)
		.addError(2, "Label 'javascript' looks like a javascript url.")
		.test(src, { scripturl: true });

	test.done();
};

/**
 * Option `forin` disallows the use of for in loops without hasOwnProperty.
 *
 * The for in statement is used to loop through the names of properties
 * of an object, including those inherited through the prototype chain.
 * The method hasOwnPropery is used to check if the property belongs to
 * an object or was inherited through the prototype chain.
 */
exports.forin = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/forin.js', 'utf8');
	var msg = 'The body of a for in should be wrapped in an if statement to filter unwanted ' +
			  'properties from the prototype.';

	// Make sure there are no other errors
	TestRun(test).test(src);

	// Make sure it fails when forin is true
	TestRun(test)
		.addError(13, msg)
		.test(src, { forin: true });

	test.done();
};

/**
 * Option `loopfunc` allows you to use function expression in the loop.
 * E.g.:
 *	 while (true) x = function (test) {};
 *
 * This is generally a bad idea since it is too easy to make a
 * closure-related mistake.
 */
exports.loopfunc = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/loopfunc.js', 'utf8');

	// By default, not functions are allowed inside loops
	TestRun(test)
		.addError(2, "Don't make functions within a loop.")
		.addError(6, "Don't make functions within a loop.")
		.addError(10, "Function declarations should not be placed in blocks. Use a function " +
					  "expression or move the statement to the top of the outer function.")
		.test(src);

	// When loopfunc is true, only function declaration should fail.
	// Expressions are okay.
	TestRun(test)
		.addError(10, "Function declarations should not be placed in blocks. Use a function " +
					  "expression or move the statement to the top of the outer function.")
		.test(src, { loopfunc: true });

	test.done();
};

/** Option `boss` unlocks some useful but unsafe features of JavaScript. */
exports.boss = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/boss.js', 'utf8');

	// By default, warn about suspicious assignments
	TestRun(test)
		.addError(1, 'Expected a conditional expression and instead saw an assignment.')
		.addError(4, 'Expected a conditional expression and instead saw an assignment.')
		.addError(7, 'Expected a conditional expression and instead saw an assignment.')
		.addError(12, 'Expected a conditional expression and instead saw an assignment.')

		// GH-657
		.addError(14, 'Expected a conditional expression and instead saw an assignment.')
		.addError(17, 'Expected a conditional expression and instead saw an assignment.')
		.addError(20, 'Expected a conditional expression and instead saw an assignment.')
		.addError(25, 'Expected a conditional expression and instead saw an assignment.')

		// GH-670
		.addError(28, "Did you mean to return a conditional instead of an assignment?")
		.addError(32, "Did you mean to return a conditional instead of an assignment?")
		.test(src);

	// But if you are the boss, all is good
	TestRun(test).test(src, { boss: true });

	test.done();
};

/**
 * Options `eqnull` allows you to use '== null' comparisons.
 * It is useful when you want to check if value is null _or_ undefined.
 */
exports.eqnull = function (test) {
	var code = [
		'if (e == null) doSomething();',
		'if (null == e) doSomething();',
		'if (e != null) doSomething();',
		'if (null != e) doSomething();',
	];

	// By default, warn about `== null` comparison
	TestRun(test)
		.addError(1, "Use '===' to compare with 'null'.")
		.addError(2, "Use '===' to compare with 'null'.")
		.addError(3, "Use '!==' to compare with 'null'.")
		.addError(4, "Use '!==' to compare with 'null'.")
		.test(code);

	// But when `eqnull` is true, no questions asked
	TestRun(test).test(code, { eqnull: true });

	// Make sure that `eqnull` has precedence over `eqeqeq`
	TestRun(test).test(code, { eqeqeq: true, eqnull: true });

	test.done();
};

/**
 * Option `supernew` allows you to use operator `new` with anonymous functions
 * and objects without invocation.
 *
 * Ex.:
 *	 new function (test) { ... };
 *	 new Date;
 */
exports.supernew = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/supernew.js', 'utf8');

	TestRun(test)
		.addError(1, "Weird construction. Is 'new' unnecessary?")
		.addError(9, "Missing '()' invoking a constructor.", { character: 1 })
		.addError(11, "Missing '()' invoking a constructor.", {
			character: 13
		})
		.test(src);

	TestRun(test).test(src, { supernew: true });

	test.done();
};

/** Option `bitwise` disallows the use of bitwise operators. */
exports.bitwise = function (test) {
	var ops = [ '&', '|', '^', '<<', '>>', '>>>' ];
	var moreTests = [
		'var c = ~a;',
		'c &= 2;'
	];

	// By default allow bitwise operators
	for (var i = 0, op; op = ops[i]; i += 1) {
		TestRun(test).test('var c = a ' + op + ' b;');
	}
	TestRun(test).test(moreTests);

	for (i = 0, op = null; op = ops[i]; i += 1) {
		TestRun(test)
			.addError(1, "Unexpected use of '" + op + "'.")
			.test('var c = a ' + op + ' b;', { bitwise: true });
	}
	TestRun(test)
		.addError(1, "Unexpected '~'.")
		.addError(2, "Unexpected use of '&='.")
		.test(moreTests, { bitwise: true });

	test.done();
};

/** Option `debug` allows the use of debugger statements. */
exports.debug = function (test) {
	var code = 'function test () { debugger; return true; }';

	// By default disallow debugger statements.
	TestRun(test)
		.addError(1, "Forgotten 'debugger' statement?")
		.test(code);

	// But allow them if debug is true.
	TestRun(test).test(code, { debug: true });

	test.done();
};

/** Option `eqeqeq` requires you to use === all the time. */
exports.eqeqeq = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/eqeqeq.js', 'utf8');

	TestRun(test)
		.addError(8, "Use '===' to compare with 'null'.")
		.test(src);

	TestRun(test)
		.addError(2, "Expected '===' and instead saw '=='.")
		.addError(5, "Expected '!==' and instead saw '!='.")
		.addError(8, "Expected '===' and instead saw '=='.")
		.test(src, { eqeqeq: true });

	test.done();
};

/** Option `evil` allows the use of eval. */
exports.evil = function (test) {
	var src = [
		"eval('hey();');",
		"document.write('');",
		"document.writeln('');",
		"window.execScript('xyz');",
		"new Function('xyz();');",
		"setTimeout('xyz();', 2);",
		"setInterval('xyz();', 2);",
		"var t = document['eval']('xyz');"
	];

	TestRun(test)
		.addError(1, "eval can be harmful.")
		.addError(2, "document.write can be a form of eval.")
		.addError(3, "document.write can be a form of eval.")
		.addError(4, "eval can be harmful.")
		.addError(5, "The Function constructor is a form of eval.")
		.addError(6, "Implied eval. Consider passing a function instead of a string.")
		.addError(7, "Implied eval. Consider passing a function instead of a string.")
		.addError(8, "eval can be harmful.")
		.test(src, { browser: true });

	TestRun(test).test(src, { evil: true, browser: true });

	test.done();
};

/**
 * Option `immed` forces you to wrap immediate invocations in parens.
 *
 * Functions in JavaScript can be immediately invoce but that can confuse
 * readers of your code. To make it less confusing, wrap the invocations in
 * parens.
 *
 * E.g. (note the parens):
 *	 var a = (function (test) {
 *	   return 'a';
 *	 }());
 *	 console.log(a); // --> 'a'
 */
exports.immed = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/immed.js', 'utf8');

	TestRun(test).test(src);

	TestRun(test)
		.addError(3, "Wrap an immediate function invocation in parens " +
					 "to assist the reader in understanding that the expression " +
					 "is the result of a function, and not the function itself.")
		.addError(13, "Wrapping non-IIFE function literals in parens is unnecessary.")
		.test(src, { immed: true });

	test.done();
};

/** Option `nomen` disallows variable names with dangling '_'. */
exports.nomen = function (test) {
	var names = [ '_hey', 'hey_' ];

	for (var i = 0, name; name = names[i]; i += 1) {
		TestRun(test).test('var ' + name + ';');
	}

	for (i = 0, name = null; name = names[i]; i += 1) {
		TestRun(test)
			.addError(1, "Unexpected dangling '_' in '" + name + "'.")
			.test('var ' + name + ';', { nomen: true });
	}

	// Normal names should pass all the time
	TestRun(test).test('var hey;');
	TestRun(test).test('var hey;', { nomen: true });

	// Node globals
	TestRun(test)
		.addError(1, "Unexpected dangling '_' in '_x'.")
		.test('var x = top._x + __dirname + __filename;', { node: true, nomen: true });

	// Underscore.js global should be fine
	TestRun(test).test("_.defer();", { nomen: true });
	TestRun(test)
		.addError(1, "Unexpected dangling '_' in '__'.")
		.test("var __;", { nomen: true });

	test.done();
};

/** Option `passfail` tells JSHint to stop at the first error. */
exports.passfail = function (test) {
	var code = [
		'one()',
		'two()',
		'three()',
	];

	TestRun(test)
		.addError(1, "Missing semicolon.")
		.addError(2, "Missing semicolon.")
		.addError(3, "Missing semicolon.")
		.test(code);

	TestRun(test)
		.addError(1, "Missing semicolon.")
		.test(code, { passfail: true });

	test.done();
};

/**
 * Option `onevar` allows you to use only one var statement
 * per function. Don't ask me why.
 */
exports.onevar = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/onevar.js', 'utf8');

	TestRun(test).test(src);
	TestRun(test)
		.addError(10, "Too many var statements.")
		.test(src, { onevar: true });

	test.done();
};

/** Option `plusplus` prohibits the use of increments/decrements. */
exports.plusplus = function (test) {
	var ops = [ '++', '--' ];

	for (var i = 0, op; op = ops[i]; i += 1) {
		TestRun(test).test('var i = j' + op + ';');
		TestRun(test).test('var i = ' + op + 'j;');
	}

	for (i = 0, op = null; op = ops[i]; i += 1) {
		TestRun(test)
			.addError(1, "Unexpected use of '" + op + "'.")
			.test('var i = j' + op + ';', { plusplus: true });

		TestRun(test)
			.addError(1, "Unexpected use of '" + op + "'.")
			.test('var i = ' + op + 'j;', { plusplus: true });
	}

	test.done();
};

/**
 * Option `newcap` requires constructors to be capitalized.
 *
 * Constructors are functions that are designed to be used with the `new` statement.
 * `new` creates a new object and binds it to the implied this parameter.
 * A constructor executed without new will have its this assigned to a global object,
 * leading to errors.
 *
 * Unfortunately, JavaScript gives us absolutely no way of telling if a function is a
 * constructor. There is a convention to capitalize all constructor names to prevent
 * those mistakes. This option enforces that convention.
 */
exports.newcap = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/newcap.js', 'utf8');

	TestRun(test).test(src); // By default, everything is fine

	// When newcap is true, enforce the conventions
	TestRun(test)
		.addError(1, 'A constructor name should start with an uppercase letter.')
		.addError(5, "Missing 'new' prefix when invoking a constructor.")
		.addError(10, "A constructor name should start with an uppercase letter.")
		.test(src, { newcap: true });

	test.done();
};

/** Option `sub` allows all forms of subscription. */
exports.sub = function (test) {
	TestRun(test)
		.addError(1, "['prop'] is better written in dot notation.", {
			character: 17
		})
		.test("window.obj = obj['prop'];");

	TestRun(test).test("window.obj = obj['prop'];", { sub: true });

	test.done();
};

/** Option `strict` requires you to use "use strict"; */
exports.strict = function (test) {
	var code  = "(function (test) { return; }());";
	var code1 = '(function (test) { "use strict"; return; }());';
	var src = fs.readFileSync(__dirname + '/fixtures/strict_violations.js', 'utf8');
	var src2 = fs.readFileSync(__dirname + '/fixtures/strict_incorrect.js', 'utf8');
	var src3 = fs.readFileSync(__dirname + '/fixtures/strict_newcap.js', 'utf8');

	TestRun(test).test(code);
	TestRun(test).test(code1);

	TestRun(test)
		.addError(1, 'Missing "use strict" statement.')
		.test(code, { strict: true });

	TestRun(test).test(code1, { strict: true });

	// Test for strict mode violations
	TestRun(test)
		.addError(4, 'Possible strict violation.')
		.addError(7, 'Strict violation.')
		.addError(8, 'Strict violation.')
		.test(src, { strict: true });

	TestRun(test)
		.addError(4, 'Expected an assignment or function call and instead saw an expression.')
		.addError(9, 'Missing semicolon.')
		.addError(28, 'Expected an assignment or function call and instead saw an expression.')
		.addError(53, 'Expected an assignment or function call and instead saw an expression.')
		.test(src2, { strict: false });

	TestRun(test)
		.addError(6, "Missing 'new' prefix when invoking a constructor.")
		.test(src3, {});

	TestRun(test).test("var obj = Object({ foo: 'bar' });", { strict: true });

	test.done();
};

/** Option `globalstrict` allows you to use global "use strict"; */
exports.globalstrict = function (test) {
	var code = [
		'"use strict";',
		'function hello() { return; }'
	];

	TestRun(test)
		.addError(1, 'Use the function form of "use strict".')
		.test(code, { strict: true });

	TestRun(test).test(code, { globalstrict: true });

	// Check that globalstrict also enabled strict
	TestRun(test)
		.addError(1, 'Missing "use strict" statement.')
		.test(code[1], { globalstrict: true });

	// Don't enforce "use strict"; if strict has been explicitly set to false
	TestRun(test).test(code[1], { globalstrict: true, strict: false });

	test.done();
};

/** Option `laxbreak` allows you to insert newlines before some operators. */
exports.laxbreak = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/laxbreak.js', 'utf8');

	TestRun(test)
		.addError(2, "Bad line breaking before ','.")
		.addError(3, "Comma warnings can be turned off with 'laxcomma'.")
		.addError(12, "Bad line breaking before ','.")
		.test(src);

	var ops = [ '||', '&&', '*', '/', '%', '+', '-', '>=',
				'==', '===', '!=', '!==', '>', '<', '<=', 'instanceof' ];

	for (var i = 0, op, code; op = ops[i]; i += 1) {
		code = ['var a = b ', op + ' c;'];
		TestRun(test)
			.addError(2, "Bad line breaking before '" + op + "'.")
			.test(code);

		TestRun(test).test(code, { laxbreak: true });
	}

	code = [ 'var a = b ', '? c : d;' ];
	TestRun(test)
		.addError(2, "Bad line breaking before '?'.")
		.test(code);

	TestRun(test).test(code, { laxbreak: true });

	test.done();
};

exports.white = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/white.js', 'utf8');

	TestRun(test).test(src);
	TestRun(test)
		.addError(1, "Unexpected space after 'hello'.", { character: 15 })
		.addError(2, "Unexpected space after 'true'.", { character: 16 })
		.addError(5, "Missing space after 'function'.")
		.addError(6, "Missing space after 'if'.")
		.addError(6, "Missing space after ')'.")
		.addError(14, "Unexpected space after 'true'.", { character: 16 })
		.addError(15, "Missing space after ':'.")
		.addError(18, "Unexpected space after '('.", { character: 9 })
		.addError(18, "Unexpected space after 'ex'.", { character: 12 })
		.addError(55, "Missing space after ','.") // 2 times?
		.addError(56, "Missing space after '1'.")
		.addError(58, "Unexpected space before 'b'.")
		.addError(58, "Unexpected space after 'a'.")
		.addError(60, "Unexpected space before 'c'.")
		.addError(62, "Expected 'var' to have an indentation at 1 instead at 2.")
		.addError(64, "Unexpected space after 'nodblwarnings'.", { character: 23 })
		.addError(64, "Unexpected space after '('.", { character: 25 })
		.test(src, { white: true });

	test.done();
};

exports.trailing = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/white.js', 'utf8');

	TestRun(test).test(src);

	TestRun(test)
		.addError(8, "Trailing whitespace.", { character: 16 })
		.addError(9, "Trailing whitespace.", { character: 6 })
		.test(src, { trailing: true });

	test.done();
};

exports.validthis = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/strict_this.js', 'utf8');

	TestRun(test)
		.addError(8, "Possible strict violation.")
		.addError(9, "Possible strict violation.")
		.addError(11, "Possible strict violation.")
		.test(src);

	src = fs.readFileSync(__dirname + '/fixtures/strict_this2.js', 'utf8');
	TestRun(test).test(src);

	// Test for erroneus use of validthis

	var code = ['/*jshint validthis:true */', 'hello();'];
	TestRun(test)
		.addError(1, "Option 'validthis' can't be used in a global scope.")
		.test(code);

	code = ['function x() {', '/*jshint validthis:heya */', 'hello();', '}'];
	TestRun(test)
		.addError(2, "Bad option value.")
		.test(code);

	test.done();
};

exports.indentation = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/indent.js', 'utf8');

	TestRun(test)
		.addError(5, "Mixed spaces and tabs.")
		.addError(6, "Mixed spaces and tabs.")
		.test(src);

	TestRun(test)
		.addError(5, "Mixed spaces and tabs.")
		.addError(6, "Mixed spaces and tabs.")
		.addError(10, "Unexpected space after 'hello'.")
		.addError(11, "Unexpected space after '('.")
		.addError(11, "Unexpected space after 'Hello World'.")
		.test(src, { indent: 4, white: true });

	TestRun(test)
		.addError(5, "Mixed spaces and tabs.")
		.addError(5, "Expected 'var' to have an indentation at 5 instead at 7.")
		.addError(6, "Mixed spaces and tabs.")
		.addError(6, "Expected 'var' to have an indentation at 5 instead at 7.")
		.addError(7, "Expected '}' to have an indentation at 3 instead at 5.")
		.test(src, { indent: 2 });

	test.done();
};

/*
 * Test string relevant options
 *	 multistr	 allows multiline strings
 */
exports.strings = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/strings.js', 'utf8');

	TestRun(test)
		.addError(9, "Unclosed string.")
		.addError(10, "Unclosed string.")
		.addError(15, "Unclosed string.")
		.addError(23, "Octal literals are not allowed in strict mode.")
		.test(src, { multistr: true });

	TestRun(test)
		.addError(3, "Bad escaping of EOL. Use option multistr if needed.")
		.addError(4, "Bad escaping of EOL. Use option multistr if needed.")
		.addError(9, "Unclosed string.")
		.addError(10, "Unclosed string.")
		.addError(14, "Bad escaping of EOL. Use option multistr if needed.")
		.addError(15, "Unclosed string.")
		.addError(23, "Octal literals are not allowed in strict mode.")
		.test(src);

	test.done();
};

/*
 * Test the `quotmark` option
 *	 quotmark	 quotation mark or true (=ensure consistency)
 */
exports.quotes = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/quotes.js', 'utf8');
	var src2 = fs.readFileSync(__dirname + '/fixtures/quotes2.js', 'utf8');

	TestRun(test)
		.test(src);

	TestRun(test)
		.addError(3, "Mixed double and single quotes.")
		.test(src, { quotmark: true });

	TestRun(test)
		.addError(3, "Strings must use singlequote.")
		.test(src, { quotmark: 'single' });

	TestRun(test)
		.addError(2, "Strings must use doublequote.")
		.test(src, { quotmark: 'double' });

	// test multiple runs (must have the same result)
	var run = TestRun(test);
	run.addError(3, "Mixed double and single quotes.")
		.test(src, { quotmark: true });
	run.addError(3, "Mixed double and single quotes.")
		.test(src2, { quotmark: true });

	test.done();
};

// Test the `quotmark` option when defined as a JSHint comment.
exports.quotesInline = function (test) {
	TestRun(test)
		.addError(6, "Strings must use doublequote.")
		.addError(14, "Strings must use singlequote.")
		.addError(21, "Mixed double and single quotes.")
		.addError(32, "Bad option value.")
		.test(fs.readFileSync(__dirname + "/fixtures/quotes3.js", "utf8"));

	test.done();
};

exports.scope = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/scope.js', 'utf8');

	TestRun(test, 1)
		.addError(11, "'j' used out of scope.") // 3x
		.addError(12, "'x' used out of scope.")
		.addError(20, "'aa' used out of scope.")
		.addError(27, "'bb' used out of scope.")
		.addError(37, "'cc' is not defined.")
		.addError(42, "'bb' is not defined.")
		.test(src);

	TestRun(test, 2)
		.addError(37, "'cc' is not defined.")
		.addError(42, "'bb' is not defined.")
		.test(src, { funcscope: true });

	test.done();
};

/*
 * Tests the `esnext` option
 */
exports.esnext = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/const.js', 'utf8');

	var code = [
		'const myConst = true;',
		'const foo = 9;',
		'var myConst = function (test) { };',
		'foo = "hello world";'
	];

	TestRun(test)
		.addError(21, "const 'immutable4' is initialized to 'undefined'.")
		.test(src, { esnext: true });

	TestRun(test)
		.addError(3, "const 'myConst' has already been declared.")
		.addError(4, "Attempting to override 'foo' which is a constant.")
		.test(code, { esnext: true });

	test.done();
};

/*
 * Tests the `maxlen` option
 */
exports.maxlen = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/maxlen.js', 'utf8');

	TestRun(test)
		.addError(3, "Line is too long.")
		.test(src, { maxlen: 23 });

	test.done();
};

exports.smarttabs = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/smarttabs.js', 'utf8');

	TestRun(test)
		.addError(4, "Mixed spaces and tabs.")
		.addError(5, "Mixed spaces and tabs.")
		.addError(13, "Mixed spaces and tabs.")
		.test(src);

	TestRun(test)
		.addError(5, "Mixed spaces and tabs.")
		.test(src, { smarttabs: true });

	test.done();
};

/*
 * Tests the `laxcomma` option
 */
exports.laxcomma = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/laxcomma.js', 'utf8');

	// All errors.
	TestRun(test)
		.addError(1, "Bad line breaking before ','.")
		.addError(2, "Comma warnings can be turned off with 'laxcomma'.")
		.addError(2, "Bad line breaking before ','.")
		.addError(6, "Bad line breaking before ','.")
		.addError(10, "Bad line breaking before '&&'.")
		.addError(15, "Bad line breaking before '?'.")
		.test(src);

	// Allows bad line breaking, but not on commas.
	TestRun(test)
		.addError(1, "Bad line breaking before ','.")
		.addError(2, "Comma warnings can be turned off with 'laxcomma'.")
		.addError(2, "Bad line breaking before ','.")
		.addError(6, "Bad line breaking before ','.")
		.test(src, { laxbreak: true });

	// Allows comma-first style but warns on bad line breaking
	TestRun(test)
		.addError(10, "Bad line breaking before '&&'.")
		.addError(15, "Bad line breaking before '?'.")
		.test(src, { laxcomma: true });

	// No errors if both laxbreak and laxcomma are turned on
	TestRun(test).test(src, { laxbreak: true, laxcomma: true });

	test.done();
};

/*
 * Tests the `browser` option
 */
exports.browser = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/browser.js', 'utf8');

	TestRun(test)
		.addError(2, "'atob' is not defined.")
		.addError(3, "'btoa' is not defined.")
		.addError(6, "'DOMParser' is not defined.")
		.addError(10, "'XMLSerializer' is not defined.")
		.addError(14, "'NodeFilter' is not defined.")
		.addError(15, "'Node' is not defined.")
		.addError(18, "'MutationObserver' is not defined.")
		.test(src, { undef: true });

	TestRun(test).test(src, { browser: true, undef: true });

	test.done();
};

exports.unnecessarysemicolon = function (test) {
	var code = [
		"function foo() {",
		"    var a;;",
		"}"
	];

	TestRun(test)
		.addError(2, "Unnecessary semicolon.")
		.test(code);

	TestRun(test)
		.addError(2, "Unnecessary semicolon.")
		.test(code, { white: true });

	test.done();
};

exports.blacklist = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/browser.js', 'utf8');
	var code = [
		'/*jshint browser: true */',
		'/*global -event, bar, -btoa */',
		'var a = event.hello();',
		'var c = foo();',
		'var b = btoa(1);',
		'var d = bar();'
	];

	// make sure everything is ok
	TestRun(test).test(src, { undef: true, browser: true });

	// disallow Node in a predef Object
	TestRun(test)
		.addError(15, "'Node' is not defined.")
		.test(src, {
			undef: true,
			browser: true,
			predef: { '-Node': false }
		});
	// disallow Node and NodeFilter in a predef Array
	TestRun(test)
		.addError(14, "'NodeFilter' is not defined.")
		.addError(15, "'Node' is not defined.")
		.test(src, {
			undef: true,
			browser: true,
			predef: ['-Node', '-NodeFilter']
		});

	TestRun(test)
		.addError(3, "'event' is not defined.")
		.addError(4, "'foo' is not defined.")
		.addError(5, "'btoa' is not defined.")
		.test(code, { undef: true });

	test.done();
};

/*
 * Tests the `maxstatements` option
 */
exports.maxstatements = function (test) {
	var src = fs.readFileSync(__dirname + '/fixtures/max-statements-per-function.js', 'utf8');

	TestRun(test)
		.addError(1, "This function has too many statements. (8)")
		.test(src, { maxstatements: 7 });

	TestRun(test)
		.test(src, { maxstatements: 8 });

	TestRun(test)
		.test(src, {});

	test.done();
};

/*
 * Tests the `maxdepth` option
 */
exports.maxdepth = function (test) {
	var fixture = '/fixtures/max-nested-block-depth-per-function.js';
	var src = fs.readFileSync(__dirname + fixture, 'utf8');

	TestRun(test)
		.addError(5, "Blocks are nested too deeply. (2)")
		.addError(14, "Blocks are nested too deeply. (2)")
		.test(src, { maxdepth: 1 });

	TestRun(test)
		.addError(9, "Blocks are nested too deeply. (3)")
		.test(src, { maxdepth: 2 });

	TestRun(test)
		.test(src, { maxdepth: 3 });

	TestRun(test)
		.test(src, {});

	test.done();
};

/*
 * Tests the `maxparams` option
 */
exports.maxparams = function (test) {
	var fixture = '/fixtures/max-parameters-per-function.js';
	var src = fs.readFileSync(__dirname + fixture, 'utf8');

	TestRun(test)
		.addError(4, "This function has too many parameters. (3)")
		.test(src, { maxparams: 2 });

	TestRun(test)
		.test(src, { maxparams: 3 });

	TestRun(test)
		.test(src, {});

	test.done();
};

/*
 * Tests the `maxcomplexity` option
 */
exports.maxcomplexity = function (test) {
	var fixture = '/fixtures/max-cyclomatic-complexity-per-function.js';
	var src = fs.readFileSync(__dirname + fixture, 'utf8');

	TestRun(test)
		.addError(8, "This function's cyclomatic complexity is too high. (2)")
		.addError(15, "This function's cyclomatic complexity is too high. (2)")
		.addError(25, "This function's cyclomatic complexity is too high. (2)")
		.addError(47, "This function's cyclomatic complexity is too high. (8)")
		.test(src, { maxcomplexity: 1 });

	TestRun(test)
		.test(src, { maxcomplexity: 8 });


	TestRun(test)
		.test(src, {});

	test.done();
};

/*
 * Tests ignored warnings.
 */
exports.ignored = function (test) {
	var src = fs.readFileSync(__dirname + "/fixtures/ignored.js", "utf-8");

	TestRun(test)
		.addError(4, "A trailing decimal point can be confused with a dot: '12.'.")
		.test(src);

	TestRun(test)
		.test(src, { "-W047": true });

	test.done();
};
