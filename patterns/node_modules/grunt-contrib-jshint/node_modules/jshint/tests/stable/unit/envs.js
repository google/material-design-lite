/**
 * Tests for the environmental (browser, jquery, etc.) options
 */

"use strict";

var JSHINT  = require('../../../src/stable/jshint.js').JSHINT;
var fs      = require('fs');
var TestRun = require("../helpers/testhelper").setup.testRun;

function wrap(globals) {
	return '(function () { return [ ' + globals.join(',') + ' ]; }());';
}

function globalsKnown(test, globals, options) {
	JSHINT(wrap(globals), options || {});
	var report = JSHINT.data();

	test.ok(report.implied === undefined);
	test.equal(report.globals.length, globals.length);

	for (var i = 0, g; g = report.globals[i]; i += 1)
		globals[g] = true;

	for (i = 0, g = null; g = globals[i]; i += 1)
		test.ok(g in globals);
}

function globalsImplied(test, globals, options) {
	JSHINT(wrap(globals), options || {});
	var report = JSHINT.data();

	test.ok(report.implieds !== null);
	test.ok(report.globals === undefined);

	var implieds = [];
	for (var i = 0, warn; warn = report.implieds[i]; i += 1)
		implieds.push(warn.name);

	test.equal(implieds.length, globals.length);
}

/*
 * Option `node` predefines Node.js (v 0.5.9) globals
 *
 * More info:
 *	+ http://nodejs.org/docs/v0.5.9/api/globals.html
 */
exports.node = function (test) {
	var globals = [
		"__filename",
		"__dirname",
		"Buffer",
		"DataView",
		"GLOBAL",
		"global",
		"module",
		"process",
		"require",
		"exports",
		"console",
		"setTimeout",
		"clearTimeout",
		"setInterval",
		"clearInterval"
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { node: true });

	// Make sure that the `node` option doesn't conflict with `nomen`
	var asGlobals = [
		'console.log(__dirname);',
		"console.log(__filename);",
	];

	var asProps = [
		'console.log(a.__dirname);',
		'console.log(a.__filename);',
		"console.log(__hello);",
	];

	TestRun(test).test(asGlobals, { node: true, nomen: true });
	TestRun(test)
		.addError(1, "Unexpected dangling '_' in '__dirname'.")
		.addError(2, "Unexpected dangling '_' in '__filename'.")
		.addError(3, "Unexpected dangling '_' in '__hello'.")
		.test(asProps, { node: true, nomen: true });

	// Node environment assumes `globalstrict`
	var globalStrict = [
		'"use strict";',
		"function test() { return; }",
	].join('\n');

	TestRun(test)
		.addError(1, 'Use the function form of "use strict".')
		.test(globalStrict, { strict: true });

	TestRun(test)
		.test(globalStrict, { node: true, strict: true });

	// Don't assume strict:true for Node environments. See bug GH-721.
	TestRun(test)
		.test("function test() { return; }", { node: true });

	// Make sure that we can do fancy Node export

	var overwrites = [
		"Buffer = {};",
		"exports = module.exports = {};"
	];

	TestRun(test)
		.addError(1, "Read only.")
		.test(overwrites, { node: true });

	test.done();
};

/** Option `jquery` predefines jQuery globals */
exports.jquery = function (test) {
	var globals = ['jQuery', "$"];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { jquery: true });

	test.done();
};

/** Option `couch` predefines CouchDB globals */
exports.couch = function (test) {
	var globals = [
		"require",
		"respond",
		"getRow",
		"emit",
		"send",
		"start",
		"sum",
		"log",
		"exports",
		"module",
		"provides"
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { couch: true });

	test.done();
};

/** Option `prototypejs` predefines Prototype.js and Scriptaculous globals */
exports.prototypejs = function (test) {
	var globals = [
		"$",
		"$$",
		"$A",
		"$F",
		"$H",
		"$R",
		"$break",
		"$continue",
		"$w",
		"Abstract",
		"Ajax",
		"Class",
		"Enumerable",
		"Element",
		"Event",
		"Field",
		"Form",
		"Hash",
		"Insertion",
		"ObjectRange",
		"PeriodicalExecuter",
		"Position",
		"Prototype",
		"Selector",
		"Template",
		"Toggle",
		"Try",
		"Autocompleter",
		"Builder",
		"Control",
		"Draggable",
		"Draggables",
		"Droppables",
		"Effect",
		"Sortable",
		"SortableObserver",
		"Sound",
		"Scriptaculous"
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { prototypejs: true });

	test.done();
};

/**
 * Option `devel` predefines global functions used for development
 * (console, alert, etc.)
 */
exports.devel = function (test) {
	var globals = [
		"alert",
		"confirm",
		"console",
		"Debug",
		"opera",
		"prompt"
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { devel: true });

	test.done();
};

