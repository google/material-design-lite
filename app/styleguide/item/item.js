'use strict';

window.addEventListener('load', function() {
  var itemElementsWithRipples =
      document.querySelectorAll('.PaperItem.RippleEffect');
  for (var i = 0; i < itemElementsWithRipples.length; i++) {
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('PaperItem-rippleContainer');
    var ripple = document.createElement('span');
    ripple.classList.add('Ripple');
    rippleContainer.appendChild(ripple);
    itemElementsWithRipples[i].appendChild(rippleContainer);
  }
});
