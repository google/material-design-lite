"use strict";

var state = {
	syntax: {},

	reset: function () {
		this.tokens = {
			prev: null,
			next: null,
			curr: null
		},

		this.option = {};
		this.directive = {};
		this.jsonMode = false;
		this.lines = [];
		this.tab = "";
		this.cache = {}; // Node.JS doesn't have Map. Sniff.
	}
};

exports.state = state;