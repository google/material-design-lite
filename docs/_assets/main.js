// Navbar scroll buttons
(function() {
  'use strict';

  var rightScroll = document.querySelector('.scrollindicator.scrollindicator--right');
  var leftScroll = document.querySelector('.scrollindicator.scrollindicator--left');
  var menuBar = document.querySelector('.docs-navigation');
  var delta = 40;

  function scrollMenuBar(delta) {
    menuBar.scrollLeft += delta;
  }

  rightScroll.addEventListener('click', scrollMenuBar.bind(null, delta));
  rightScroll.addEventListener('tap', scrollMenuBar.bind(null, delta));
  leftScroll.addEventListener('click', scrollMenuBar.bind(null, -delta));
  leftScroll.addEventListener('tap', scrollMenuBar.bind(null, -delta));
})();

// customizer iframe sizing
(function() {
  'use strict';

  var ifr = document.querySelector('iframe.docs-customizer');
  if (!ifr) {
    return;
  }
  function updateIframe() {
    var h = Math.min(ifr.contentWindow.document.body.getClientRects()[0].height,
      ifr.contentWindow.document.body.scrollHeight);
    ifr.style.height = h + 'px';
  }
  window.addEventListener('resize', updateIframe);
  ifr.addEventListener('load', updateIframe);
})();

// WIP banner
(function() {
  'use strict';

  var banner = document.querySelector('.docs-wip-banner');
  if ((location.hostname !== 'localhost') &&
      (location.hostname !== 'storage.googleapis.com')) {
    banner.style.display = 'block';
  }
  if (location.search.indexOf('showbanner') !== -1) {
    banner.style.display = 'block';
  }
})();
