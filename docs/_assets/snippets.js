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

  // Find all code snippet buttons.
  this.snippetButtons = document.querySelectorAll(
    '.snippet-caption .copy-to-clipboard-button');
  this.init();
}

/**
 * Initializes the MaterialComponentsSnippets components.
 */
MaterialComponentsSnippets.prototype.init = function() {
  'use strict';
  [].slice.call(this.snippetButtons).forEach(function(snippetButton) {
    snippetButton.addEventListener('mouseover',
      this.onMouseOverHandler(snippetButton));
    snippetButton.addEventListener('mouseout',
      this.onMouseOutHandler(snippetButton));
    snippetButton.addEventListener('mouseup',
      this.onMouseDownHandler(snippetButton));
    var clippy = snippetButton.querySelectorAll('.clippy');
    if (clippy.length > 0) {
      clippy[0].addEventListener('mouseover',
        this.onMouseOverHandler(snippetButton));
      clippy[0].addEventListener('mouseout',
        this.onMouseOutHandler(snippetButton));
      clippy[0].addEventListener('mouseup',
        this.onMouseDownHandler(snippetButton));
    }
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
  HIGHLIGHTED: 'highlighted',
  COPIED: 'copied'
};

/**
 * Gets the <code> element that is referenced but the given button.
 * @param  {HTMLElement} button The snippet copy button
 * @return {HTMLElement} the code element referenced by the button
 */
MaterialComponentsSnippets.prototype.getCodeElement = function(button) {
  'use strict';

  var href = button.getAttribute('href');
  if (href && href.indexOf('#') >= 0) {
    return document.getElementById(href.split('#')[1]);
  }
  return null;
};

/**
 * Returns a mouseDownHandler for a snippet copy button.
 * @param  {HTMLElement} button the snippet copy button
 * @return {function} the click handler
 */
MaterialComponentsSnippets.prototype.onMouseDownHandler = function(button) {
  'use strict';

  var ctx = this;
  return function() {
    var code = ctx.getCodeElement(button);
    if (code) {
      code.classList.add(ctx.CssClasses_.COPIED);
    }
  };
};

/**
 * Returns a mouseOverHandler for a snippet copy button.
 * @param  {HTMLElement} button the snippet copy button
 * @return {function} the click handler
 */
MaterialComponentsSnippets.prototype.onMouseOverHandler = function(button) {
  'use strict';

  var ctx = this;
  return function() {
    var code = ctx.getCodeElement(button);
    if (code) {
      code.classList.add(ctx.CssClasses_.HIGHLIGHTED);
    }
  };
};

/**
 * Returns a mouseOutHandler for a snippet copy button.
 * @param  {HTMLElement} button the snippet copy button
 * @return {function} the click handler
 */
MaterialComponentsSnippets.prototype.onMouseOutHandler = function(button) {
  'use strict';

  var ctx = this;
  return function() {
    var code = ctx.getCodeElement(button);
    if (code) {
      code.classList.remove(ctx.CssClasses_.HIGHLIGHTED);
      code.classList.remove(ctx.CssClasses_.COPIED);
    }
  };
};

window.addEventListener('load', function() {
  'use strict';

  // Handle the case where Flash is not available.
  if (swfobject && !swfobject.hasFlashPlayerVersion('9.0.0')) {
    document.body.classList.add('no-flash');
  }
  new MaterialComponentsSnippets();
});
