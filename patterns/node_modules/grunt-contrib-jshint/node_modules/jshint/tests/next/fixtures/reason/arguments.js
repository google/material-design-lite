function print() {
}

function doarg() {
	print(arguments.callee);
	print(arguments.caller);
	print(arguments.length);
	print(arguments);
}

print(arguments.callee);
print(arguments.caller);
print(arguments.length);
print(arguments);

function doarg2() {
	print(arguments["callee"]);
	print(arguments["caller"]);
	print(arguments["length"]);
	print(arguments);
}

function strictarg() {
	"use strict";

	print(arguments.callee);
	print(arguments["callee"]);
}
