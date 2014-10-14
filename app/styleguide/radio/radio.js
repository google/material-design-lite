'use strict';

function RadioButton(btnElement, labelElement) {
  var outerCircle = document.createElement('span');
  outerCircle.classList.add('RadioButton-outerCircle');

  var innerCircle = document.createElement('span');
  innerCircle.classList.add('RadioButton-innerCircle');

  var ripple = document.createElement('span');
  ripple.classList.add('RadioButton-ripple');

  labelElement.insertBefore(outerCircle, btnElement);
  labelElement.appendChild(innerCircle);
  labelElement.appendChild(ripple);

  this.onClick = function(evt) {
    if (ripple === null) {
      return;
    }

    ripple.classList.add('RadioButton-isRippling');
  };

  this.onEndOfRippleTransition = function() {
    ripple.classList.remove('RadioButton-isRippling');
  };

  labelElement.addEventListener('click', this.onClick.bind(this));
  ripple.addEventListener('webkitTransitionEnd', this.onEndOfRippleTransition.bind(this));
  ripple.addEventListener('oTransitionEnd', this.onEndOfRippleTransition.bind(this));
  ripple.addEventListener('transitionEnd', this.onEndOfRippleTransition.bind(this));
}

window.addEventListener('load', function() {
  var radioLabels = document.querySelectorAll('.RadioButton-label');
  for(var i = 0; i < radioLabels.length; i++) {
    var radioButton = radioLabels[i].querySelector('.RadioButton');
    new RadioButton(radioButton, radioLabels[i]);
  }
});
