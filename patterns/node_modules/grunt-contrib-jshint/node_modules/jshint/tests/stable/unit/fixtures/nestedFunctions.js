// non-nested function with non-standard ending curly placement
function a(x, y) {
	return x+y;
   }

// regular nested function
function b() {
	function c() {
		return 1+1;
	}
	return c();
}

// anonymous nested function with params
function d() {
	var e = function (x, y) {
		return x+y;
	};
	return e;
}

// anonymous nested function in parens
function f() {
	(function () {
		return 1+1;
	})();
}

// all on one line with non-standard parenthesis placement
function g() { return function h     () { return 1+1; };}

// function in object
var i = {
	j : function () { return 1+1; }
};
