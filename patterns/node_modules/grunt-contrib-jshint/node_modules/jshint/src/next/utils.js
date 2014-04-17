"use strict";

var _ = require("underscore");
var util = require("util");
var Peakle = require("peakle").Peakle;
var warnings = require("./constants.js").warnings;
var errors = require("./constants.js").errors;

function safe(name) {
	if (name === "__proto__")
		return "(__proto__)";

	var special = Object.getOwnPropertyNames(Object.prototype);
	for (var i = 0; i < special.length; i++) {
		if (name === special[i])
			return "(" + name + ")";
	}

	return name;
}

function interpolate(string, data) {
	return string.replace(/\{([^{}]*)\}/g, function (match, key) {
		var repl = data[key];

		if (typeof repl === 'string' || typeof repl === 'number')
			return repl;

		return match;
	});
}

// ScopeStack stores all the environments we encounter while
// traversing syntax trees. It also keeps track of all
// variables defined and/or used in these environments.
//
// We use linked-list implementation of a stack. The first
// element, representing global environment, doesn't have
// a reference to its parent.
//
// runtimeOnly means that we can't tell if identifier
// is a variable or a property by analysing the source. It
// is true only within the `with` statement.

function ScopeStack() {
	this.stack = [];
	this.curid = null;

	this.runtimeOnly = false;
	this.push("(global)");
}

ScopeStack.prototype = {
	get current() {
		if (this.curid === null)
			return null;

		return this.stack[this.curid];
	},

	get parent() {
		if (this.curid === null)
			return null;

		var parid = this.current.parid;

		if (parid === null)
			return null;

		return this.stack[parid];
	},

	// Push a new environment into the stack.

	push: function (name) {
		var curid = this.curid;
		this.curid = this.stack.length;

		this.stack.push({
			parid:    curid,
			name:     name,
			strict:   false,
			switches: {},
			ignores:  {},
			vars:     {},
			uses:     {}
		});
	},

	// Exit from the current environment. Even though
	// this method is called `pop` it doesn't actually
	// delete the environment--it simply jumps into the
	// parent one.

	pop: function () {
		this.curid = this.current.parid;
	},

	any: function (cond, env) {
		env = env || this.current;

		while (env) {
			if (cond.call(env))
				return true;

			env = this.stack[env.parid];
		}

		return false;
	},

	isDefined: function (name, env) {
		return this.any(function () { return _.has(this.vars, safe(name)); }, env);
	},

	isStrictMode: function (env) {
		return this.any(function () { return this.strict; }, env);
	},

	isSwitchEnabled: function (name, env) {
		return this.any(function () { return this.switches[name]; }, env);
	},

	isMessageIgnored: function (code, env) {
		return this.any(function () { return this.ignores[code]; }, env);
	},

	addUse: function (name, range) {
		name = safe(name);

		if (this.runtimeOnly)
			return;

		if (this.current.uses[name] === undefined)
			this.current.uses[name] = [range];
		else
			this.current.uses[name].push(range);
	},

	addVariable: function (opts) {
		this.current.vars[safe(opts.name)] = {
			writeable: opts.writeable || false
		};
	},

	addGlobalVariable: function (opts) {
		this.stack[0].vars[safe(opts.name)] = {
			writeable: opts.writeable || false
		};
	},

	addSwitch: function (name) {
		this.current.switches[name] = true;
	},

	addIgnore: function (name) {
		this.current.ignores[name] = true;
	}
};

function Report(source) {
	this.ERROR   = 1;
	this.WARNING = 2;

	this.length   = 0;
	this.messages = {};
	this.ranges   = [];
	this.source   = source;
}

