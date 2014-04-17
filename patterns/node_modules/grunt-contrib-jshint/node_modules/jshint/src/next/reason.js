"use strict";

var _ = require("underscore");
var vars = require("../shared/vars.js");

exports.register = function (linter) {
	var report = linter.report;
	var tokens = linter.tokens;
	var scopes = linter.scopes;

	// Check for trailing commas in arrays and objects.

	linter.on("ArrayExpression ObjectExpression", function (expr) {
		var token = tokens.move(tokens.find(expr.range[1] - 3));

		if (token.isPunctuator(","))
			report.addError("E001", token.range);
	});

	// Check for properties named __iterator__. This is a special property
	// available only in browsers with JavaScript 1.7 implementation.

	linter.on("MemberExpression", function (expr) {
		var prop = expr.property;

		if (prop.type === "Identifier" && prop.name === "__iterator__")
			report.addError("E004", prop.range);
	});

	// Check for properties named __proto__. This special property was
	// deprecated long time ago.

	linter.on("MemberExpression", function (expr) {
		var prop = expr.property;

		if (prop.type === "Identifier" && prop.name === "__proto__")
			report.addError("E005", prop.range);
	});

	// Check for missing semicolons but only when they have a potential
	// of breaking things due to automatic semicolon insertion.

	linter.on("ExpressionStatement", function (expr) {
		var type = expr.expression.type;

		if (type !== "CallExpression" && type !== "MemberExpression")
			return;

		var slice = tokens.getRange(expr.range);
		var token = slice.move(1);
		var prev, curLine, prevLine;

		while (token !== null) {
			if (token.isPunctuator(["(", "["])) {
				prev = slice.peak(-1);
				curLine = report.lineFromRange(token.range);
				prevLine = report.lineFromRange(prev.range);

				if (curLine !== prevLine && !prev.isPunctuator(";")) {
					report.addError("E006", prev.range);
				}
			}

			token = slice.next();
		}
	});

	linter.on("BinaryExpression", function (expr) {
		var op = expr.operator;

		if (op !== "+" && op !== "*" && op !== "/")
			return;

		if (expr.left.loc.end.line < expr.right.loc.start.line)
			report.addError("E006", expr.range);
	});

	// Catch cases where you put a new line after a `return` statement
	// by mistake.

	linter.on("ReturnStatement", function (expr) {
		var cur = tokens.move(tokens.find(expr.range[0]));
		var next = tokens.peak();

		if (report.lineFromRange(next.range) === report.lineFromRange(cur.range))
			return;

		if (next && next.isPunctuator(";"))
			return;

		if (next && next.isKeyword("var"))
			return;

		if (next && next.isKeyword("case"))
			return;

		report.addError("E006", cur.range);
	});

	// Check for debugger statements. You really don't want them in your
	// production code.

	linter.on("DebuggerStatement", function (expr) {
		report.addError("E007", expr.range);
	});

	// Disallow bitwise operators: they are slow in JavaScript and
	// more often than not are simply typoed logical operators.

	linter.on("BinaryExpression UnaryExpression", function (expr) {
		var ops = {
			"|"  : true,
			"&"  : true,
			"^"  : true,
			"~"  : true,
			"<<" : true,
			">>" : true,
			">>>": true
		};

		if (expr.operator && ops[expr.operator] === true)
			report.addWarning("W001", expr.range);
	});

	// Complain about comparisons that can blow up because of type
	// coercion.

	linter.on("BinaryExpression", function (expr) {
		function isUnsafe(el) {
			if (el.type === "Identifier" && el.name === "undefined")
				return true;

			if (el.type !== "Literal")
				return false;

			return _.any([
				el.value === 0,
				el.value === null,
				el.value === "",
				el.value === false,
				el.value === true
			]);
		}

		if (expr.operator !== "==" && expr.operator !== "!=")
			return;

		if (isUnsafe(expr.left))
			report.addWarning("W002", expr.left.range);

		if (isUnsafe(expr.right))
			report.addWarning("W002", expr.right.range);
	});

	// Complain about variables defined twice.

	function isRedefined(name, range) {
		if (scopes.isDefined(name))
			report.addWarning("W003", range);
	}

	linter.on("VariableDeclarator", function (expr) {
		isRedefined(expr.id.name, expr.id.range);
		scopes.addVariable({ name: expr.id.name });
	});

	linter.on("FunctionExpression FunctionDeclaration", function (expr) {
		_.each(expr.params, function (param) {
			isRedefined(param.name, param.range);
			scopes.addVariable({ name: param.name });
		});
	});

	// Check if identifier is a free variable and record its
	// use. Later in the code we'll use that to spot undefined
	// variables.

	linter.on("Identifier", function (ident) {
		var index = tokens.find(ident.range[0]);
		var token, prev, next;

		if (index > 0) {
			token = tokens.move(index);
			prev  = tokens.peak(-1);
			next  = tokens.peak(1) || { isPunctuator: function () { return false; } };

			// This identifier is a property key, not a free variable.

			if (next.isPunctuator(":") && !prev.isPunctuator("?"))
				return;

			// This identifier is a property itself, not a free variable.

			if (prev.isPunctuator("."))
				return;

			// Operators typeof and delete do not raise runtime errors
			// even if the base object of a reference is null, so we don't
			// need to display warnings in these cases.

			if (prev.isKeyword("typeof") || prev.isKeyword("delete")) {

				// Unless you're trying to subscript a null references. That
				// will throw a runtime error.

				if (!next.isPunctuator(".") && !next.isPunctuator("["))
					return;
			}
		}

		scopes.addUse(ident.name, ident.range);
	});

	// Look for arguments.callee and arguments.caller usage and warn about
	// them. In strict mode, instead of warning about arguments.callee, return
	// an error. This also supports [] notation.

	linter.on("Identifier Literal", function (expr) {
		if (scopes.current.name === "(global)") {
			if (expr.type === "Identifier" && expr.name === "arguments")
				report.addWarning("W007", expr.range);

			return;
		}

		var name  = expr.type === "Identifier" ? expr.name : expr.value;
		var punc  = expr.type === "Identifier" ? "." : "[";
		var range = expr.range;

		if (name !== "callee" && name !== "caller")
			return;

		var index = tokens.find(range[0]);

		if (index < 1)
			return;

		tokens.move(index);

		if (tokens.peak(-1).isPunctuator(punc) && tokens.peak(-2).isIdentifier("arguments")) {
			switch (name) {
			case "caller":
				report.addWarning("W005", range);
				break;
			case "callee":
				if (scopes.isStrictMode())
					report.addError("E008", range);
				else
					report.addWarning("W006", range);
			}
		}
	});

	// Warn when assignments are used instead of conditionals.
	linter.on("ForStatement IfStatement WhileStatement DoWhileStatement", function (expr) {
		if (expr.test && expr.test.type === "AssignmentExpression")
			report.addWarning("W008", expr.range);
	});

	// Warn when extending prototypes of built-in objects
	linter.on("AssignmentExpression", function (expr) {
		var left = expr.left;
		var obj = left.object;

		function isNativeProto(expr) {
			if (!expr.property || !expr.object)
				return false;

			return expr.object.name in
				vars.ecmaIdentifiers && expr.property.name === "prototype";
		}

		if (left.type !== "MemberExpression")
			return;

		// Check for Object.prototype.prop = ""
		// Check for Native.prototype = {}
		if (isNativeProto(left) || isNativeProto(obj))
			report.addWarning("W012", expr.range);
	});

	// Go over all stacks and find all variables that were used but
	// never defined.
	//
	// This is not very efficient--for starters we can mark visited
	// scopes and not visit them again.

	linter.on("lint:end", function () {
		_.each(scopes.stack, function (env) {
			_.each(env.uses, function (ranges, name) {
				if (scopes.isDefined(name, env))
					return;

				_.each(ranges, function (range) {
					if (scopes.isStrictMode(env))
						return void linter.report.addError("E009", range);
					linter.report.addWarning("W004", range);
				});
			});
		});
	});
};
