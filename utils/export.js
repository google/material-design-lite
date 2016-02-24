/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Allows for automatic exporting of properties with Closure Compiler.
// Copied from the Closure Compiler library source, with modifications.
var goog = {};
goog.global = this;

/**
 * Export a symbol with Closure compiler.
 * @param {string} name Unobfuscated name to export.
 * @param {*} opt_object Object the name should point to.
 * @param {Object=} opt_objectToExportTo The object to add the path to.
 */
goog.exportSymbol = function(name, opt_object, opt_objectToExportTo) {
  'use strict';

  var parts = name.split('.');
  var cur = opt_objectToExportTo || goog.global;

  // Parentheses added to eliminate strict JS warning in Firefox.
  for (var part; parts.length && (part = parts.shift());) {
    if (!parts.length && opt_object !== undefined) {
      // last part and we have an object; use it
      cur[part] = opt_object;
    } else if (cur[part]) {
      cur = cur[part];
    } else {
      cur = cur[part] = {};
    }
  }
};

/**
 * Export a property with Closure compiler.
 * @param {Object} object Object whose static property is being exported.
 * @param {string} name Unobfuscated name to export.
 * @param {*} symbol Object the name should point to.
 */
goog.exportProperty = function(object, name, symbol) {
  'use strict';

  object[name] = symbol;
};
