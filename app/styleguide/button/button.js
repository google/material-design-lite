'use strict';

window.addEventListener('load', function() {
  var buttomElementsWithRipples =
      document.querySelectorAll('.PaperButton.RippleEffect');
  for (var i = 0; i < buttomElementsWithRipples.length; i++) {
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('PaperButton-rippleContainer');
    var ripple = document.createElement('span');
    ripple.classList.add('Ripple');
    rippleContainer.appendChild(ripple);
    buttomElementsWithRipples[i].appendChild(rippleContainer);
  }
});
