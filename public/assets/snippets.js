/**
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

function MaterialComponentsSnippets() {
  'use strict';

  // Find all code snippets.
  this.snippets = document.querySelectorAll('code.language-markup');
  this.init();
}

/**
 * Initializes the MaterialComponentsSnippets components.
 */
MaterialComponentsSnippets.prototype.init = function() {
  'use strict';

  [].slice.call(this.snippets).forEach(function(snippet) {
    snippet.addEventListener('click', this.onMouseClickHandler(snippet));
    snippet.addEventListener('mouseout', this.onMouseOutHandler(snippet));
  }, this);
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialComponentsSnippets.prototype.CssClasses_ = {
  COPIED: 'copied',
  NOT_SUPPORTED: 'nosupport'
};

/**
 * Copies content of a <code> element into the system clipboard.
 * Not all browsers may be supported. See the following for details:
 * http://caniuse.com/clipboard
 * https://developers.google.com/web/updates/2015/04/cut-and-copy-commands
 * @param  {HTMLElement} snippet The <code> element containing the snippet code
 * @return {bool} whether the copy operation is succeeded
 */
MaterialComponentsSnippets.prototype.copyToClipboard = function(snippet) {
  'use strict';

  var sel = window.getSelection();
  var snipRange = document.createRange();
  snipRange.selectNodeContents(snippet);
  sel.removeAllRanges();
  sel.addRange(snipRange);
  var res = false;
  try {
    res = document.execCommand('copy');
  } catch (err) {
    // copy command is not available
    console.error(err);
  }
  sel.removeAllRanges();
  return res;
};

/**
 * Returns a mouseClickHandler for a snippet <code> element.
 * @param  {HTMLElement} snippet The <code> element containing the snippet code
 * @return {function} the click handler
 */
MaterialComponentsSnippets.prototype.onMouseClickHandler = function(snippet) {
  'use strict';

  return function() {
    if (window.getSelection().toString().length > 0) {
      // user has selected some text manually
      // don't do anything
      return;
    }
    var cls = this.CssClasses_.COPIED;
    if (!this.copyToClipboard(snippet)) {
      cls = this.CssClasses_.NOT_SUPPORTED;
    }
    snippet.classList.add(cls);
  }.bind(this);
};

/**
 * Returns a mouseOutHandler for a snippet <code> element.
 * @param  {HTMLElement} snippet The <code> element containing the snippet code
 * @return {function} the click handler
 */
MaterialComponentsSnippets.prototype.onMouseOutHandler = function(snippet) {
  'use strict';

  return function() {
    snippet.classList.remove(this.CssClasses_.COPIED);
  }.bind(this);
};

window.addEventListener('load', function() {
  'use strict';

  new MaterialComponentsSnippets();
});
