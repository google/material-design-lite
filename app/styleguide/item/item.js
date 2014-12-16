'use strict';

window.addEventListener('load', function() {
  var itemElementsWithRipples =
      document.querySelectorAll('.wsk-js-ripple-effect');
  
  for (var i = 0; i < itemElementsWithRipples.length; i++) {
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('wsk-item--ripple-container');
    
    var ripple = document.createElement('span');
    ripple.classList.add('wsk-ripple');
    rippleContainer.appendChild(ripple);
    
    itemElementsWithRipples[i].appendChild(rippleContainer);
  }
});
