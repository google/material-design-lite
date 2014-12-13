'use strict';

function RadioButton(btnElement, labelElement) {
  var outerCircle = document.createElement('span');
  outerCircle.classList.add('wsk-radio-button__outer-circle');

  var innerCircle = document.createElement('span');
  innerCircle.classList.add('wsk-radio-button__inner-circle');

  labelElement.insertBefore(outerCircle, btnElement);
  labelElement.appendChild(innerCircle);

  if (btnElement.classList.contains('wsk-js-ripple-effect')) {
    btnElement.classList.add('wsk-ripple--center');
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('wsk-radio-button__ripple-container');
    rippleContainer.classList.add('wsk-js-ripple-effect');
    rippleContainer.classList.add('wsk-ripple--center');

    var ripple = document.createElement('span');
    ripple.classList.add('wsk-ripple');

    rippleContainer.appendChild(ripple);
    labelElement.appendChild(rippleContainer);
  }
}

window.addEventListener('load', function() {
  var radioLabels = document.querySelectorAll('.wsk-radio-button__label');
  for (var i = 0; i < radioLabels.length; i++) {
    var radioButton = radioLabels[i].querySelector('.wsk-radio-button');
    new RadioButton(radioButton, radioLabels[i]);
  }
});
