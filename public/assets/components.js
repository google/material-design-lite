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

function MaterialComponentsNav() {
  'use strict';

  this.element_ = document.querySelector('.mdl-js-components');
  if (this.element_) {
    this.componentLinks = this.element_.querySelectorAll('.mdl-components__link');
    this.activeLink = null;
    this.activePage = null;

    this.init();
  }
}

/**
 * Stores a Map of the components links using their corresponding hashFragment
 * as key.
 * @type {Object.<string, HTMLElement>}
 * @private
 */
MaterialComponentsNav.prototype.linksMap_ = {};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialComponentsNav.prototype.CssClasses_ = {
  ACTIVE: 'is-active'
};

/**
 * Initializes the MaterialComponentsNav component.
 */
MaterialComponentsNav.prototype.init = function() {
  'use strict';

  for (var i = 0; i < this.componentLinks.length; i++) {
    this.componentLinks[i].addEventListener('click',
        this.clickHandler(this.componentLinks[i]));
    // Mapping the list of links using their hash fragment.
    this.linksMap_['#' + this.componentLinks[i].href.split('#')[1]] =
        this.componentLinks[i];
  }

  // If a Hash fragment is available on the page then display the section.
  this.displaySectionForFragment(window.location.hash.split('/')[0]);

  // If the hash fragment changes we display the corresponding section.
  // We won't support older browser as it's not efficient.
  if ('onhashchange' in window) {
    var this_ = this;
    window.onhashchange = function () {
      this_.displaySectionForFragment(window.location.hash.split('/')[0]);
    };
  }
};

/**
 * Displays the section for the given hash fragment.
 * @param  {String} fragment The hash fragment used in the link to the section
 */
MaterialComponentsNav.prototype.displaySectionForFragment = function(fragment) {
  'use strict';

  if (fragment && this.linksMap_[fragment] && this.linksMap_[fragment].click) {
    this.linksMap_[fragment].click();
  } else if (!fragment || fragment === '' || fragment === '#') {
    this.displayIndexPage();
  }
};

/**
 * Displays the index page for the components.
 */
MaterialComponentsNav.prototype.displayIndexPage = function() {
  'use strict';

  if (this.activeLink) {
    this.activeLink.classList.remove(this.CssClasses_.ACTIVE);
  }
  this.activeLink = null;
  if (this.activePage) {
    this.activePage.classList.remove(this.CssClasses_.ACTIVE);
  }
  this.activePage = this.element_.querySelector('#index-section');
  this.activePage.classList.add(this.CssClasses_.ACTIVE);
}

/**
 * Returns a clickHandler for a navigation link.
 * @param  {HTMLElement} link the navigation link
 * @return {function} the click handler
 */
MaterialComponentsNav.prototype.clickHandler = function(link) {
  'use strict';

  return function(e) {
    e.preventDefault();
    var page = this.findPage(link);
    if (this.activePage) {
      this.activePage.classList.remove(this.CssClasses_.ACTIVE);
    }
    if (this.activeLink) {
      this.activeLink.classList.remove(this.CssClasses_.ACTIVE);
    }

    this.activePage = page;
    this.activeLink = link;

    link.classList.add(this.CssClasses_.ACTIVE);
    page.classList.add(this.CssClasses_.ACTIVE);

    // Add an history entry and display the hash fragment in the URL.
    var section = window.location.hash.split('/')[0];
    var linkWithoutHash = link.href.split('#')[1];
    if (section !== '#' + linkWithoutHash) {
      history.pushState(null, 'Material Design Lite', link);
      // Scroll to top of page
      document.getElementById('content').scrollTop = 0;
      // Track the specific component page view in Google analytics
      if (ga) {
        ga('send', 'pageview', '/components/' + linkWithoutHash);
      }
    }
    return true;
  }.bind(this);
};

/**
 * Finds the corresponding page for a navigation link.
 * @param  {HTMLElement} link the navigation link
 * @return {HTMLElement} the corresponding page
 */
MaterialComponentsNav.prototype.findPage = function(link) {
  'use strict';

  var href = link.href.split('#')[1];
  return this.element_.querySelector('#' + href);
};

window.addEventListener('load', function() {
  'use strict';

  new MaterialComponentsNav();
});
