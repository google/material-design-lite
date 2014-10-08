'use strict';

(function() {
  window.addEventListener('load', function() {
    var panels = document.querySelectorAll('.header-panel');
    var MODE = {
      STANDARD: 0,
      SEAMED: 1,
      WATERFALL: 2,
      SCROLL: 3
    };
    var SHADOW_CLASS = 'header-panel-shadow';
    var COMPACT_CLASS = 'header-panel-compact';

    var scrollHandler = function(mode, header, content) {
      return function() {
        if (mode === MODE.WATERFALL) {
          if (content.scrollTop > 0) {
            header.classList.add(SHADOW_CLASS);
            header.classList.add(COMPACT_CLASS);
          } else {
            header.classList.remove(SHADOW_CLASS);
            header.classList.remove(COMPACT_CLASS);
          }
        }
      };
    };

    for (var i = 0; i < panels.length; i++) {
      var panel = panels[i];
      var header = panel.querySelector('.header-panel-header');
      var content = panel.querySelector('.header-panel-content');
      var mode = MODE.STANDARD;
      if (panel.classList.contains('header-panel-seamed')) {
        mode = MODE.SEAMED;
      } else if (panel.classList.contains('header-panel-waterfall')) {
        mode = MODE.WATERFALL;
      } else if (panel.classList.contains('header-panel-scroll')) {
        mode = MODE.SCROLL;
      }

      if (mode === MODE.STANDARD) {
        header.classList.add(SHADOW_CLASS);
      } else if (mode === MODE.SEAMED || mode === MODE.SCROLL) {
        header.classList.remove(SHADOW_CLASS);
      } else if (mode === MODE.WATERFALL) {
        var handler = scrollHandler(mode, header, content);
        content.addEventListener('scroll', handler);
        handler();
      }
    }

  });

})();
