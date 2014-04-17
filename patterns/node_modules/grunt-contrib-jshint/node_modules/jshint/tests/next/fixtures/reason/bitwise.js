var a = 1;
var b = 2;
var c;

c = a | b;
c = a & b;
c = a ^ b;
c = ~a;
c = a << b;
c = a >> b;
c = a >>> b;

// Shouldn't warn (safe operators)
c = c + b;
c = c - b;
c = c / b;
c = c * b;

// Shouldn't warn (logical operators)
c = a || b;
c = a && b;
