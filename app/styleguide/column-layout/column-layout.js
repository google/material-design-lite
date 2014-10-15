'use strict';

(function() {
  window.addEventListener('load', function() {
    var INVISIBLE_WRAPPING_ELEMENT_CLASS = 'wrap-hack';
    var INVISIBLE_WRAPPING_ELEMENT_COUNT = 3;
    var columnLayouts = document.querySelectorAll('.column-layout');

    for (var i = 0; i < columnLayouts.length; i++) {
      var columnLayout = columnLayouts[i];
      // Add some hidden elements to make sure everything aligns correctly. See
      // CSS file for details.
      for (var j = 0; j < INVISIBLE_WRAPPING_ELEMENT_COUNT; j++) {
        var hiddenHackDiv = document.createElement('div');
        hiddenHackDiv.classList.add(INVISIBLE_WRAPPING_ELEMENT_CLASS);
        columnLayout.appendChild(hiddenHackDiv);
      }
    }
  });
})();
