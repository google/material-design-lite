// jshint:set var

function main(cb) {
	// jshint:set strict
	// jshint:ignore W001
	"use strict";

	cb(function () {
		// jshint:ignore E001
		return function () {}; // jshint:ignore E002
		// jshint:set hula
	});
}
