/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global MaterialCustomizer:true,Prism:true,ga:true*/

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

(function() {
  'use strict';

  var downloadButton = document.querySelector('.download-button-container');
  if (downloadButton) {
    downloadButton.addEventListener('click', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'click',
        eventAction: 'mdl-download'
      });
    });
  }

})();

// Disable empty links in demo's to prevent refresh page
(function () {
  'use strict';
  var emptyLinks = document.querySelectorAll('[href=""]');
  Array.prototype.forEach.call(emptyLinks, function(link) {
    link.addEventListener('click', function (event){
      event.preventDefault();
    });
  });
})();