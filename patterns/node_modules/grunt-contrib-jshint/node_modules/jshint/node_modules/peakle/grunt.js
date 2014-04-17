module.exports = function (grunt) {
	grunt.initConfig({
		lint: {
			all: [ "peakle.js", "test.js" ]
		},

		test: {
			all: [ "test.js" ]
		},

		jshint: {
			options: {
				es5: true,
				node: true,
				globalstrict: true,
				strict: true,
				white: true,
				smarttabs: true,
				undef: true,
				unused: true,
				quotmark: "double"
			}
		}
	});

	grunt.registerTask("default", "lint test");
};

