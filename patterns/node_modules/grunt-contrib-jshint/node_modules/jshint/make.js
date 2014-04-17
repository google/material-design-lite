#!/usr/bin/env node
/*global ls, target, find, echo, cat, exit, exec, mkdir, test */

"use strict";

require("shelljs/make");
var cli = require("cli");
var pkg = require("./package.json");

var TESTS = [
	"tests/",
	"tests/stable/unit/",
	"tests/stable/regression/",
	"tests/next/unit/",
];

var OPTIONS = JSON.parse(cat("./jshint.json"));

target.all = function () {
	target.build();
	target.lint();
	target.test();
};

target.lint = function () {
	var jshint = require("jshint").JSHINT;
	var files = find("src")
		.filter(function (file) {
			return file.match(/\.js$/);
		})
		.concat(
			ls(__dirname + "/*.js").filter(function (file) {
				return file !== __dirname + "/demo.js";
			})
		);

	TESTS.forEach(function (dir) {
		ls(dir + "*.js").forEach(function (file) {
			files.push(file);
		});
	});

	echo("Linting files...", "\n");

	var failures = {};
	files.forEach(function (file) {
		var passed = jshint(cat(file), OPTIONS);
		process.stdout.write(passed ? "." : "F");

		if (!passed) {
			failures[file] = jshint.data();
		}
	});

	echo("\n");

	if (Object.keys(failures).length === 0) {
		cli.ok("All files passed.");
		echo("\n");
		return;
	}

	var outputError = function (err) {
		if (!err) {
			return;
		}

		var line = "[L" + err.line + "]";
		while (line.length < 10) {
			line += " ";
		}

		echo(line, err.reason);
		echo("\n");
	};

	for (var key in failures) {
		cli.error(key);
		failures[key].errors.forEach(outputError);
	}

	exit(1);
};

target.test = function () {
	var nodeunit = require("nodeunit").reporters.minimal;
	var files = [];

	TESTS.forEach(function (dir) {
		ls(dir + "*.js").forEach(function (file) {
			files.push(file);
		});
	});

	echo("Running tests...", "\n");
	nodeunit.run(files, null, function (err) {
		exit(err ? 1 : 0);
	});
};

target.build = function () {
	var browserify = require("browserify");
	var bundle = browserify({ debug: true });

	bundle.addEntry("./src/stable/jshint.js");

	if (!test("-e", "./dist")) {
		mkdir("./dist");
	}

	echo("Building into dist/...", "\n");

	bundle.append("JSHINT = require('/src/stable/jshint.js').JSHINT;");

	[ "// " + pkg.version,
		"var JSHINT;",
		bundle.bundle()
	].join("\n").to("./dist/jshint-" + pkg.version + ".js");

	cli.ok("Bundle");

	// Rhino
	var rhino = cat("./dist/jshint-" + pkg.version + ".js", "./src/platforms/rhino.js");
	rhino = "#!/usr/bin/env rhino\n\n" + rhino;
	rhino.to("./dist/jshint-rhino-" + pkg.version + ".js");
	exec("chmod +x dist/jshint-rhino-" + pkg.version + ".js");
	cli.ok("Rhino");
	echo("\n");
};