Report.prototype = {
	lineFromRange: function (range) {
		var lines = this.source.slice(0, range[0]).split("\n");
		return lines.length || -1;
	},

	getMessages: function (cond) {
		var ret = [];
		cond = cond || function () { return true; };

		_.each(this.messages, function (pool) {
			_.each(pool, function (msg) {
				if (cond(msg))
					ret.push(msg);
			});
		});

		return ret;
	},

	get errors() {
		var type = this.ERROR;

		return this.getMessages(function (msg) {
			return msg.type === type;
		});
	},

	get warnings() {
		var type = this.WARNING;

		return this.getMessages(function (msg) {
			return msg.type === type;
		});
	},

	addMessage: function (obj) {
		var line = obj.line;
		this.messages[line] = _.union(this.messages[line] || [], [obj]);
		this.length += 1;
	},

	addWarning: function (label, loc, data) {
		var line = _.isArray(loc) ? this.lineFromRange(loc) : loc;
		var warn = warnings[label];

		if (!warn)
			throw new Error("Warning " + label + "is not defined.");

		warn.desc = interpolate(warn.desc, data);
		this.addMessage({
			type: this.WARNING,
			line: line,
			data: warn
		});
	},

	addError: function (label, loc, data) {
		var line = _.isArray(loc) ? this.lineFromRange(loc) : loc;
		var err  = errors[label];

		if (!err)
			throw new Error("Error " + label + " is not defined.");

		err.desc = interpolate(err.desc, data);
		this.addMessage({
			type: this.ERROR,
			line: line,
			data: err
		});
	}
};

function Token(obj) {
	_.extend(this, obj);
}

_.each(["Punctuator", "Keyword", "Identifier"], function (name) {
	Token.prototype["is" + name] = function (values) {
		if (!Array.isArray(values))
			values = [ values ];

		return values.some(function (value) {
			return this.type === name && this.value === value;
		}, this);
	};
});

function Tokens(list) {
	var self = this;
	Peakle.call(self, list);

	// A hash-table to make tokens lookup by their starting
	// position cheaper (see Tokens.find for more info).
	self.byStart = {};

	self.list = _.map(list || [], function (obj, i) {
		var token = new Token(obj);
		self.byStart[token.range[0]] = i;
		return token;
	});
}

util.inherits(Tokens, Peakle);

Tokens.prototype.find = function (rangeIndex) {
	// First try to lookup our token in byStart in
	// case this index is the starting point for the token.

	var index = this.byStart[rangeIndex];

	if (index)
		return index;

	// If we could find it, step back, token by token
	// until we find one that starts before the one we're
	// looking for,

	var cur = rangeIndex - 1;

	do {
		index = this.byStart[cur];
		cur   = cur - 1;
	} while (index === undefined && cur > 0);

	// If we're in the beginning and still nothing--return.

	if (index === undefined)
		return -1;

	// Otherwise go in a slow O(N) loop looking for our token.

	for (var i = index; i < this.length; i++) {
		if (this.list[i].range[0] >= rangeIndex)
			return i;
	}

	return -1;
};

Tokens.prototype.getRange = function (range) {
	var slice  = [];
	var length = this.list.length;
	var token;

	for (var i = this.byStart[range[0]] || 0; i < length; i++) {
		token = this.list[i];

		if (token.range[0] < range[0])
			continue;

		if (token.range[1] <= range[1])
			slice.push(token);
		else
			break;
	}

	return new Tokens(slice);
};

var commentsTypes = { "set": true, "ignore": true };

function parseComment(text) {
	var parts  = text.trim().split(" ");
	var defval = { type: "text", value: text };
	var head, body;

	if (parts.length === 0)
		return defval;

	head = parts[0].split(":");
	if (head[0] !== "jshint" || commentsTypes[head[1]] !== true)
		return defval;

	body = parts.slice(1).join(" ").split(",").map(function (s) {
		return s.trim();
	});

	return {
		type:  head[1],
		value: body
	};
}

exports.Report = Report;
exports.Token  = Token;
exports.Tokens = Tokens;
exports.ScopeStack = ScopeStack;
exports.parseComment = parseComment;
