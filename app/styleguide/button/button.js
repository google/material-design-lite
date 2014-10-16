'use strict';

function PaperButton(el) {
  var buttonElement = el;
  var rippleElement = buttonElement.querySelector('.PaperButton-ripple');
  var frameCount = 0;
  var isSafari = /constructor/i.test(window.HTMLElement);
  var rippleSize;
  var x;
  var y;

  if (rippleElement) {
    var bound = buttonElement.getBoundingClientRect();
    rippleSize = Math.max(bound.width, bound.height) * 2;

    rippleElement.style.width = rippleSize + 'px';
    rippleElement.style.height = rippleSize + 'px';
  }

  buttonElement.addEventListener('click', this.onClickHandler.bind(this));

  this.getFrameCount = function() {
    return frameCount;
  };

  this.setFrameCount = function(fC) {
    frameCount = fC;
  };

  this.getRippleElement = function() {
    return rippleElement;
  };

  this.setRippleXY = function(newX, newY) {
    x = newX;
    y = newY;
  };

  this.setRippleStyles = function(start) {
    if (rippleElement !== null) {
      var transformString;
      var scale;
      var size;

      if (start) {
        scale = 'scale(0.0001, 0.0001)';
        size = '1px';
      } else {
        scale = 'scale(1, 1)';
        size = rippleSize + 'px';
      }

      transformString = 'translate(-50%, -50%) ' +
        'translate(' + x + 'px, ' + y + 'px)';

      // Safari unfortunately needs special handling, due to a bug with child
      // elements not clipping at parent borders for certain transforms. We use
      // the less performant alternative of changing width and height to work
      // around the issue.
      if (isSafari) {
        rippleElement.style.height = size;
        rippleElement.style.width = size;
      } else {
        transformString += scale;
      }

      rippleElement.style.webkitTransform = transformString;
      rippleElement.style.msTransform = transformString;
      rippleElement.style.transform = transformString;

      if (start) {
        rippleElement.style.opacity = '0.4';
        rippleElement.classList.remove('is-animating');
      } else {
        rippleElement.style.opacity = '0';
        rippleElement.classList.add('is-animating');
      }
    }
  };

  this.animFrameHandler = function() {
    if (frameCount-- > 0) {
      window.requestAnimFrame(this.animFrameHandler.bind(this));
    } else {
      this.setRippleStyles(false);
    }
  };
}

PaperButton.prototype.onClickHandler = function(evt) {
  var frameCount = this.getFrameCount();
  if (frameCount > 0) {
    return;
  }

  this.setFrameCount(1);
  var bound = evt.currentTarget.getBoundingClientRect();
  var x;
  var y;
  // Check if we are handling a keyboard click
  if (evt.clientX === 0 && evt.clientY === 0) {
    x = Math.round(bound.width / 2);
    y = Math.round(bound.height / 2);
  } else {
    x = Math.round(evt.clientX - bound.left);
    y = Math.round(evt.clientY - bound.top);
  }
  this.setRippleXY(x, y);
  this.setRippleStyles(true);
  window.requestAnimFrame(this.animFrameHandler.bind(this));
};

window.addEventListener('load', function() {
  var buttonElements = document.querySelectorAll('.PaperButton');
  for (var i = 0; i < buttonElements.length; i++) {
    new PaperButton(buttonElements[i]);
  }
});
