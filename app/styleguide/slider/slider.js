'use strict';

var wskSlider = function() {

  function displayValue(slider) {
    slider.classList.toggle('ring', slider.value === '0');
    if (!slider.disabled) {
      var color = window.getComputedStyle(
        slider, null).getPropertyValue('color');
      var val = 'linear-gradient(90deg, ' + color + ', ' + color+ ' ' +
        slider.value + '%, #ccc ' + slider.value + '%, #ccc)';
      slider.style.background = val;
    }
  }

  function setupSlider(slider) {
    displayValue(slider);
    slider.addEventListener('input', function(e) {
      displayValue(e.target);
    });
    slider.addEventListener('mouseup', function(e) {
      e.target.blur();
    });
  }

  function findSliders() {
    var sliders =  document.querySelectorAll('input[type="range"]');
    var i = sliders.length;
    while (i--) {
      var slider = sliders[i];
      setupSlider(slider);
    }
  }

  return {
    init: findSliders
  };

}();

window.addEventListener('load', function(){
  wskSlider.init();
});