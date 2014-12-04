'use strict';

function RippleOwner(el, recentering) {
  var parentElement = el;
  var rippleElement = parentElement.querySelector('.Ripple');
  var frameCount = 0;
  var rippleSize;
  var x;
  var y;

  // Touch start produces a compat mouse down event, which would cause a second
  // ripples. To avoid that, we use this property to ignore the first mouse down
  // after a touch start.
  this.ignoringMouseDown = false;

  if (rippleElement) {
    var bound = parentElement.getBoundingClientRect();
    rippleSize = Math.max(bound.width, bound.height) * 2;

    rippleElement.style.width = rippleSize + 'px';
    rippleElement.style.height = rippleSize + 'px';
  }

  parentElement.addEventListener('mousedown', this.downHandler.bind(this));
  parentElement.addEventListener('touchstart', this.downHandler.bind(this));

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
      var offset = 'translate(' + x + 'px, ' + y + 'px)';

      if (start) {
        scale = 'scale(0.0001, 0.0001)';
        size = '1px';
      } else {
        scale = 'scale(1, 1)';
        size = rippleSize + 'px';
        if (recentering) {
          offset = 'translate(' + bound.width / 2 + 'px, ' +
            bound.height / 2 + 'px)';
        }
      }

      transformString = 'translate(-50%, -50%) ' + offset + scale;

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

RippleOwner.prototype.downHandler = function(evt) {
  if (evt.type === 'mousedown' && this.ignoringMouseDown) {
    this.ignoringMouseDown = false;
  } else {
    if (evt.type === 'touchstart') {
      this.ignoringMouseDown = true;
    }
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
      var clientX = evt.clientX ? evt.clientX : evt.touches[0].clientX;
      var clientY = evt.clientY ? evt.clientY : evt.touches[0].clientY;
      x = Math.round(clientX - bound.left);
      y = Math.round(clientY - bound.top);
    }
    this.setRippleXY(x, y);
    this.setRippleStyles(true);
    window.requestAnimFrame(this.animFrameHandler.bind(this));
  }
};

window.addEventListener('load', function() {
  var rippleElements = document.querySelectorAll('.RippleEffect');
  for (var i = 0; i < rippleElements.length; i++) {
    var rippleElement = rippleElements[i];
    var recentering =
        rippleElement.classList.contains('RippleEffect--recentering');
    new RippleOwner(rippleElement, recentering);
  }
});
