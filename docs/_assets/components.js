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

function MaterialComponents() {
  'use strict';

  this.element_ = document.querySelector('.mdl-js-components');
  this.componentLinks = this.element_.querySelectorAll('.mdl-components__link');

  this.activeLink = null;
  this.activePage = null;

  this.init();
}

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialComponents.prototype.CssClasses_ = {
  ACTIVE: 'is-active'
};

/**
 * Initializes the MaterialComponents component.
 */
MaterialComponents.prototype.init = function() {
  'use strict';

  this.activeLink = this.componentLinks[0];
  this.activePage = this.findPage(this.activeLink);

  for (var i = 0; i < this.componentLinks.length; i++) {
    this.componentLinks[i].addEventListener('click',
        this.clickHandler(this.componentLinks[i]));
  }
};

/**
 * Returns a clickHandler for a navigation link.
 * @param  {HTMLElement} link the navigation link
 * @return {function} the click handler
 */
MaterialComponents.prototype.clickHandler = function(link) {
  'use strict';

  var ctx = this;

  return function(e) {
    e.preventDefault();
    var page = ctx.findPage(link);
    ctx.activePage.classList.remove(ctx.CssClasses_.ACTIVE);
    ctx.activeLink.classList.remove(ctx.CssClasses_.ACTIVE);

    ctx.activePage = page;
    ctx.activeLink = link;

    link.classList.add(ctx.CssClasses_.ACTIVE);
    page.classList.add(ctx.CssClasses_.ACTIVE);
  };
};

/**
 * Finds the corresponding page for a navigation link.
 * @param  {HTMLElement} link the navigation link
 * @return {HTMLElement} the corresponding page
 */
MaterialComponents.prototype.findPage = function(link) {
  'use strict';

  var href = link.href.split('#')[1];
  return this.element_.querySelector('#' + href);
};

window.addEventListener('load', function() {
  'use strict';

  new MaterialComponents();
});
