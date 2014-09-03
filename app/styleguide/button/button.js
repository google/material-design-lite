(function() {
  window.addEventListener('load', function() {
    'use strict';

    var buttons = document.querySelectorAll('.paper-button');
    var button, bound, x, y, ripple, size, transformString;
    var frameCount = 0;

    for (var b = 0; b < buttons.length; b++) {
      button = buttons[b];
      bound = button.getBoundingClientRect();
      ripple = button.querySelector('.ripple');
      size = Math.max(bound.width, bound.height) * 2;

      if (ripple !== null) {
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
      }

      button.addEventListener('click', onClick);
    }

    function onClick(evt) {

      if (frameCount > 0) {
        return;
      }

      frameCount = 1;
      bound = evt.currentTarget.getBoundingClientRect();
      x = Math.round(evt.clientX - bound.left);
      y = Math.round(evt.clientY - bound.top);
      transformString = 'translate(-50%, -50%) ' +
        'translate(' + x + 'px, ' + y + 'px) ' +
        'scale(0.0001, 0.0001)';

      ripple = evt.currentTarget.querySelector('.ripple');

      if (ripple !== null) {
        ripple.style.webkitTransform = transformString;
        ripple.style.transform = transformString;
        ripple.style.opacity = '0.4';
        ripple.classList.remove('animate');
      }
      requestAnimFrame(reset);
    }

    function reset() {

      if (frameCount-- > 0) {
        requestAnimFrame(reset);
      } else {

        transformString = 'translate(-50%, -50%) ' +
          'translate(' + x + 'px, ' + y + 'px)' +
          'scale(1, 1)';

        if (ripple !== null) {
          ripple.style.webkitTransform = transformString;
          ripple.style.transform = transformString;
          ripple.style.opacity = '0';
          ripple.classList.add('animate');
        }
      }
    }
  });

})();
