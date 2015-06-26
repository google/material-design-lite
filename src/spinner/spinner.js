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
 * Class constructor for Spinner MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 * @constructor
 */
function MaterialSpinner(element) {
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
MaterialSpinner.prototype.Constant_ = {
  MDL_SPINNER_LAYER_COUNT: 4
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialSpinner.prototype.CssClasses_ = {
  MDL_SPINNER_LAYER: 'mdl-spinner__layer',
  MDL_SPINNER_CIRCLE_CLIPPER: 'mdl-spinner__circle-clipper',
  MDL_SPINNER_CIRCLE: 'mdl-spinner__circle',
  MDL_SPINNER_GAP_PATCH: 'mdl-spinner__gap-patch',
  MDL_SPINNER_LEFT: 'mdl-spinner__left',
  MDL_SPINNER_RIGHT: 'mdl-spinner__right'
};

/**
* Auxiliary method to create a spinner layer.
*/
MaterialSpinner.prototype.createLayer = function(index) {
  'use strict';

  var layer = document.createElement('div');
  layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER);
  layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + '-' + index);

  var leftClipper = document.createElement('div');
  leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
  leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);

  var gapPatch = document.createElement('div');
  gapPatch.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);

  var rightClipper = document.createElement('div');
  rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
  rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);

  var circleOwners = [leftClipper, gapPatch, rightClipper];

  for (var i = 0; i < circleOwners.length; i++) {
    var circle = document.createElement('div');
    circle.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE);
    circleOwners[i].appendChild(circle);
  }

  layer.appendChild(leftClipper);
  layer.appendChild(gapPatch);
  layer.appendChild(rightClipper);

  this.element_.appendChild(layer);
};

/**
* Stops the spinner animation.
* Public method for users who need to stop the spinner for any reason.
* @public
*/
MaterialSpinner.prototype.stop = function() {
  'use strict';

  this.element_.classList.remove('is-active');
};

/**
* Starts the spinner animation.
* Public method for users who need to manually start the spinner for any reason
* (instead of just adding the 'is-active' class to their markup).
* @public
*/
MaterialSpinner.prototype.start = function() {
  'use strict';

  this.element_.classList.add('is-active');
};

/**
 * Initialize element.
 */
MaterialSpinner.prototype.init = function() {
  'use strict';

  if (this.element_) {
    for (var i = 1; i <= this.Constant_.MDL_SPINNER_LAYER_COUNT; i++) {
      this.createLayer(i);
    }

    this.element_.classList.add('is-upgraded');
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialSpinner,
  classAsString: 'MaterialSpinner',
  cssClass: 'mdl-js-spinner'
});
