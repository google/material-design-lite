// should complain
Object.prototype.forIn = function () {};

// should complain
Array.prototype.myName = "Mr. Array";

// should complain
Number.prototype = {
	toString: function() {
		return "42";
	}
};

// no worries
function Awesome() {};
Awesome.prototype.forEvery = function (fn) {};

// no worries
function SoCool() {};
SoCool.prototype = {
	isGreat: true
};


