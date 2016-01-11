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

(function() {
  'use strict';

  /**
   * Class constructor for Dialog MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
  var MaterialDialog = function MaterialDialog(element) {
    this.element_ = element;
  };
  window['MaterialDialog'] = MaterialDialog;

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  MaterialDialog.prototype.cssClasses_ = {
    BACKDROP: 'mdl-dialog-backdrop'
  };

  /**
  * Internal method for showing the dialog.
  *
  * @private
  */
  MaterialDialog.prototype.showInternal_ = function(backdrop) {
    if (backdrop === undefined) {
      throw Error('You must provide whether or not to show the backdrop.');
    }
    if (this.element_.hasAttribute('open')) {
      return;
    }
    if (backdrop) {
      this.createBackdrop_();
    }
    this.element_.setAttribute('open', true);
  };

  /**
  * Internal method to create a modal backdrop.
  *
  * @private
  */
  MaterialDialog.prototype.createBackdrop_ = function() {
    this.backdropElement_ = document.createElement('div');
    this.backdropElement_.classList.add(this.cssClasses_.BACKDROP);
    document.body.appendChild(this.backdropElement_);
  };

  /**
  * Show the dialog.
  *
  * @public
  */
  MaterialDialog.prototype.show = function() {
    this.showInternal_(false);
  };
  MaterialDialog.prototype['show'] = MaterialDialog.prototype.show;

  /**
  * Show the dialog as a modal.
  *
  * @public
  */
  MaterialDialog.prototype.showModal = function() {
    this.showInternal_(true);
  };
  MaterialDialog.prototype['showModal'] = MaterialDialog.prototype.showModal;

  /**
  * Close the dialog.
  *
  * @public
  */
  MaterialDialog.prototype.close = function() {
    this.element_.removeAttribute('open');
    if (this.backdropElement_) {
      document.body.removeChild(this.backdropElement_);
      this.backdropElement_ = undefined;
    }
  };
  MaterialDialog.prototype['close'] = MaterialDialog.prototype.close;

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: MaterialDialog,
    classAsString: 'MaterialDialog',
    cssClass: 'mdl-js-dialog',
    widget: true
  });
}());
