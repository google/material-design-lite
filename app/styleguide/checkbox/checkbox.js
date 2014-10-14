function Checkbox(l) {
  'use strict';

  var labelElement = l;
  var checkboxElement = document.getElementById(
    labelElement.getAttribute('for'));
  checkboxElement.disabled = true;

  // Add additional elements
  var fakeCheckbox = document.createElement('span');
  fakeCheckbox.className = 'Checkbox';
  fakeCheckbox.tabIndex = 0;
  var focusCircle = document.createElement('span');
  focusCircle.className = 'Checkbox-focusCircle';

  labelElement.insertBefore(focusCircle,
    labelElement.firstChild);
  labelElement.insertBefore(fakeCheckbox,
     labelElement.firstChild);

  fakeCheckbox.addEventListener('focus', function(evt) {
    this.onFocusChange(evt, true);
  }.bind(this));
  fakeCheckbox.addEventListener('blur', function(evt) {
    this.onFocusChange(evt, false);
  }.bind(this));
  labelElement.addEventListener('focus', function(evt) {
    this.onFocusChange(evt);
  }.bind(this));
  labelElement.addEventListener('blur', function(evt) {
    this.onFocusChange(evt);
  }.bind(this));
  fakeCheckbox.addEventListener('click', function(evt) {
    this.onCheckChange(evt);
  }.bind(this));
  labelElement.addEventListener('click', function(evt) {
    this.onCheckChange(evt);
  }.bind(this));
  fakeCheckbox.addEventListener('keypress', function(evt) {
    console.log('fakeCheckbox keypress');
    this.onKeyEvent(evt);
  }.bind(this));
  labelElement.addEventListener('keypress', function(evt) {
    this.onKeyEvent(evt);
  }.bind(this));

  this.getCheckboxElement = function() {
    return checkboxElement;
  };

  this.getFakeCheckboxElement = function() {
    return fakeCheckbox;
  };

  this.getFocusCircleElement = function() {
    return focusCircle;
  };
}

Checkbox.prototype.onFocusChange = function(evt, isFocused) {
  'use strict';
  var focusCircle = this.getFocusCircleElement();
  if (isFocused) {
    focusCircle.classList.add('Checkbox-isFocused');
  } else {
    focusCircle.classList.remove('Checkbox-isFocused');
  }
};

Checkbox.prototype.onCheckChange = function(evt) {
  'use strict';
  evt.preventDefault();
  evt.stopPropagation();

  var checkboxElement = this.getCheckboxElement();
  var fakeCheckbox = this.getFakeCheckboxElement();
  var focusCircle = this.getFocusCircleElement();

  checkboxElement.checked = !checkboxElement.checked;
  if (checkboxElement.checked) {
    fakeCheckbox.classList.add('Checkbox-isChecked');
    focusCircle.classList.add('Checkbox-isChecked');
  } else {
    fakeCheckbox.classList.remove('Checkbox-isChecked');
    focusCircle.classList.remove('Checkbox-isChecked');
  }
};

Checkbox.prototype.onKeyEvent = function(evt) {
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
    new Checkbox(labels[i]);
  }
});
