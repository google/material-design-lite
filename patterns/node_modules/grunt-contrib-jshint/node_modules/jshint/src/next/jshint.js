"use strict";

var _         = require("underscore");
var parser    = require("esprima");
var events    = require("events");
var utils     = require("./utils.js");
var reason    = require("./reason.js");
var regexp    = require("./regexp.js");
var vars      = require("../shared/vars.js");

var MAXERR = 50;

// Converts errors spitted out by Esprima into JSHint errors.

function esprima(linter) {
	linter.on("lint:end", function () {
		var mapping = {
			"Illegal return statement": "E003",
			"Strict mode code may not include a with statement": "E002"
		};

		_.each(linter.tree.errors, function (err) {
			var msg = err.message.split(": ")[1];
			linter.report.addError(mapping[msg], err.lineNumber);
		});
	});
}

function Linter(code) {
	this.code    = code;
	this.config  = {};
	this.tree    = {};
	this.scopes  = new utils.ScopeStack();
	this.report  = new utils.Report(code);
	this.tokens  = null;
	this.modules = [];
	this.emitter = new events.EventEmitter();

	this.addModule(esprima);
	this.addModule(reason.register);
	this.addModule(regexp.register);

	// Pre-populate globals array with reserved variables,
	// standard ECMAScript globals and user-supplied globals.

	this.setGlobals(vars.reservedVars);
	this.setGlobals(vars.ecmaIdentifiers);
	this.setGlobals({ "undefined": false });
}

Linter.prototype = {
	on: function (names, listener) {
		var self = this;

		names.split(" ").forEach(function (name) {
			self.emitter.on(name, listener);
		});
	},

	trigger: function () {
		this.emitter.emit.apply(this.emitter, Array.prototype.slice.call(arguments));
	},

	addModule: function (func) {
		this.modules.push(func);
	},

	setGlobals: function (globals) {
		var scopes = this.scopes;

		_.each(globals, function (writeable, name) {
			scopes.addGlobalVariable({ name: name, writeable: writeable });
		});
	},

	parse: function () {
		var self = this;

		self.tree = parser.parse(self.code, {
			range:    true, // Include range-based location data.
			loc:      true, // Include column-based location data.
			comment:  true, // Include a list of all found code comments.
			tokens:   true, // Include a list of all found tokens.
			tolerant: true  // Don't break on non-fatal errors.
		});

		self.tokens = new utils.Tokens(self.tree.tokens);

		_.each(self.modules, function (func) {
			func(self);
		});

		function _parseComments(from, to) {
			var slice = self.tree.comments.filter(function (comment) {
				return comment.range[0] >= from && comment.range[1] <= to;
			});

			slice.forEach(function (comment) {
				comment = utils.parseComment(comment.value);

				switch (comment.type) {
				case "set":
					comment.value.forEach(function (name) {
						self.scopes.addSwitch(name);
					});
					break;
				case "ignore":
					comment.value.forEach(function (code) {
						self.scopes.addIgnore(code);
					});
					break;
				}
			});
		}

		// Walk the tree using recursive* depth-first search and trigger
		// appropriate events when needed.
		//
		// * - and probably horribly inefficient.

		function _parse(tree) {
			if (tree.type)
				self.trigger(tree.type, tree);

			if (self.report.length > MAXERR)
				return;

			_.each(tree, function (val) {
				if (val === null)
					return;

				if (!_.isObject(val) && !_.isArray(val))
					return;

				switch (val.type) {
				case "ExpressionStatement":
					if (val.expression.type === "Literal" && val.expression.value === "use strict")
						self.scopes.current.strict = true;
					_parse(val);
					break;
				case "FunctionDeclaration":
					self.scopes.addVariable({ name: val.id.name });
					self.scopes.push(val.id.name);

					// If this function is not empty, parse its leading comments (if any).
					if (val.body.type === "BlockStatement" && val.body.body.length > 0)
						_parseComments(val.range[0], val.body.body[0].range[0]);

					_parse(val);
					self.scopes.pop();
					break;
				case "FunctionExpression":
					if (val.id && val.id.type === "Identifier")
						self.scopes.addVariable({ name: val.id.name });
					self.scopes.push("(anon)");

					// If this function is not empty, parse its leading comments (if any).
					if (val.body.type === "BlockStatement" && val.body.body.length > 0)
						_parseComments(val.range[0], val.body.body[0].range[0]);

					_parse(val);
					self.scopes.pop();
					break;
				case "WithStatement":
					self.scopes.runtimeOnly = true;
					_parse(val);
					self.scopes.runtimeOnly = false;
					break;
				default:
					_parse(val);
				}
			});
		}

		self.trigger("lint:start");
		_parseComments(0, self.tree.range[0]);
		_parse(self.tree.body);
		self.trigger("lint:end");
	}
};

function JSHINT(args) {
	var linter = new Linter(args.code);
	linter.setGlobals(args.predefined || {});
	linter.parse();

	return {
		tree:   linter.tree,
		report: linter.report
	};
}

exports.Linter = Linter;
exports.lint   = JSHINT;
