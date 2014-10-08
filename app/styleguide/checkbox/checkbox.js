function PaperCheckbox(l) {
  'use strict';

  this.labelElement = l;
  this.checkboxElement = document.getElementById(
    this.labelElement.getAttribute('for'));

  // Add additional elements
  this.fakeCheckbox = document.createElement('span');
  this.fakeCheckbox.className = 'paper-checkbox';
  this.fakeCheckbox.tabIndex = 0;
  this.focusCircle = document.createElement('span');
  this.focusCircle.className = 'focusCircle';
  this.labelElement.insertBefore(this.focusCircle,
    this.labelElement.firstChild);
  this.labelElement.insertBefore(this.fakeCheckbox,
     this.labelElement.firstChild);

  this.fakeCheckbox.addEventListener('focus', function(evt) {
    this.onFocusChange(evt, true);
  }.bind(this));
  this.fakeCheckbox.addEventListener('blur', function(evt) {
    this.onFocusChange(evt, false);
  }.bind(this));
  this.labelElement.addEventListener('focus', function(evt) {
    this.onFocusChange(evt);
  }.bind(this));
  this.labelElement.addEventListener('blur', function(evt) {
    this.onFocusChange(evt);
  }.bind(this));
  this.fakeCheckbox.addEventListener('click', function(evt) {
    this.onCheckChange(evt);
  }.bind(this));
  this.labelElement.addEventListener('click', function(evt) {
    this.onCheckChange(evt);
  }.bind(this));
  this.fakeCheckbox.addEventListener('keypress', function(evt) {
    this.onKeyEvent(evt);
  }.bind(this));
  this.labelElement.addEventListener('keypress', function(evt) {
    this.onKeyEvent(evt);
  }.bind(this));
}

PaperCheckbox.prototype.onFocusChange = function(evt, isFocused) {
  'use strict';
  console.log('onFocusChange');
  if (isFocused) {
    this.focusCircle.classList.add('focused');
  } else {
    this.focusCircle.classList.remove('focused');
  }
};

PaperCheckbox.prototype.onCheckChange = function(evt) {
  'use strict';
  evt.preventDefault();

  this.checkboxElement.checked = !this.checkboxElement.checked;
  if (this.checkboxElement.checked) {
    this.fakeCheckbox.classList.add('checked');
    this.focusCircle.classList.add('checked');
  } else {
    this.fakeCheckbox.classList.remove('checked');
    this.focusCircle.classList.remove('checked');
  }
};

PaperCheckbox.prototype.onKeyEvent = function(evt) {
  'use strict';
  var SPACE_KEY = 32;

  if (evt.keyCode === SPACE_KEY) {
    evt.stopPropagation();
    this.onCheckChange(evt);
  }
};

window.addEventListener('load', function() {
  'use strict';

  var labels =  document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
    new PaperCheckbox(labels[i]);
  }
});
