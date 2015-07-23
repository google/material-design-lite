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

/**
 * Class constructor for Progress MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialProgress(element) {
  'use strict';

  this.element_ = element;

  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialProgress.prototype.Constant_ = {
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialProgress.prototype.CssClasses_ = {
  INDETERMINATE_CLASS: 'mdl-progress__indeterminate'
};

MaterialProgress.prototype.setProgress = function(p) {
  'use strict';

  if (this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)) {
    return;
  }

  this.progressbar_.style.width = p + '%';
};

MaterialProgress.prototype.setBuffer = function(p) {
  'use strict';

  this.bufferbar_.style.width = p + '%';
  this.auxbar_.style.width = (100 - p) + '%';
};

/**
 * Initialize element.
 */
MaterialProgress.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var el = document.createElement('div');
    el.className = 'progressbar bar bar1';
    this.element_.appendChild(el);
    this.progressbar_ = el;

    el = document.createElement('div');
    el.className = 'bufferbar bar bar2';
    this.element_.appendChild(el);
    this.bufferbar_ = el;

    el = document.createElement('div');
    el.className = 'auxbar bar bar3';
    this.element_.appendChild(el);
    this.auxbar_ = el;

    this.progressbar_.style.width = '0%';
    this.bufferbar_.style.width = '100%';
    this.auxbar_.style.width = '0%';

    this.element_.classList.add('is-upgraded');
  }
};

/*
* Downgrade the component
*/
MaterialProgress.prototype.mdlDowngrade_ = function() {
  'use strict';
  while (this.element_.firstChild) {
    this.element_.removeChild(this.element_.firstChild);
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialProgress,
  classAsString: 'MaterialProgress',
  cssClass: 'mdl-js-progress',
  widget: true
});
