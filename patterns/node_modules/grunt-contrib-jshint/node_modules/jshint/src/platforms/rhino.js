/*jshint boss: true, rhino: true, unused: true, undef: true, white: true, quotmark: double */
/*global JSHINT */

(function (args) {
	"use strict";

	var filenames = [];
	var optstr; // arg1=val1,arg2=val2,...
	var predef; // global1=true,global2,global3,...
	var opts   = {};
	var retval = 0;

	args.forEach(function (arg) {
		if (arg.indexOf("=") > -1) {
			if (!optstr) {
				// First time it's the options.
				optstr = arg;
			} else {
				predef = arg;
			}

			return;
		}

		if (optstr) {
			predef = arg;
			return;
		}

		filenames.push(arg);
	});

	if (filenames.length === 0) {
		print("Usage: jshint.js file.js");
		quit(1);
	}

	if (optstr) {
		optstr.split(",").forEach(function (arg) {
			var o = arg.split("=");
			if (o[0] === "indent") {
				opts[o[0]] = parseInt(o[1], 10);
			} else {
				opts[o[0]] = (function (ov) {
					switch (ov) {
					case "true":
						return true;
					case "false":
						return false;
					default:
						return ov;
					}
				}(o[1]));
			}
		});
	}

	if (predef) {
		opts.predef = {};

		predef.split(",").forEach(function (arg) {
			var global = arg.split("=");
			opts.predef[global[0]] = global[1] === "true" ? true : false;
		});
	}

	filenames.forEach(function (name) {
		var input = readFile(name);

		if (!input) {
			print("jshint: Couldn't open file " + name);
			quit(1);
		}

		if (!JSHINT(input, opts)) {
			for (var i = 0, err; err = JSHINT.errors[i]; i += 1) {
				print(err.reason + " (" + name + ":" + err.line + ":" + err.character + ")");
				print("> " + (err.evidence || "").replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
				print("");
			}
			retval = 1;
		}
	});

	quit(retval);
}(arguments));