/*
 * Option `browser` predefines globals usually found in browser environments.
 * In addition to stuff like window, setInterval,.. it also supports some
 * more or less stable HTML5 variables like FileReader, localStorage,..
 * and typed arrays like Int32Array, Uint32Array, etc.
 *
 * More info:
 *	+ HTML5: http://www.html5rocks.com/
 *	+ Typed arrays: https://developer.mozilla.org/en/JavaScript_typed_arrays
 */
exports.browser = function (test) {
	var globals = [
		"ArrayBuffer",
		"ArrayBufferView",
		"Audio",
		"Blob",
		"addEventListener",
		"applicationCache",
		"blur",
		"clearInterval",
		"clearTimeout",
		"close",
		"closed",
		"DataView",
		"defaultStatus",
		"document",
		"event",
		"Element",
		"FileReader",
		"Float32Array",
		"Float64Array",
		"FormData",
		"focus",
		"frames",
		"getComputedStyle",
		"history",
		"HTMLElement",
		"HTMLAnchorElement",
		"HTMLBaseElement",
		"HTMLBlockquoteElement",
		"HTMLBodyElement",
		"HTMLBRElement",
		"HTMLButtonElement",
		"HTMLCanvasElement",
		"HTMLDirectoryElement",
		"HTMLDivElement",
		"HTMLDListElement",
		"HTMLFieldSetElement",
		"HTMLFontElement",
		"HTMLFormElement",
		"HTMLFrameElement",
		"HTMLFrameSetElement",
		"HTMLHeadElement",
		"HTMLHeadingElement",
		"HTMLHRElement",
		"HTMLHtmlElement",
		"HTMLIFrameElement",
		"HTMLImageElement",
		"HTMLInputElement",
		"HTMLIsIndexElement",
		"HTMLLabelElement",
		"HTMLLayerElement",
		"HTMLLegendElement",
		"HTMLLIElement",
		"HTMLLinkElement",
		"HTMLMapElement",
		"HTMLMenuElement",
		"HTMLMetaElement",
		"HTMLModElement",
		"HTMLObjectElement",
		"HTMLOListElement",
		"HTMLOptGroupElement",
		"HTMLOptionElement",
		"HTMLParagraphElement",
		"HTMLParamElement",
		"HTMLPreElement",
		"HTMLQuoteElement",
		"HTMLScriptElement",
		"HTMLSelectElement",
		"HTMLStyleElement",
		"HTMLTableCaptionElement",
		"HTMLTableCellElement",
		"HTMLTableColElement",
		"HTMLTableElement",
		"HTMLTableRowElement",
		"HTMLTableSectionElement",
		"HTMLTextAreaElement",
		"HTMLTitleElement",
		"HTMLUListElement",
		"HTMLVideoElement",
		"Int16Array",
		"Int32Array",
		"Int8Array",
		"Image",
		"length",
		"localStorage",
		"location",
		"MessageChannel",
		"MessageEvent",
		"MessagePort",
		"moveBy",
		"moveTo",
		"MutationObserver",
		"name",
		"Node",
		"NodeFilter",
		"navigator",
		"onbeforeunload",
		"onblur",
		"onerror",
		"onfocus",
		"onload",
		"onresize",
		"onunload",
		"open",
		"openDatabase",
		"opener",
		"Option",
		"parent",
		"print",
		"removeEventListener",
		"resizeBy",
		"resizeTo",
		"screen",
		"scroll",
		"scrollBy",
		"scrollTo",
		"SharedWorker",
		"sessionStorage",
		"setInterval",
		"setTimeout",
		"status",
		"top",
		"Uint16Array",
		"Uint32Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"WebSocket",
		"window",
		"Worker",
		"XMLHttpRequest",
		"XPathEvaluator",
		"XPathException",
		"XPathExpression",
		"XPathNamespace",
		"XPathNSResolver",
		"XPathResult",
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { browser: true });

	test.done();
};

exports.rhino = function (test) {
	var globals = [
		'defineClass',
		"deserialize",
		"gc",
		"help",
		"importPackage",
		"java",
		"load",
		"loadClass",
		"print",
		"quit",
		"readFile",
		"readUrl",
		"runCommand",
		"seal",
		"serialize",
		"spawn",
		"sync",
		"toint32",
		"version"
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { rhino: true });

	test.done();
};

exports.wsh = function (test) {
	var globals = [
		'ActiveXObject',
		"Enumerator",
		"GetObject",
		"ScriptEngine",
		"ScriptEngineBuildVersion",
		"ScriptEngineMajorVersion",
		"ScriptEngineMinorVersion",
		"VBArray",
		"WSH",
		"WScript",
		"XDomainRequest"
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { wsh: true });

	test.done();
};

