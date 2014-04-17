"use strict";

var Peakle = require("./peakle.js").Peakle;

exports.testPeakle = function (test) {
	var peakled = new Peakle([ "one", "two", "three" ]);

	test.equal(peakled.list.length, 3);
	test.equal(peakled.cur, 0);
	test.equal(peakled.current, "one");

	test.equal(peakled.peak(), "two");
	test.equal(peakled.peak(2), "three");
	test.equal(peakled.peak(0), "one"); // :)
	test.equal(peakled.peak(-1), null);
	test.equal(peakled.cur, 0);

	test.equal(peakled.next(), "two");
	test.equal(peakled.peak(-1), "one");
	test.equal(peakled.cur, 1);
	test.equal(peakled.current, "two");

	test.equal(peakled.next(), "three");
	test.equal(peakled.peak(), null);
	test.equal(peakled.next(), null);
	test.equal(peakled.cur, 2);

	test.equal(peakled.prev(), "two");
	test.equal(peakled.peak(), "three");

	test.equal(peakled.move(-1), null);
	test.equal(peakled.move(0), "one");
	test.equal(peakled.cur, 0);

	test.done();
};

exports.testEmptyPeakle = function (test) {
	var peakled = new Peakle([]);

	test.equal(peakled.list.length, 0);
	test.equal(peakled.current, null);
	test.equal(peakled.cur, null);
	test.equal(peakled.next(), null);
	test.equal(peakled.prev(), null);
	test.equal(peakled.move(0), null);

	test.done();
};
