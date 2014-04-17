"use strict";

var events = require("events");

function Tokens(exp) {
	this.exp = exp;
	this.pos = 0;
	this.emitter = new events.EventEmitter();
}

Tokens.prototype = {
	get current() {
		return this.peak(0);
	},

	at: function (index) {
		var chr = this.exp.charAt(index);
		return chr === "" ? null : chr;
	},

	peak: function (offset) {
		var pos = this.pos + (offset === undefined ? 1 : offset);
		var chr = this.exp.charAt(pos);

		return chr === "" ? null : chr;
	},

	next: function () {
		if (this.current !== null)
			this.pos += 1;

		return this.current;
	}
};

exports.register = function (linter) {
	var report = linter.report;

	linter.on("Literal", function (literal) {
		var value = (literal.value || "").toString();

		value = value.match(/^\/(.+)\/[igm]?$/);
		if (value === null)
			return;

		var tokens = new Tokens(value[1]);
		var isLiteral = false;
		var inRange   = false;

		tokens.emitter.on("[", function () {
			tokens.next();

			if (tokens.current === "^") {
				report.addWarning("W009", literal.range, { sym: tokens.current });
				tokens.next();
			}

			if (tokens.current === "]") {
				report.addWarning("W010", literal.range);
			}

			do {
				switch (tokens.current) {
				case "[":
				case "^":
					report.addWarning("W011", literal.range, { sym: tokens.current });
					if (inRange) inRange = false;
					else isLiteral = true;
					break;
				case "-":
					if (isLiteral && !inRange) {
						isLiteral = false;
						inRange = true;
					} else if (inRange) {
						inRange = false;
					} else if (tokens.peak() === "]") {
						inRange = true;
					} else {
						report.addWarning("W011", literal.range, { sym: "-" });
						isLiteral = true;
					}
					break;
				case "]":
					if (inRange)
						report.addWarning("W011", literal.range, { sym: "-" });
					return;
				case "\\":
					tokens.next();

					// \w, \s and \d are never part of a character range.
					if (/[wsd]/i.test(tokens.current)) {
						if (inRange) {
							report.addWarning("W011", literal.range, { sym: "-" });
							inRange = false;
						}
						isLiteral = false;
					} else if (inRange) {
						inRange = false;
					} else {
						isLiteral = true;
					}
					break;
				case "/":
					report.addWarning("W011", literal.range, { sym: tokens.current });
					/* falls through */
				default:
					if (inRange) inRange = false;
					else isLiteral = true;
				}

			} while (tokens.next());
		});

		tokens.emitter.on(".", function () {
			if (tokens.peak(-1) !== "\\") {
				report.addWarning("W009", literal.range, { sym: tokens.current });
			}
		});

		while (tokens.current !== null) {
			tokens.emitter.emit(tokens.current);
			tokens.next();
		}
	});
};
