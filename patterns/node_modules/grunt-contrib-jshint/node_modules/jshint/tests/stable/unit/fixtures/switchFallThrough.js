switch (foo) {
case 1:
    doSomething();
case 2:
    doSomething();
}

switch (foo) {
case 1:
    doSomething();
    /* falls through */
case 2:
    doSomething();
}

switch (foo) {
case 1:
case 2:
default:
    doSomething();
}

switch (foo) {
case 1:
    /* falls through */
case 2:
    /* falls through */
default:
    doSomething();
}

(function () {
    switch (foo) {
    case 1:
        return; // Return is a valid alternative to break;
    case 2:: // doubled colon (fix)
    case 3:
        return;
    }
}());