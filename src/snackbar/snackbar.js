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

function MaterialSnackbar(element) {
  'use strict';

  this.element_ = element;

  this.init();

}

MaterialSnackbar.prototype.defaults = {
  timeout: 5000,
  actionText: 'Undo'
};

MaterialSnackbar.prototype.cssClasses = {
  message: 'mdl-snackbar__text',
  action: 'mdl-snackbar__action',
  activeSnackbar: 'is-active'
};

MaterialSnackbar.prototype.setTimeout = function(time) {
  'use strict';
  this.timeout_ = parseInt(time);
};

MaterialSnackbar.prototype.setActionText = function(text) {
  'use strict';
  this.actionText_ = text;
};

MaterialSnackbar.prototype.setActionHandler = function(handler) {
  'use strict';
  this.actionHandler_ = handler;
};

MaterialSnackbar.prototype.showNotification = function() {
  'use strict';
  if (this.actionHandler_ === undefined) {
    this.action_.hidden = true;
  } else {
    this.action_.innerText = this.actionText_;
    this.action_.addEventListener('click', this.actionHandler_);
  }
  this.messageArea_.innerText = this.message_;
  this.element.classList.add(this.cssClasses.activeSnackbar);
  setTimeout(this.cleanup, this.timeout_);
};

MaterialSnackbar.prototype.cleanup = function() {
  'use strict';
  this.element.classList.remove(this.cssClasses.activeSnackbar);
  if (this.action.hidden) {
    this.action_.removeAttribute('hidden');
  } else {
    this.action_.innerText = '';
    this.action_.removeEventListener('click', this.actionHandler_);
  }
  this.messageArea_.innerText = '';
  this.setDefaults_();
};

MaterialSnackbar.prototype.setDefaults_ = function() {
  'use strict';
  this.timeout_ = this.element_.dataset.timeout ? this.element_.dataset.timeout : this.defaults.timeout;
  this.actionText_ = this.element_.dataset.actionText ? this.element_.dataset.actionText : this.defaults.actionText;
  this.actionHandler_ = undefined;
  this.message_ = undefined;
};

MaterialSnackbar.prototype.init = function() {
  'use strict';
  this.setDefaults_();
  this.messageArea_ = this.element_.querySelector(this.cssClasses.message);
  this.action_ = this.element_.querySelector(this.cssClasses.action);
};

componentHandler.register({
  constructor: MaterialSnackbar,
  classAsString: 'MaterialSnackbar',
  cssClass: 'mdl-js-snackbar',
  widget: true
});
