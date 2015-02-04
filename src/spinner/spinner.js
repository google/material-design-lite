/**
 * Class constructor for Spinner WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
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
  WSK_SPINNER_LAYER_COUNT: 4
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialSpinner.prototype.CssClasses_ = {
  WSK_SPINNER_LAYER: 'wsk-spinner__layer',
  WSK_SPINNER_CIRCLE_CLIPPER: 'wsk-spinner__circle-clipper',
  WSK_SPINNER_CIRCLE: 'wsk-spinner__circle',
  WSK_SPINNER_GAP_PATCH: 'wsk-spinner__gap-patch',
  WSK_SPINNER_LEFT: 'wsk-spinner__left',
  WSK_SPINNER_RIGHT: 'wsk-spinner__right'
};

/**
* Auxiliary method to create a spinner layer.
*/
MaterialSpinner.prototype.createLayer = function(index) {
  'use strict';

  var layer = document.createElement('div');
  layer.classList.add(this.CssClasses_.WSK_SPINNER_LAYER);
  layer.classList.add(this.CssClasses_.WSK_SPINNER_LAYER + '-' + index);

  var leftClipper = document.createElement('div');
  leftClipper.classList.add(this.CssClasses_.WSK_SPINNER_CIRCLE_CLIPPER);
  leftClipper.classList.add(this.CssClasses_.WSK_SPINNER_LEFT);

  var gapPatch = document.createElement('div');
  gapPatch.classList.add(this.CssClasses_.WSK_SPINNER_GAP_PATCH);

  var rightClipper = document.createElement('div');
  rightClipper.classList.add(this.CssClasses_.WSK_SPINNER_CIRCLE_CLIPPER);
  rightClipper.classList.add(this.CssClasses_.WSK_SPINNER_RIGHT);

  var circleOwners = [leftClipper, gapPatch, rightClipper];

  for (var i = 0; i < circleOwners.length; i++) {
    var circle = document.createElement('div');
    circle.classList.add(this.CssClasses_.WSK_SPINNER_CIRCLE);
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

  this.element_.classlist.remove('is-active');
};

/**
* Starts the spinner animation.
* Public method for users who need to manually start the spinner for any reason
* (instead of just adding the 'is-active' class to their markup).
* @public
*/
MaterialSpinner.prototype.start = function() {
  'use strict';

  this.element_.classlist.add('is-active');
};

/**
 * Initialize element.
 */
MaterialSpinner.prototype.init = function() {
  'use strict';

  if (this.element_) {
    for (var i = 1; i <= this.Constant_.WSK_SPINNER_LAYER_COUNT; i++) {
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
  cssClass: 'wsk-js-spinner'
});
