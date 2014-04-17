/*jshint node: true*/

(function () {
	"use strict";

	var coveraje = require("coveraje").coveraje,
		fs = require("fs"),
		path = require("path");
	var filePath = path.resolve(path.join(__dirname, "../../jshint.js"));

	function runTests(file, helper) {
		return function (context) {
			// hack: set cache value
			require.cache[filePath] = {
				id: filePath,
				exports: context.exports,
				loaded: true
			};

			return coveraje.runHelper(helper).run(file);
		};
	}

	var tests = {};
	var rd = path.join(__dirname, "..");

	function collect(dirs) {
		var l = dirs.length;
		var r = 0;

		function onDir(dirPath) {
			return function (err, files) {
				r += 1;

				if (!err) {
					files.forEach(function (f) {
						var p = path.join(dirPath, f);
						var stat;

						try {
							stat = fs.statSync(p);
						} catch (ex) {
							return;
						}

						if (stat.isFile()) {
							tests[path.relative(rd, p)] = runTests(path.join(dirPath, f), "expresso");
						}
					});
				}

				if (r === l) { // all dirs loaded
					coveraje.cover(
						function () {
							// always read the content from disk, so changes can be refreshed in the browser
							try {
								return fs.readFileSync(filePath, 'utf-8');
							} catch (ex) {
								return "{ /*" + ex.message + "*/ }";
							}
						},
						tests,
						{
							useServer: true,
							globals: "node"
						}
					);
				}

			};
		}


		for (var i = 0; i < l; i += 1) {
			var subPath = path.join(rd, dirs[i]);

			fs.readdir(subPath, onDir(subPath));
		}
	}

	collect(["unit", "regression"]);
}());
