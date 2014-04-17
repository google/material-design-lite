/**
 * Temporary - The lord of tmp.
 * 
 * Author: Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License.
 */
 
/**
 * Detection stolen from NPM (https://github.com/isaacs/npm/)
 * 
 * Copyright 2009, 2010, 2011 Isaac Z. Schlueter (the "Author")
 * MIT License (https://github.com/isaacs/npm/blob/master/LICENSE)
 */ 

/**
 * Detector namespace.
 * 
 * @type {Object}
 */
var detector = module.exports;

var normalize = function(path) {
  var last = path[path.length - 1];
  
  if (detector.platform() !== "win32") {
    if (last !== '/') {
      path += '/';
    }
  } else {
    //This is fine b/c Windows will 
    //correctly resolve filepaths with additional slashes
    //and it is not correct to assume that on Windows the value
    //of path will be a string that terminates in '\'.
    //
    //See: http://stackoverflow.com/questions/4158597/extra-slashes-in-path-variable-of-file-copy-or-directory-createdirectory-met
    //
    path += '/';
  }
  
  return path;
}

/**
 * Returns tmp dir. Thank you npm.
 * 
 * @returns {String} tmp dir.
 */
detector.tmp = function() {
  var temp = process.env.TMPDIR
      || process.env.TMP
      || process.env.TEMP
      || (detector.platform() === "win32" ? "c:\\windows\\temp\\" : "/tmp/")
  
  return normalize(temp);
};

/**
 * Returns the platform. Allows Tests to verify all behaviors.
 *
 * @returns {String} platform.
 */
detector.platform = function() {
  return process.platform;
};

detector._normalize = normalize;
