// Navbar scroll buttons
(function() {
  'use strict';

  var rightScroll = document.querySelector('.scrollindicator.scrollindicator--right');
  var leftScroll = document.querySelector('.scrollindicator.scrollindicator--left');
  var menuBar = document.querySelector('.docs-navigation');
  var delta = 40;

  function updateScrollIndicator() {
    leftScroll.classList.remove('disabled');
    rightScroll.classList.remove('disabled');
    if (menuBar.scrollLeft <= 0) {
      leftScroll.classList.add('disabled');
    }
    // 5px tolerance because browsers!
    if (menuBar.scrollLeft + menuBar.clientWidth + 5 >= menuBar.scrollWidth) {
      rightScroll.classList.add('disabled');
    }
  }
  menuBar.addEventListener('scroll', updateScrollIndicator);
  updateScrollIndicator();

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

  var iframe = document.querySelector('iframe.docs-customizer');
  if (!iframe) {
    return;
  }
  function updateIframe() {
    var height = Math.min(iframe.contentWindow.document.body.getClientRects()[0].height,
      iframe.contentWindow.document.body.scrollHeight);
    iframe.style.height = height + 'px';
  }
  window.addEventListener('resize', updateIframe);
  iframe.addEventListener('load', updateIframe);
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
