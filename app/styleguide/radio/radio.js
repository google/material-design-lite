function Radio(btnElement, container) {
  'use strict';

  var outerCircle = document.createElement('span');
  outerCircle.classList.add('wsk-radio__outer-circle');

  var innerCircle = document.createElement('span');
  innerCircle.classList.add('wsk-radio__inner-circle');

  container.appendChild(outerCircle);
  container.appendChild(innerCircle);

  var rippleContainer;

  if (container.classList.contains('wsk-js-ripple-effect')) {
    container.classList.add('wsk-js-ripple-effect--ignore-events');
    rippleContainer = document.createElement('span');
    rippleContainer.classList.add('wsk-radio__ripple-container');
    rippleContainer.classList.add('wsk-js-ripple-effect');
    rippleContainer.classList.add('wsk-ripple--center');

    var ripple = document.createElement('span');
    ripple.classList.add('wsk-ripple');

    rippleContainer.appendChild(ripple);
    container.appendChild(rippleContainer);
  }

  btnElement.addEventListener('change', function(e) {
    this.updateClasses(btnElement, container);

    // Since other radio buttons don't get change events, we need to look for
    // them to update their classes.
    var radios = document.querySelectorAll('.wsk-js-radio');
    for (var i = 0; i < radios.length; i++) {
      var button = radios[i].querySelector('.wsk-radio__button');
      // Different name == different group, so no point updating those.
      if (button.getAttribute('name') === btnElement.getAttribute('name')) {
        this.updateClasses(button, radios[i]);
      }
    }

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

  var radios = document.querySelectorAll('.wsk-js-radio');
  for (var i = 0; i < radios.length; i++) {
    var button = radios[i].querySelector('.wsk-radio__button');
    new Radio(button, radios[i]);
  }
});