exports.es5 = function (test) {
	var src = fs.readFileSync(__dirname + "/fixtures/es5.js", "utf8");

	TestRun(test)
		.addError(3, "Extra comma. (it breaks older versions of IE)")
		.addError(8, "Extra comma. (it breaks older versions of IE)")
		.addError(15, "get/set are ES5 features.")
		.addError(16, "get/set are ES5 features.")
		.addError(20, "get/set are ES5 features.")
		.addError(22, "get/set are ES5 features.")
		.addError(26, "get/set are ES5 features.")
		.addError(30, "get/set are ES5 features.")
		.addError(31, "get/set are ES5 features.")
		.addError(36, "get/set are ES5 features.")
		.addError(41, "get/set are ES5 features.")
		.addError(42, "get/set are ES5 features.")
		.addError(43, "Duplicate key 'x'.")
		.addError(47, "get/set are ES5 features.")
		.addError(48, "get/set are ES5 features.")
		.addError(48, "Duplicate key 'x'.")
		.addError(52, "get/set are ES5 features.")
		.addError(53, "get/set are ES5 features.")
		.addError(54, "get/set are ES5 features.")
		.addError(54, "Duplicate key 'x'.")
		.addError(58, "get/set are ES5 features.")
		.addError(58, "Unexpected parameter 'a' in get x function.")
		.addError(59, "get/set are ES5 features.")
		.addError(59, "Unexpected parameter 'a' in get y function.")
		.addError(60, "get/set are ES5 features.")
		.addError(62, "get/set are ES5 features.")
		.addError(62, "Expected a single parameter in set x function.")
		.addError(63, "get/set are ES5 features.")
		.addError(64, "get/set are ES5 features.")
		.addError(64, "Expected a single parameter in set z function.")
		.addError(68, "get/set are ES5 features.")
		.addError(69, "get/set are ES5 features.")
		.addError(68, "Missing property name.")
		.addError(69, "Missing property name.")
		.addError(75, "get/set are ES5 features.")
		.addError(76, "get/set are ES5 features.")
		.test(src);

	TestRun(test)
		.addError(36, "Setter is defined without getter.")
		.addError(43, "Duplicate key 'x'.")
		.addError(48, "Duplicate key 'x'.")
		.addError(54, "Duplicate key 'x'.")
		.addError(58, "Unexpected parameter 'a' in get x function.")
		.addError(59, "Unexpected parameter 'a' in get y function.")
		.addError(62, "Expected a single parameter in set x function.")
		.addError(64, "Expected a single parameter in set z function.")
		.addError(68, "Missing property name.")
		.addError(69, "Missing property name.")
		.test(src, { es5: true });

	// Make sure that JSHint parses getters/setters as function expressions
	// (https://github.com/jshint/jshint/issues/96)
	src = fs.readFileSync(__dirname + "/fixtures/es5.funcexpr.js", "utf8");
	TestRun(test).test(src, { es5: true });

	test.done();
};

exports.mootools = function (test) {
	var globals = [
		'$',
		"$$",
		"Asset",
		"Browser",
		"Chain",
		"Class",
		"Color",
		"Cookie",
		"Core",
		"Document",
		"DomReady",
		"DOMReady",
		"DOMEvent",
		"Drag",
		"Element",
		"Elements",
		"Event",
		"Events",
		"Fx",
		"Group",
		"Hash",
		"HtmlTable",
		"Iframe",
		"IframeShim",
		"InputValidator",
		"instanceOf",
		"Keyboard",
		"Locale",
		"Mask",
		"MooTools",
		"Native",
		"Options",
		"OverText",
		"Request",
		"Scroller",
		"Slick",
		"Slider",
		"Sortables",
		"Spinner",
		"Swiff",
		"Tips",
		"Type",
		"typeOf",
		"URI",
		"Window"
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { mootools: true });

	test.done();
};

exports.dojo = function (test) {
	var globals = [
		'dojo',
		'dijit',
		'dojox',
		'define',
		"require",
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { dojo: true });

	test.done();
};

exports.nonstandard = function (test) {
	var globals = [
		'escape',
		"unescape",
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { nonstandard: true });

	test.done();
};

/*
 * By default JSHint supports all globals provided by the ECMAScript 5.1 specification.
 *
 * More info:
 *	+ http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
 */
exports.standard = function (test) {
	var globals = [
		'Array',
		'Boolean',
		'Date',
		'decodeURI',
		'decodeURIComponent',
		'encodeURI',
		'encodeURIComponent',
		'Error',
		'EvalError',
		'Function',
		'hasOwnProperty',
		'isFinite',
		'isNaN',
		'JSON',
		'Map',
		'Math',
		'Number',
		'Object',
		'parseInt',
		'parseFloat',
		'RangeError',
		'ReferenceError',
		'RegExp',
		'Set',
		'String',
		'SyntaxError',
		'TypeError',
		'URIError',
		"WeakMap",
	];

	globalsKnown(test, globals); // You don't need any option to recognize standard globals

	test.done();
};

exports.worker = function (test) {
	var globals = [
		'importScripts',
		'postMessage',
		"self",
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { worker: true });

	test.done();
};

exports.yui = function (test) {
	var globals = [
		'YUI',
		'Y',
		"YUI_config",
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { yui: true });

	test.done();
};

exports.phantom = function (test) {
	var globals = [
		'phantom',
		'require',
		'WebPage',
	];

	globalsImplied(test, globals);
	globalsKnown(test, globals, { phantom: true });

	test.done();
};
