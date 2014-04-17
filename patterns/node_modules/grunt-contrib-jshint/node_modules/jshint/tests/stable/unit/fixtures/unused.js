var a = 1;
var b = 2;

b += 1;

function main(e, f) {
    var c = 3;
    var d = 4;

    return d - e;
}

main(b);

function foo(err, cb) {
    main();
    cb();
}

function bar(g, h) {
	//jshint unused:false, es5:true
	var i = 1;
	var char;
	char = 1;
	return h;
}