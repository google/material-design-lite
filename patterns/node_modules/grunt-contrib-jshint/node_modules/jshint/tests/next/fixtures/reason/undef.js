var one;

function test(a, b) {
	two = 2; // W
}

three = 2; // W
four.five = 4; // W
one.two;
one["two"];
test();

// This line shouldn't generate a warning because
// typeof accepts a reference even when the base
// object of that reference is null.
if (typeof undef) {}

if (typeof undef['attr' + 0]) {
	delete undef['attr' + 0];
}

if (typeof undef.attr) {
	delete undef.attr;
}

var fn = function () {
	localUndef(); // W

	if (typeof localUndef)
		return;
};

lateFn();
function lateFn() {
	fn(a);
	var a;
}

function strictundef() {
	"use strict";
	zz();
}
