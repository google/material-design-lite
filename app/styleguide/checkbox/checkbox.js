function Checkbox(btnElement, container) {
  'use strict';

  var boxOutline = document.createElement('span');
  boxOutline.classList.add('wsk-checkbox__box-outline');

  var tickContainer = document.createElement('span');
  tickContainer.classList.add('wsk-checkbox__focus-helper');

  var tickOutline = document.createElement('span');
  tickOutline.classList.add('wsk-checkbox__tick-outline');

  var bottomRight = document.createElement('span');
  bottomRight.classList.add('wsk-checkbox__bottom-right');

  var bottomLeft = document.createElement('span');
  bottomLeft.classList.add('wsk-checkbox__bottom-left');

  var bottom = document.createElement('span');
  bottom.classList.add('wsk-checkbox__bottom');

  var topLeft = document.createElement('span');
  topLeft.classList.add('wsk-checkbox__top-left');

  var topRight = document.createElement('span');
  topRight.classList.add('wsk-checkbox__top-right');

  boxOutline.appendChild(tickOutline);
  boxOutline.appendChild(topLeft);
  boxOutline.appendChild(topRight);
  boxOutline.appendChild(bottomRight);
  boxOutline.appendChild(bottomLeft);
  boxOutline.appendChild(bottom);

  container.appendChild(tickContainer);
  container.appendChild(boxOutline);

  var rippleContainer;

  if (container.classList.contains('wsk-js-ripple-effect')) {
    container.classList.add('wsk-js-ripple-effect--ignore-events');
    rippleContainer = document.createElement('span');
    rippleContainer.classList.add('wsk-checkbox__ripple-container');
    rippleContainer.classList.add('wsk-js-ripple-effect');
    rippleContainer.classList.add('wsk-ripple--center');

    var ripple = document.createElement('span');
    ripple.classList.add('wsk-ripple');

    rippleContainer.appendChild(ripple);
    container.appendChild(rippleContainer);
  }

  btnElement.addEventListener('change', function(e) {
    this.updateClasses(btnElement, container);
  }.bind(this));

  btnElement.addEventListener('focus', function(e) {
    container.classList.add('is-focused');
  }.bind(this));

  btnElement.addEventListener('blur', function(e) {
    container.classList.remove('is-focused');
  }.bind(this));

  container.addEventListener('mouseup', function(e) {
    this.blur();
  }.bind(this));

  rippleContainer.addEventListener('mouseup', function(e) {
    this.blur();
  }.bind(this));

  this.updateClasses = function(button, label) {
    if (button.disabled) {
      label.classList.add('is-disabled');
    } else {
      label.classList.remove('is-disabled');
    }

    if (button.checked) {
      label.classList.add('is-checked');
    } else {
      label.classList.remove('is-checked');
    }
  };

  this.blur = function() {
    // TODO: figure out why there's a focus event being fired after our blur,
    // so that we can avoid this hack.
    window.setTimeout(function() { btnElement.blur(); }, 0.001);
  };

  this.updateClasses(btnElement, container);
  container.classList.add('is-upgraded');
}

window.addEventListener('load', function() {
  'use strict';

  var radios = document.querySelectorAll('.wsk-js-checkbox');
  for (var i = 0; i < radios.length; i++) {
    var button = radios[i].querySelector('.wsk-checkbox__input');
    new Checkbox(button, radios[i]);
  }
});
