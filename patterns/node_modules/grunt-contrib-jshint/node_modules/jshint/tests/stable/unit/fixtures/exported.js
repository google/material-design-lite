/*global Cat */
/*exported isCat, isDog, cannotBeExported */

function isCat(obj) {
	var unused;
	var isDog;
	
	return obj instanceof Cat;
}

var isDog = function () {};

function unusedDeclaration() {}
var unusedExpression = function () {};

(function () {
	function cannotBeExported() {}
}());