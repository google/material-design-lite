module.exports = function showUsage(knownOpts, shortHands /*, description1, description2, ... */){
  var descriptions = Array.prototype.slice.call(arguments, 2, arguments.length),
    knownOptsMaxLen = maxLength(Object.keys(knownOpts)),
    shortHands2 = {},
    SPACE = 4;

  // create a shortHands object with the long name as key.
  Object.keys(shortHands).forEach(function(key){
    var value = Array.isArray(shortHands[key]) ? shortHands[key][0] : shortHands[key];
    var option = value.replace('--', '');
    shortHands2[option] = shortHands2[option] || [];
    shortHands2[option].push(key);
  });

  // we can have severals shorthands for one option
  var shortHandsMaxLength = values(shortHands2).reduce(function(a, b){
    a = Array.isArray(a) ? a.join(', -').length : a;
    b = Array.isArray(b) ? b.join(', -').length : b;
    return ( a > b) ? a : b;
  });

  // start by writing all known options
  var out = {};
  Object.keys(knownOpts).forEach(function(key){
    var shorts = shortHands2[key] ? ', -' + shortHands2[key].join(', -') : '';
    var cmd = rpad('', SPACE) + '--' + key + shorts;
    out[key] = rpad(cmd, knownOptsMaxLen + shortHandsMaxLength + 5 + 2 * SPACE);
  });

  // then write all the descriptions
  descriptions.forEach(function(description){
    var descriptionMaxLen = maxLength(values(description));
    Object.keys(knownOpts).forEach(function(key){
      var value = '' + (description[key] !== undefined ? description[key] : '');
      out[key] += rpad(value, descriptionMaxLen + SPACE);
    });
  });

  return values(out).join('\n');
};

// string right padding helper
function rpad(str, length) {
  while (str.length < length)
      str = str + ' ';
  return str;
}

// Object.values
function values(o){
  return Object.keys(o).map(function(k){ return o[k]; });
}

// Return the max length of an array of string.
function maxLength(arr){
  return arr.map(function(str){
    return ('' + str).length;
  }).reduce(function(a,b){ 
    return ( a > b ) ? a : b;
  });
}
