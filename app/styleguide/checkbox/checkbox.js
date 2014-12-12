'use strict';

function Checkbox(l) {
  if (l === undefined) {
    return;
  }

  var labelElement = l;
  var checkboxElement = document.getElementById(
    labelElement.getAttribute('for'));
  checkboxElement.disabled = true;

  // Add additional elements
  var fakeCheckbox = document.createElement('span');
  fakeCheckbox.classList.add('Checkbox');
  fakeCheckbox.tabIndex = 0;
  if (checkboxElement.classList.contains('wsk-js-ripple-effect')) {
    checkboxElement.classList.add('wsk-ripple--center');
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('Checkbox-rippleContainer');
    rippleContainer.classList.add('wsk-js-ripple-effect');
    rippleContainer.classList.add('wsk-ripple--center');
    var ripple = document.createElement('span');
    ripple.classList.add('wsk-ripple');

    rippleContainer.appendChild(ripple);
    labelElement.insertBefore(rippleContainer,
      labelElement.firstChild);
  }
  labelElement.insertBefore(fakeCheckbox,
     labelElement.firstChild);

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

  this.getRippleElement = function() {
    return rippleContainer;
  };
}

Checkbox.prototype.onCheckChange = function(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  var checkboxElement = this.getCheckboxElement();
  var fakeCheckbox = this.getFakeCheckboxElement();
  var rippleContainer = this.getRippleElement();

  checkboxElement.checked = !checkboxElement.checked;
  if (checkboxElement.checked) {
    fakeCheckbox.classList.add('Checkbox-isChecked');
    rippleContainer.classList.add('Checkbox-isChecked');
  } else {
    fakeCheckbox.classList.remove('Checkbox-isChecked');
    rippleContainer.classList.remove('Checkbox-isChecked');
  }
};

Checkbox.prototype.onKeyEvent = function(evt) {
  var SPACE_KEY = 32;

  if (evt.keyCode === SPACE_KEY) {
    evt.stopPropagation();
    this.onCheckChange(evt);
  }
};

window.addEventListener('load', function() {
  var labels =  document.querySelectorAll('.Checkbox-label');
  for (var i = 0; i < labels.length; i++) {
    new Checkbox(labels[i]);
  }
});
