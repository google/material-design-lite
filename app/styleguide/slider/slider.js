'use strict';

function Slider(element) {
  var sliderElement = element;
  sliderElement.addEventListener('input', function(e) {
    this.updateValue();
  }.bind(this));
  sliderElement.addEventListener('mouseup', function(e) {
    e.target.blur();
  }.bind(this));

  this.updateValue = function() {
    sliderElement.classList.toggle('ring', sliderElement.value === '0');

    if (!sliderElement.disabled) {
      var color = window.getComputedStyle(
        sliderElement, null).getPropertyValue('color');
      var val = 'linear-gradient(90deg, ' + color + ', ' + color + ' ' +
        sliderElement.value + '%, #ccc ' + sliderElement.value + '%, #ccc)';
      sliderElement.style.background = val;
    }
  };

  this.updateValue();
}

window.addEventListener('load', function() {
  var sliders =  document.querySelectorAll('input[type="range"]');
  for (var i = 0; i < sliders.length; i++) {
    new Slider(sliders[i]);
  }
});
