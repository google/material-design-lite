var i = 5;

try {
    var u = "I'm trying here!";
} catch (e) {
    var w = "Let's play catch.";
}

alert("i:" + i);
alert("u:" + u);
alert("w:" + w);

function test() {
    var w;

    try {
        alert("Hello.");
    } catch (e) {
        var w = "What's up?";
    }

    alert("w:" + w);
}
