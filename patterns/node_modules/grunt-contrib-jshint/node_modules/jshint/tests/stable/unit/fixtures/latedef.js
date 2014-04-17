fn();
function fn() {}

(function () {
    fn1();
    function fn1() {}
}());

if (!vr) {
    var vr = 'o_O';
}

function foo() {
  return {
    bar: function() {return bar();}
  };

  function bar() {
    return 10;
  }
}
