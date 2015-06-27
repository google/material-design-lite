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
  this.active = false;
  this.init();

}

MaterialSnackbar.prototype.defaults = {
  timeout: 8000
};

MaterialSnackbar.prototype.cssClasses = {
  snackbar: 'mdl-snackbar',
  message: 'mdl-snackbar__text',
  action: 'mdl-snackbar__action',
  activeSnackbar: 'is-active'
};

MaterialSnackbar.prototype.queuedNotifications = [];

MaterialSnackbar.prototype.setMessage = function(text) {
  'use strict';
  this.message_ = text;
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

MaterialSnackbar.prototype.createSnackbar = function() {
  'use strict';
  this.snackbarElement_ = document.createElement('div');
  this.textElement_ = document.createElement('div');
  this.snackbarElement_.classList.add(this.cssClasses.snackbar);
  this.textElement_.classList.add(this.cssClasses.message);
  this.snackbarElement_.appendChild(this.textElement_);
  this.snackbarElement_.setAttribute('aria-hidden', true);

  if (this.actionHandler_) {
    this.actionElement_ = document.createElement('button');
    this.actionElement_.type = 'button';
    this.actionElement_.classList.add(this.cssClasses.action);
    this.actionElement_.textContent = this.actionText_;
    this.snackbarElement_.appendChild(this.actionElement_);
    this.actionElement_.addEventListener('click', this.actionHandler_);
  }

  this.element_.appendChild(this.snackbarElement_);

  this.textElement_.textContent = this.message_;
  this.snackbarElement_.classList.add(this.cssClasses.activeSnackbar);
  this.snackbarElement_.setAttribute('aria-hidden', false);
  setTimeout(this.cleanup.bind(this), this.timeout_);

};

MaterialSnackbar.prototype.removeSnackbar = function() {
  'use strict';
  if (this.actionElement_) {
    this.snackbarElement_.removeChild(this.actionElement_);
  }
  this.snackbarElement_.removeChild(this.textElement_);
  this.element_.removeChild(this.snackbarElement_);
};

MaterialSnackbar.prototype.showSnackbar = function(data) {
  'use strict';
  if (data.message === undefined) {
    throw 'Please provide a message to be displayed.';
  }
  if (data.actionHandler && !data.actionText) {
    throw  'Please provide action text with the handler.';
  }
  if (this.active) {
    this.queuedNotifications.push(data);
  } else {
    this.active = true;
    this.message_ = data.message;
    if (data.timeout) {
      this.timeout_ = data.timeout;
    } else {
      this.timeout_ = this.defaults.timeout;
    }
    if (data.actionHandler) {
      this.actionHandler_ = data.actionHandler;
    }
    if (data.actionText) {
      this.actionText_ = data.actionText;
    }
    this.createSnackbar();
  }
};

MaterialSnackbar.prototype.checkQueue = function() {
  'use strict';
  if (this.queuedNotifications.length > 0) {
    this.showSnackbar(this.queuedNotifications.shift());
  }
};

MaterialSnackbar.prototype.cleanup = function() {
  'use strict';
  this.snackbarElement_.classList.remove(this.cssClasses.activeSnackbar);
  this.snackbarElement_.setAttribute('aria-hidden', true);
  if (this.actionElement_) {
    this.actionElement_.textContent = '';
    this.actionElement_.removeEventListener('click', this.actionHandler_);
  }
  this.setDefaults_();
  this.active = false;
  this.removeSnackbar();
  this.checkQueue();
};

MaterialSnackbar.prototype.setDefaults_ = function() {
  'use strict';
  this.actionHandler_ = undefined;
  this.message_ = undefined;
  this.actionText_ = undefined;
};

MaterialSnackbar.prototype.init = function() {
  'use strict';
  this.setDefaults_();
};

componentHandler.register({
  constructor: MaterialSnackbar,
  classAsString: 'MaterialSnackbar',
  cssClass: 'mdl-js-snackbar',
  widget: true
});
