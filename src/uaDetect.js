(function() {
  'use strict';

  var ua = navigator.userAgent;
  var root = document.documentElement.classList;
  if (/Firefox/i.test(ua)) {
    root.add('firefox');
  }
  if (/Chrome/i.test(ua)) {
    root.add('chrome');
  }
  if (/Safari/i.test(ua)) {
    root.add('safari');
  }
  if (/Opera/i.test(ua)) {
    root.add('opera');
  }
  if (/(MSIE|WOW64)/i.test(ua)) {
    root.add('ie');
  }
})();
