undef(); // this line will generate a warning
if (typeof undef) {} // this line won't because typeof accepts a reference
                     // even when the base object of that reference is null

if (typeof undef['attr' + 0]) {
    delete undef['attr' + 0];
}
if (typeof undef.attr) {
    delete undef.attr;
}

var fn = function () {
    localUndef();

    if (typeof localUndef)
        return;

    if (typeof localUndef['attr' + 0]) {
        delete localUndef['attr' + 0];
    }
    if (typeof localUndef.attr) {
        delete localUndef.attr;
    }
};
