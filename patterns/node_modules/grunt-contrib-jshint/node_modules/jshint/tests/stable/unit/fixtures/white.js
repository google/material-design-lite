function hello () {
    return true ;
}

var bye = function() {
    if(hey){
        // Next two lines have a trailing whitespace
        return; 
    } 
};

try {
    var other = {
        a: true ,
        b :false
    };
}    catch    ( ex )    { // no errors thrown
    if ( ex ) {           // errors
    }
}

function test2(a, b, c, d) {
  /*jshint indent: 2, white: true, curly: false*/
  if (a) {
    return;
  }
  if (a)
    return;
  if (b) return;
  if (c) return;
  if (d)
    return;
  for (;;)
    return;
  for (;;) return;
  while (a) return;
  while (a)
    return 2;
}

/*fix for indentation on single-line blocks*/
var name1 = (function () { var x = 2; return 'Anton'; }());

/*unfortunately (as a side effect), this is also allowed*/
var name2 = (function () { var x = 2;
                            return 'Anton';
                        }());

// Make sure that comments inside a function's parameters
// don't count towards `unexpected space` warnings.
function inspectPrefiltersOrTransports(dataType/* internal */, inspected /* internal */) {
    return 2;
}

var a,b,
    c = 1< 2,
    d = 1 < 2,
    e = a . b
        .
        c(
);
 var z;

function nodblwarnings ( ) {
    return 1;
}
