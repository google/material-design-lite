'use strict';

function PaperButton(el) {
  var buttonElement = el;
  var rippleElement = buttonElement.querySelector('.PaperButton-ripple');
  var frameCount = 0, x, y;

  if(rippleElement) {
    var bound = buttonElement.getBoundingClientRect();
    var rippleSize = Math.max(bound.width, bound.height) * 2;

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
    x = newX, y = newY;
  };

  this.animFrameHandler = function() {
    if (frameCount-- > 0) {
      window.requestAnimFrame(this.animFrameHandler.bind(this));
    } else {
      var transformString = 'translate(-50%, -50%) ' +
        'translate(' + x + 'px, ' + y + 'px)' +
        'scale(1, 1)';

      if (rippleElement !== null) {
        rippleElement.style.webkitTransform = transformString;
        rippleElement.style.transform = transformString;
        rippleElement.style.opacity = '0';
        rippleElement.classList.add('is-animating');
      }
    }
  };
}

PaperButton.prototype.onClickHandler = function(evt) {
  console.log('onClick');
  var frameCount = this.getFrameCount();
  if (frameCount > 0) {
    return;
  }

  this.setFrameCount(1);
  var bound = evt.currentTarget.getBoundingClientRect();
  var x, y;
  // Check if we are handling a keyboard click
  if (event.clientX === 0 && event.clientY === 0) {
    x = Math.round(bound.width / 2);
    y = Math.round(bound.height / 2);
  } else {
    x = Math.round(evt.clientX - bound.left);
    y = Math.round(evt.clientY - bound.top);
  }
  this.setRippleXY(x, y);
  var transformString = 'translate(-50%, -50%) ' +
    'translate(' + x + 'px, ' + y + 'px) ' +
    'scale(0.0001, 0.0001)';
  
  var rippleElement = this.getRippleElement();
  if (rippleElement) {
    rippleElement.style.webkitTransform = transformString;
    rippleElement.style.transform = transformString;
    rippleElement.style.opacity = '0.4';
    rippleElement.classList.remove('is-animating');
  }
  window.requestAnimFrame(this.animFrameHandler.bind(this));
};

window.addEventListener('load', function() {
  var buttonElements = document.querySelectorAll('.PaperButton');
  for (var i = 0; i < buttonElements.length; i++) {
    new PaperButton(buttonElements[i]);
  }
});
