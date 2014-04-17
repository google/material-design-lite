/*
 * matchdep
 * https://github.com/tkellen/node-matchdep
 *
 * Copyright (c) 2012 Tyler Kellen
 * Licensed under the MIT license.
 */

'use strict';

var globule = require('globule');
var findup = require('findup-sync');
var resolve = require('resolve').sync;
var stackTrace = require('stack-trace');
var path = require('path');

// export object
var matchdep = module.exports = {};

// Ensure configuration has the correct properties.
function loadConfig(config, props) {
  // The calling module's path. Unfortunately, because modules are cached,
  // module.parent is the FIRST calling module parent, not necessarily the
  // current one.
  var callerPath = path.dirname(stackTrace.get(loadConfig)[1].getFileName());

  // If no config defined, resolve to nearest package.json to the calling lib.
  if (config == null) {
    config = findup('package.json', {cwd: callerPath});
  }
  // If filename was specified with no path parts, make the path absolute so
  // that resolve doesn't look in node_module directories for it.
  else if (typeof config === 'string' && !/[\\\/]/.test(config)) {
    config = path.join(callerPath, config);
  }

  // If package is a string, try to require it.
  if (typeof config === 'string') {
    config = require(resolve(config, {basedir: callerPath}));
  }

  // If config is not an object yet, something is amiss.
  if (typeof config !== 'object') {
    throw new Error('Invalid configuration specified.');
  }

  // For all specified props, populate result object.
  var result = {};
  props.forEach(function(prop) {
    result[prop] = config[prop] ? Object.keys(config[prop]) : [];
  });
  return result;
}

// What config properties should each method search?
var methods = {
  filter: ['dependencies'],
  filterDev: ['devDependencies'],
  filterPeer: ['peerDependencies'],
  filterAll: ['dependencies', 'devDependencies', 'peerDependencies'],
};

// Dynamically generate methods.
Object.keys(methods).forEach(function(method) {
  var props = methods[method];
  matchdep[method] = function(pattern, config) {
    config = loadConfig(config, props);
    var search = props.reduce(function(result, prop) {
      return result.concat(config[prop]);
    }, []);
    return globule.match(pattern, search);
  };
});
