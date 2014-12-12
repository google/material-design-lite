'use strict';

function RadioButton(btnElement, labelElement) {
  var outerCircle = document.createElement('span');
  outerCircle.classList.add('wsk-radio-button__outer-circle');

  var innerCircle = document.createElement('span');
  innerCircle.classList.add('wsk-radio-button__inner-circle');

  labelElement.insertBefore(outerCircle, btnElement);
  labelElement.appendChild(innerCircle);

  if (btnElement.classList.contains('RippleEffect')) {
    btnElement.classList.add('RippleEffect--recentering');
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('wsk-radio-button__ripple-container');
    rippleContainer.classList.add('RippleEffect');
    rippleContainer.classList.add('RippleEffect--recentering');

    var ripple = document.createElement('span');
    ripple.classList.add('Ripple');

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
