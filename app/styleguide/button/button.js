window.addEventListener('load', function() {
  'use strict';

  var blurHandlerGenerator = function(element) {
    return function() { element.blur(); };
  };

  var buttonElements = document.querySelectorAll('.PaperButton');

  for (var i = 0; i < buttonElements.length; i++) {
    var buttonElement = buttonElements[i];
    var blurHandler = blurHandlerGenerator(buttonElement);
    if (buttonElement.classList.contains('RippleEffect')) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add('PaperButton-rippleContainer');
      var ripple = document.createElement('span');
      ripple.classList.add('Ripple');
      rippleContainer.appendChild(ripple);
      ripple.addEventListener('mouseup', blurHandler);
      buttonElement.appendChild(rippleContainer);
    }
    buttonElement.addEventListener('mouseup', blurHandler);
  }
});
