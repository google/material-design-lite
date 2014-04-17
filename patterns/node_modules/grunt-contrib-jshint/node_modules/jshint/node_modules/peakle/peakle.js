"use strict";

function Peakle(list) {
	this.list = list || [];
	this.cur  = this.list.length > 0 ? 0 : null;
}

Peakle.prototype = {
	get length() {
		return this.list.length;
	},

	get current() {
		return this.peak(0);
	},

	prev: function () {
		var prev = this.peak(-1);

		if (prev === null)
			return null;

		this.cur -= 1;
		return prev;
	},

	next: function () {
		var next = this.peak();

		if (next === null)
			return null;

		this.cur += 1;
		return next;
	},

	peak: function (adv) {
		if (adv === undefined)
			adv = 1;

		if (this.cur === null)
			return null;

		if (this.cur >= this.length)
			return null;

		return this.list[this.cur + adv] || null;
	},

	move: function (i) {
		if (i < 0 || i >= this.length)
			return null;

		this.cur = i;
		return this.current;
	}
};

exports.Peakle = Peakle;
