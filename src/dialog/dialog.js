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

 function MaterialDialog(element) {
  'use strict';
  this.element_ = element;
  this.returnValue = '';
}

MaterialDialog.prototype.showInternal_ = function(backdrop) {
  'use strict';
  if (backdrop === undefined) {
    throw Error('You must provide whether or not to show the backdrop.');
  }
  if (this.element_.getAttribute('open') === 'true') {
    return;
  }
  if (backdrop) {
    this.createBackdrop_();
  }
  this.element_.setAttribute('open', true);
};

MaterialDialog.prototype.createBackdrop_ = function() {
  'use strict';
  this.backdropElement_ = document.createElement('div');
  this.backdropElement_.classList.add('mdl-dialog-backdrop');
  document.body.appendChild(this.backdropElement_);
};

MaterialDialog.prototype.show = function() {
  'use strict';
  this.showInternal_(false);
};

MaterialDialog.prototype.showModal = function() {
  'use strict';
  this.showInternal_(true);
};

MaterialDialog.prototype.close = function(returnValue) {
  'use strict';
  this.element_.removeAttribute('open');
  if (this.backdropElement_) {
    document.body.removeChild(this.backdropElement_);
    this.backdropElement_ = undefined;
  }
};

componentHandler.register({
  constructor: MaterialDialog,
  classAsString: 'MaterialDialog',
  cssClass: 'mdl-js-dialog',
  widget: true
});
