"use strict";

var path = require("path");
var shjs = require("shelljs");
var sinon = require("sinon");
var cli = require("../src/cli/cli.js");

exports.group = {
	setUp: function (cb) {
		if (!process.stdout.flush) {
			process.stdout.flush = function () { return true; };
		}

		sinon.stub(process, "exit");
		cb();
	},

	tearDown: function (cb) {
		process.exit.restore();
		cb();
	},

	testConfig: function (test) {
		var _cli = require("cli");
		var out = sinon.stub(_cli, "error");
		sinon.stub(cli, "run").returns(true);

		sinon.stub(shjs, "cat")
			.withArgs(sinon.match(/file\.js$/)).returns("var a = function () {}; a();")
			.withArgs(sinon.match(/file1\.json$/)).returns("wat")
			.withArgs(sinon.match(/file2\.json$/)).returns("{\"node\":true}");

		sinon.stub(shjs, "test")
			.withArgs("-e", sinon.match(/file\.js$/)).returns(true)
			.withArgs("-e", sinon.match(/file1\.json$/)).returns(true)
			.withArgs("-e", sinon.match(/file2\.json$/)).returns(true)
			.withArgs("-e", sinon.match(/file3\.json$/)).returns(false);

		process.exit.restore();
		sinon.stub(process, "exit").throws("ProcessExit");

		// File doesn't exist.
		try {
			cli.interpret([
				"node", "jshint", "file.js", "--config", "file3.json"
			]);
		} catch (err) {
			var msg = out.args[0][0];
			test.equal(msg.slice(0, 23), "Can't find config file:");
			test.equal(msg.slice(msg.length - 10), "file3.json");
			test.equal(err, "ProcessExit");
		}

		// Invalid config
		try {
			cli.interpret([
				"node", "jshint", "file.js", "--config", "file1.json"
			]);
		} catch (err) {
			var msg = out.args[1][0];
			test.equal(msg.slice(0, 24), "Can't parse config file:");
			test.equal(msg.slice(msg.length - 10), "file1.json");
			test.equal(err, "ProcessExit");
		}

		// Valid config
		process.exit.restore();
		sinon.stub(process, "exit");

		cli.interpret([
			"node", "jshint", "file.js", "--config", "file2.json"
		]);

		_cli.error.restore();
		cli.run.restore();
		shjs.cat.restore();
		shjs.test.restore();

		test.done();
	},

	testReporter: function (test) {
		test.expect(5);

		var _cli = require("cli");
		var rep = require("../examples/reporter.js");
		var run = sinon.stub(cli, "run");
		var out = sinon.stub(_cli, "error");
		var dir = __dirname + "/../examples/";
		sinon.stub(process, "cwd").returns(dir);

		process.exit.restore();
		sinon.stub(process, "exit").throws("ProcessExit");

		// Test failed attempt.
		try {
			cli.interpret([
				"node", "jshint", "file.js", "--reporter", "invalid.js"
			]);
		} catch (err) {
			var msg = out.args[0][0];
			test.equal(msg.slice(0, 25), "Can't load reporter file:");
			test.equal(msg.slice(msg.length - 10), "invalid.js");
			test.equal(err, "ProcessExit");
		}

		// Test successful attempt.
		run.restore();
		sinon.stub(rep, "reporter");
		sinon.stub(shjs, "test")
			.withArgs("-e", sinon.match(/file\.js$/)).returns(true)
			.withArgs("-e", sinon.match(/\.jshintrc$/)).returns(true)
			.withArgs("-e", sinon.match(/\.jshintignore$/)).returns(true);

		sinon.stub(shjs, "cat")
			.withArgs(sinon.match(/file\.js$/)).returns("func()")
			.withArgs(sinon.match(/\.jshintrc$/)).returns("{}")
			.withArgs(sinon.match(/\.jshintignore$/)).returns("");

		try {
			cli.interpret([
				"node", "jshint", "file.js", "--reporter", "reporter.js"
			]);
		} catch (err) {
			if (err.name !== "ProcessExit") {
				throw err;
			}

			test.equal(rep.reporter.args[0][0][0].error.raw, "Missing semicolon.");
			test.ok(rep.reporter.calledOnce);
		}

		rep.reporter.restore();
		shjs.test.restore();
		shjs.cat.restore();
		process.cwd.restore();
		test.done();
	},

	testJSLintReporter: function (test) {
		var rep = require("../src/reporters/jslint_xml.js");
		var run = sinon.stub(cli, "run");

		cli.interpret([
			"node", "jshint", "file.js", "--reporter", "jslint"
		]);
		test.equal(run.args[0][0].reporter, rep.reporter);

		cli.interpret([
			"node", "jshint", "file.js", "--jslint-reporter"
		]);
		test.equal(run.args[1][0].reporter, rep.reporter);

		run.restore();
		test.done();
	},

	testCheckStyleReporter: function (test) {
		var rep = require("../src/reporters/checkstyle.js");
		var run = sinon.stub(cli, "run");

		cli.interpret([
			"node", "jshint", "file.js", "--reporter", "checkstyle"
		]);
		test.equal(run.args[0][0].reporter, rep.reporter);

		cli.interpret([
			"node", "jshint", "file.js", "--checkstyle-reporter"
		]);
		test.equal(run.args[1][0].reporter, rep.reporter);

		run.restore();
		test.done();
	},

	testShowNonErrors: function (test) {
		var rep = require("../src/reporters/non_error.js");
		var run = sinon.stub(cli, "run");

		cli.interpret([
			"node", "jshint", "file.js", "--show-non-errors"
		]);
		test.equal(run.args[0][0].reporter, rep.reporter);

		run.restore();
		test.done();
	},

	testExtensions: function (test) {
		var run = sinon.stub(cli, "run");

		cli.interpret([
			"node", "jshint", "file.js"
		]);
		test.equal(run.args[0][0].extensions, "");

		cli.interpret([
			"node", "jshint", "file.js", "--extra-ext", ".json"
		]);
		test.equal(run.args[1][0].extensions, ".json");

		run.restore();
		test.done();
	},

	testRcFile: function (test) {
		var run = sinon.stub(cli, "run");
		var dir = __dirname + "/../examples/";
		sinon.stub(process, "cwd").returns(dir);

		cli.interpret([
			"node", "jshint", "file.js"
		]);
		test.equal(run.args[0][0].config.strict, true);
		process.cwd.restore();

		var home = path.join(process.env.HOME, ".jshintrc");
		var conf = shjs.cat(path.join(dir, ".jshintrc"));
		sinon.stub(shjs, "test").withArgs("-e", home).returns(true);
		sinon.stub(shjs, "cat").withArgs(home).returns(conf);

		cli.interpret([
			"node", "jshint", "file.js"
		]);
		test.equal(run.args[1][0].config.strict, true);

		shjs.test.restore();
		shjs.cat.restore();
		run.restore();
		test.done();
	},
    
	testRcLookup: function (test) {
		var run = sinon.stub(cli, "run");
		var srcDir = __dirname + "../src/";
		var confPath = path.join(srcDir, ".jshintrc");
		var cliDir = path.join(srcDir, "cli/");
		var conf = shjs.cat(path.join(__dirname + "/../examples/", ".jshintrc"));

		sinon.stub(process, "cwd").returns(cliDir);
		sinon.stub(shjs, "test").withArgs("-e", confPath).returns(true);
		sinon.stub(shjs, "cat").withArgs(confPath).returns(conf);

		cli.interpret([
			"node", "jshint", "file.js"
		]);
		test.equal(run.args[0][0].config.strict, true);

		shjs.test.restore();
		shjs.cat.restore();
		process.cwd.restore();
		run.restore();
		test.done();
	},

	testIgnoreFile: function (test) {
		var run = sinon.stub(cli, "run");
		var dir = __dirname + "/../examples/";
		sinon.stub(process, "cwd").returns(dir);

		cli.interpret([
			"node", "jshint", "file.js"
		]);

		test.equal(run.args[0][0].ignores[0], path.resolve(dir, "ignored.js"));
		test.equal(run.args[0][0].ignores[1], path.resolve(dir, "another.js"));

		run.restore();
		process.cwd.restore();

		sinon.stub(process, "cwd").returns(__dirname + "/../");
		sinon.stub(shjs, "cat")
			.withArgs(sinon.match(/file.js$/)).returns("console.log('Hello');")
			.withArgs(sinon.match(/\.jshintrc$/)).returns("{}")
			.withArgs(sinon.match(/\.jshintignore$/)).returns("examples");

		var args = shjs.cat.args.filter(function (arg) {
			return !/\.jshintrc$/.test(arg[0]) && !/\.jshintignore$/.test(arg[0]);
		});

		test.equal(args.length, 0);

		process.cwd.restore();
		shjs.cat.restore();
		test.done();
	},

	testCollectFiles: function (test) {
		var dir = __dirname + "/../examples/";
		sinon.stub(process, "cwd").returns(dir);

		sinon.stub(shjs, "test")
			.withArgs("-e", sinon.match(/.*/)).returns(true);

		sinon.stub(shjs, "cat")
			.withArgs(sinon.match(/file2?\.js$/)).returns("console.log('Hello');")
			.withArgs(sinon.match(/ignore[\/\\]file\d\.js$/)).returns("console.log('Hello, ignore me');")
			.withArgs(sinon.match(/ignore[\/\\]dir[\/\\]file\d\.js$/)).returns("print('Ignore me');")
			.withArgs(sinon.match(/node_script$/)).returns("console.log('Hello, ignore me');")
			.withArgs(sinon.match(/\.jshintrc$/)).returns("{}")
			.withArgs(sinon.match(/\.jshintignore$/)).returns(path.join("ignore", "**"));

		cli.interpret([
			"node", "jshint", "file.js", "file2.js", "node_script", path.join("ignore", "file1.js"),
			path.join("ignore", "file2.js"), path.join("ignore", "dir", "file1.js")
		]);

		var args = shjs.cat.args.filter(function (arg) {
			return !/\.jshintrc$/.test(arg[0]) && !/\.jshintignore$/.test(arg[0]);
		});

		test.equal(args.length, 3);
		test.equal(args[0][0], "file.js");
		test.equal(args[1][0], "file2.js");
		test.equal(args[2][0], "node_script");

		shjs.test.restore();
		shjs.cat.restore();

		sinon.stub(shjs, "test")
			.withArgs("-e", sinon.match(/.*/)).returns(true)
			.withArgs("-d", sinon.match(/src$/)).returns(true)
			.withArgs("-d", sinon.match(/src[\/\\]lib$/)).returns(true);

		sinon.stub(shjs, "ls")
			.withArgs(sinon.match(/src$/)).returns(["lib", "file4.js"])
			.withArgs(sinon.match(/src[\/\\]lib$/)).returns(["file5.js"]);

		sinon.stub(shjs, "cat")
			.withArgs(sinon.match(/file2?\.js$/)).returns("console.log('Hello');")
			.withArgs(sinon.match(/file3\.json$/)).returns("{}")
			.withArgs(sinon.match(/src[\/\\]file4\.js$/)).returns("print('Hello');")
			.withArgs(sinon.match(/src[\/\\]lib[\/\\]file5\.js$/)).returns("print('Hello');")
			.withArgs(sinon.match(/\.jshintrc$/)).returns("{}")
			.withArgs(sinon.match(/\.jshintignore$/)).returns("");

		cli.interpret([
			"node", "jshint", "file.js", "file2.js", "file3.json", "--extra-ext=json", "src"
		]);

		args = shjs.cat.args.filter(function (arg) {
			return !/\.jshintrc$/.test(arg[0]) && !/\.jshintignore$/.test(arg[0]);
		});

		test.equal(args.length, 5);
		test.equal(args[0][0], "file.js");
		test.equal(args[1][0], "file2.js");
		test.equal(args[2][0], "file3.json");
		test.equal(args[3][0], path.join("src", "lib", "file5.js"));
		test.equal(args[4][0], path.join("src", "file4.js"));

		shjs.test.restore();
		shjs.ls.restore();
		shjs.cat.restore();
		process.cwd.restore();

		sinon.stub(process, "cwd").returns(__dirname + "/../");
		sinon.stub(shjs, "cat")
			.withArgs(sinon.match(/reporter\.js$/)).returns("console.log('Hello');")
			.withArgs(sinon.match(/\.jshintrc$/)).returns("{}")
			.withArgs(sinon.match(/\.jshintignore$/)).returns("");

		cli.interpret([
			"node", "jshint", "examples"
		]);

		args = shjs.cat.args.filter(function (arg) {
			return !/\.jshintrc$/.test(arg[0]) && !/\.jshintignore$/.test(arg[0]);
		});

		test.equal(args.length, 1);
		test.equal(args[0][0], path.join("examples", "reporter.js"));

		shjs.cat.restore();
		process.cwd.restore();
		test.done();
	},

	testStatusCode: function (test) {
		var rep = require("../examples/reporter.js");
		var dir = __dirname + "/../examples/";
		sinon.stub(rep, "reporter");
		sinon.stub(process, "cwd").returns(dir);

		sinon.stub(shjs, "test")
			.withArgs("-e", sinon.match(/.*/)).returns(true);

		sinon.stub(shjs, "cat")
			.withArgs(sinon.match(/pass\.js$/)).returns("function test() { return 0; }")
			.withArgs(sinon.match(/fail\.js$/)).returns("console.log('Hello')")
			.withArgs(sinon.match(/\.jshintrc$/)).returns("{}")
			.withArgs(sinon.match(/\.jshintignore$/)).returns("");

		process.exit.restore();
		sinon.stub(process, "exit");

		cli.interpret([
			"node", "jshint", "pass.js", "--reporter=reporter.js"
		]);

		cli.interpret([
			"node", "jshint", "fail.js", "--reporter=reporter.js"
		]);

		test.strictEqual(process.exit.args[0][0], 0);
		test.equal(process.exit.args[1][0], 2);

		rep.reporter.restore();
		process.cwd.restore();
		shjs.test.restore();
		shjs.cat.restore();

		test.done();
	},

	testDrain: function (test) {
		var dir = __dirname + "/../examples/";
		sinon.stub(cli, "run").returns(false);
		sinon.stub(process, "cwd").returns(dir);
		sinon.stub(process.stdout, "flush").returns(false);
		sinon.stub(process.stdout, "on", function (name, func) {
			func();
		});

		process.exit.restore();
		sinon.stub(process, "exit");

		cli.interpret(["node", "jshint", "reporter.js"]);
		test.equal(process.stdout.on.args[0][0], "drain");
		test.strictEqual(process.exit.args[0][0], 2);

		process.cwd.restore();
		process.stdout.flush.restore();
		process.stdout.on.restore();
		cli.run.restore();

		test.done();
	}
};
