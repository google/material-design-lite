window.addEventListener('load', function() {
  'use strict';

  var layouts = document.querySelectorAll('.wsk-js-layout');
  var MODE = {
    STANDARD: 0,
    SEAMED: 1,
    WATERFALL: 2,
    SCROLL: 3
  };

  var SHADOW_CLASS = 'is-casting-shadow';
  var COMPACT_CLASS = 'is-compact';
  var SMALL_SCREEN_CLASS = 'is-small-screen';
  var DRAWER_OPEN_CLASS = 'is-visible';

  var scrollHandlerGenerator = function(header, content) {
    return function() {
      if (content.scrollTop > 0) {
        header.classList.add(SHADOW_CLASS);
        header.classList.add(COMPACT_CLASS);
      } else {
        header.classList.remove(SHADOW_CLASS);
        header.classList.remove(COMPACT_CLASS);
      }
    };
  };

  var screenSizeHandlerGenerator = function(mediaQuery, layout, drawer) {
    return function() {
      if (mediaQuery.matches) {
        layout.classList.add(SMALL_SCREEN_CLASS);
      }
      else {
        layout.classList.remove(SMALL_SCREEN_CLASS);
        // Collapse drawer (if any) when moving to a large screen size.
        if (drawer) {
          drawer.classList.remove(DRAWER_OPEN_CLASS);
        }
      }
    };
  };

  var drawerToggleHandlerGenerator = function(drawer) {
    return function() {
      drawer.classList.toggle(DRAWER_OPEN_CLASS);
    };
  };

  for (var i = 0; i < layouts.length; i++) {
    var layout = layouts[i];
    var header = layout.querySelector('.wsk-layout__header');
    var drawer = layout.querySelector('.wsk-layout__drawer');
    var content = layout.querySelector('.wsk-layout__content');
    var mode = MODE.STANDARD;

    // Keep an eye on screen size, and add/remove auxiliary class for styling
    // of small screens.
    var mediaQuery = window.matchMedia('(max-width: 850px)');
    var screenSizeHandler =
        screenSizeHandlerGenerator(mediaQuery, layout, drawer);
    mediaQuery.addListener(screenSizeHandler);
    screenSizeHandler();

    if (header) {
      if (header.classList.contains('wsk-layout__header--seamed')) {
        mode = MODE.SEAMED;
      } else if (header.classList.contains('wsk-layout__header--waterfall')) {
        mode = MODE.WATERFALL;
      } else if (layout.classList.contains('wsk-layout__header--scroll')) {
        mode = MODE.SCROLL;
      }

      if (mode === MODE.STANDARD) {
        header.classList.add(SHADOW_CLASS);
      } else if (mode === MODE.SEAMED || mode === MODE.SCROLL) {
        header.classList.remove(SHADOW_CLASS);
      } else if (mode === MODE.WATERFALL) {
        // Add and remove shadows depending on scroll position.
        // Also add/remove auxiliary class for styling of the compact version of
        // the header.
        var scrollHandler = scrollHandlerGenerator(header, content);
        content.addEventListener('scroll', scrollHandler);
        scrollHandler();
      }
    }

    // Add drawer toggling button to our layout, if we have an openable drawer.
    if (drawer) {
      var drawerButton = document.createElement('div');
      drawerButton.classList.add('wsk-layout__drawer-button');
      var clickHandler = drawerToggleHandlerGenerator(drawer);
      drawerButton.addEventListener('click', clickHandler);

      // If we have a fixed header, add the button to the header rather than
      // the layout.
      if (layout.classList.contains('wsk-layout--fixed-header')) {
        header.insertBefore(drawerButton, header.firstChild);
      } else {
        layout.insertBefore(drawerButton, content);
      }

      var obfuscator = document.createElement('div');
      obfuscator.classList.add('wsk-layout__obfuscator');
      layout.appendChild(obfuscator);
      obfuscator.addEventListener('click', clickHandler);
    }
  }

});
