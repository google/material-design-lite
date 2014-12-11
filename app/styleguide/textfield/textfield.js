'use strict';

function TextField(element) {
  var NO_MAX_ROWS = -1;
  var inputElement = element;
  var maxRows = NO_MAX_ROWS;
  //var currentLineHeight = 1;

  if (inputElement.hasAttribute('maxrows')) {
    maxRows = parseInt(inputElement.getAttribute('maxrows'), 10);
    if (isNaN(maxRows)) {
      console.log(
          'maxrows attribute provided, but wasn\'t a number: ' + maxRows);
      maxRows = NO_MAX_ROWS;
    }
  }

  this.onInputChange = function(evt) {
    if (evt.target.value && evt.target.value.length > 0) {
      evt.target.classList.add('is-dirty');
    } else {
      evt.target.classList.remove('is-dirty');
    }
  };

  this.onKeyDown = function(evt) {
    var currentRowCount = evt.target.value.split('\n').length;
    if (evt.keyCode === 13) {
      if (currentRowCount >= maxRows) {
        evt.preventDefault();
      }
    }
  };

  inputElement.addEventListener('input', this.onInputChange.bind(this));
  if (maxRows !== NO_MAX_ROWS) {
    // TODO: This should handle pasting multi line text
    // Currently doesn't
    inputElement.addEventListener('keydown', this.onKeyDown.bind(this));
  }
}

function ExpandableIcon(iconElement) {
  var container = document.createElement('span');
  iconElement.appendChild(container);

  container.classList.add('wsk-textfield-expandable-icon__ripple__container');
  container.classList.add('wsk-js-ripple-effect');
  container.classList.add('wsk-ripple--recentering');

  var ripple = document.createElement('span');
  ripple.classList.add('wsk-ripple');
  container.appendChild(ripple);
}

window.addEventListener('load', function() {
  var i;
  var inputs = document.querySelectorAll('.wsk-js-textfield');
  for (i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    new TextField(input);
  }
  var expandableIcons = document.querySelectorAll('.wsk-textfield-expandable-icon');
  for (i = 0; i < expandableIcons.length; ++i) {
    var expandableIcon = expandableIcons[i];
    new ExpandableIcon(expandableIcon);
  }
});
