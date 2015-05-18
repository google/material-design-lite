window.addEventListener('load', function() { new MaterialComponents(); });

function MaterialComponents() {
  'use strict';

  this.activeComponent = '';
  this.contentElement = document.getElementsByClassName('content')[0];
  this.isMobile = false;
  this.layoutElement = document.getElementsByClassName('mdl-layout')[0];
  this.mobileMediaQuery = window.matchMedia('(max-width: 850px)');
  this.componentLinks = document.getElementsByClassName('mdl-components__link');
  this.stuck = false;
  this.scrollResized = false;

  this.init();
}

/**
 * Initializes the MaterialComponents component.
 */
MaterialComponents.prototype.init = function() {
  var self = this;
  var scroll = document.getElementsByClassName('mdl-components')[0];

  // Check for mobile viewport on load.
  this.checkMobile(this.mobileMediaQuery);

  // Check for loading element and bind event listeners.
  for (var i = 0, link; link = this.componentLinks[i]; i++) {
    if (link.getAttribute('href') === location.hash) {
      this.setActiveState(link.getAttribute('href').substring(1));

      // Set the scroll position to the active link.
      scroll.scrollLeft = link.offsetLeft;
    }
    link.addEventListener('click', function() {
      self.setActiveState(this.getAttribute('href').substring(1));
    });
  }

  // Watch for scrolling.
  this.layoutElement.addEventListener('scroll', this.stickyHeader.bind(this));

  // Watch for viewport changes.
  this.mobileMediaQuery.addListener(this.checkMobile.bind(this));
};

/**
 * Calculates the width of the scrolling div on mobile and sets an appropriate
 * media query.
 */
MaterialComponents.prototype.calculateScrollSize = function() {
  var scrollWidth = 5;

  for (var i = 0, componentLink;
    componentLink = this.componentLinks[i]; i++) { scrollWidth +=
      componentLink.offsetWidth;
  }

  var styleElement = document.createElement('style');
  styleElement.textContent = '@media (max-width: 850px) { ' +
    '.mdl-components .scroll { width: ' + scrollWidth + 'px; } }';
  document.body.appendChild(styleElement);

  this.scrollResized = true;
};

/**
 * Checks to see if the viewport is mobile, and triggers the scroll div
 * resizing the first time.
 */
MaterialComponents.prototype.checkMobile = function(mediaQuery) {
  this.isMobile = mediaQuery.matches;
  if (this.isMobile) {
    if(!this.scrollResized) { this.calculateScrollSize(); }
    this.stickyHeader();
  }
};

MaterialComponents.prototype.removeActiveState = function() {
  var activeComponents =
    document.getElementsByClassName('mdl-component active');

  while (activeComponents.length) {
    activeComponents[0].classList.remove('active');
  }
};

/**
 * Method for selecting a component to view with the navigation.
 */
MaterialComponents.prototype.setActiveState = function(componentName) {
  if (this.activeComponent != componentName) {
    this.activeComponent = componentName;

    var activeComponentElements =
      document.getElementsByClassName('mdl-component ' + componentName);
    var activeLeft = 0;

    if (activeComponentElements.length) {
      this.removeActiveState();
      for (var i = 0, component; component = activeComponentElements[i]; i++) {
        component.classList.add('active');
      }
    }
  }
};

/**
 * Watches for the header scrolling on mobile and makes the top nav sticky if
 * the page is scrolled beyond the main navigation.
 */
MaterialComponents.prototype.stickyHeader = function() {
  var distance = this.contentElement.offsetTop - this.layoutElement.scrollTop;

  if ((distance <= 0) && !this.stuck) {
    this.contentElement.classList.add('sticky');
    this.stuck = true;
  } else if (this.stuck &&
      (this.layoutElement.scrollTop <= this.contentElement.offsetTop)) {
    this.contentElement.classList.remove('sticky');
    this.stuck = false;
  }
};
