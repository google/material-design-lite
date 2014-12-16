'use strict';

window.addEventListener('load', function() {
  var itemElementsWithRipples =
      document.querySelectorAll('.PaperItem.wsk-js-ripple-effect');
  for (var i = 0; i < itemElementsWithRipples.length; i++) {
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('PaperItem-rippleContainer');
    var ripple = document.createElement('span');
    ripple.classList.add('wsk-ripple');
    rippleContainer.appendChild(ripple);
    itemElementsWithRipples[i].appendChild(rippleContainer);
  }
});
