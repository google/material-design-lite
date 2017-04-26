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

describe('MaterialTabs', function () {

  it('should be globally available', function () {
    expect(MaterialTabs).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = document.createElement('div');
    el.innerHTML = '' +
    '<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">' +
    '  <div class="mdl-tabs__tab-bar">' +
    '  </div>' +
    '</div>';

    componentHandler.upgradeElement(el, 'MaterialTabs');
    expect($(el)).to.have.data('upgraded', ',MaterialTabs');
  });

  describe('Click on the tabs', function () {

    var el;
    var tab1;
    var tab2;
    var content1;
    var content2;

    before(function() {
      el = document.createElement('div');
      el.innerHTML = '' +
      '<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">' +
      '  <div class="mdl-tabs__tab-bar">' +
      '   <a href="#content1" class="mdl-tabs__tab">1</a>' +
      '   <a href="#content2" class="mdl-tabs__tab">2</a>' +
      '   <a href="#content3" class="mdl-tabs__tab">3</a>' +
      ' </div>' +
      ' <div class="mdl-tabs__panel" id="content1"></div>' +
      ' <div class="mdl-tabs__panel" id="content2"></div>' +
      ' <div class="mdl-tabs__panel" id="content3"></div>' +
      '</div>';
      componentHandler.upgradeElement(el, 'MaterialTabs');

      // The docs do not specificy setting id on tab elements.
      tab1 = el.querySelector('a[href="#content1"]');
      tab2 = el.querySelector('a[href="#content2"]');
      content1 = el.querySelector('#content1');
      content2 = el.querySelector('#content2');
    });

    it('Should activate no tab by default', function (done) {
      window.setTimeout(function () {
        expect(el.querySelectorAll('.is-active')).to.have.length(0);
        done();
      }, 100);
    });

    it('Should activate the first tab on click', function (done) {
      var el = document.createEvent('MouseEvents');
      el.initEvent('click', true, true);
      tab1.dispatchEvent(el);

      window.setTimeout(function () {
        expect($(tab1)).to.have.class('is-active');
        expect($(content1)).to.have.class('is-active');
        done();
      }, 100);
    });

    it('Should activate the second tab on click', function (done) {
      var el = document.createEvent('MouseEvents');
      el.initEvent('click', true, true);
      tab2.dispatchEvent(el);

      window.setTimeout(function () {
        expect($(tab1)).to.not.have.class('is-active');
        expect($(content1)).to.not.have.class('is-active');
        expect($(tab2)).to.have.class('is-active');
        expect($(content2)).to.have.class('is-active');
        done();
      }, 100);
    });
  });
  
  describe('Keyboard navigation on the tabs', function () {

    var el;
    var tab1;
    var tab2;
    var content1;
    var content2;

    before(function() {
      el = document.createElement('div');
      // Docs require is-active to be set on initial tab and panel.
      el.innerHTML = '' +
      '<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">' +
      '  <div class="mdl-tabs__tab-bar">' +
      '   <a href="#content1" class="mdl-tabs__tab is-active">1</a>' +
      '   <a href="#content2" class="mdl-tabs__tab">2</a>' +
      '   <a href="#content3" class="mdl-tabs__tab">3</a>' +
      ' </div>' +
      ' <div class="mdl-tabs__panel is-active" id="content1"></div>' +
      ' <div class="mdl-tabs__panel" id="content2"></div>' +
      ' <div class="mdl-tabs__panel" id="content3"></div>' +
      '</div>';
      componentHandler.upgradeElement(el, 'MaterialTabs');

      // The docs do not specificy setting id on tab elements.
      tablist = el.querySelector('div[role="tablist"]');
      tab1 = el.querySelector('a[href="#content1"]');
      tab2 = el.querySelector('a[href="#content2"]');
      tab3 = el.querySelector('a[href="#content3"]');
      content1 = el.querySelector('#content1');
      content2 = el.querySelector('#content2');
      content3 = el.querySelector('#content3');      
    });

    it('Should activate first tab by default', function (done) {
      window.setTimeout(function () {
        // Check defaults.
        expect(el.querySelectorAll('.is-active')).to.have.length(2);
        expect($(tablist)).to.have.attr('role', 'tablist');
        expect($(tab1)).to.have.attr('role', 'tab');
        expect($(tab1)).to.have.attr('aria-controls', content1.id);
        expect($(tab1)).to.have.attr('aria-selected', 'true');
        expect($(tab1)).to.have.attr('tabindex', '0');
        expect($(content1)).to.have.attr('aria-labelledby', tab1.id);
        expect($(content1)).to.have.attr('role', 'tabpanel');
        expect($(tab2)).to.have.attr('role', 'tab');
        expect($(tab2)).to.have.attr('aria-controls', content2.id);
        expect($(tab2)).to.have.attr('aria-selected', 'false');
        expect($(tab2)).to.have.attr('tabindex', '-1');
        expect($(content2)).to.have.attr('aria-labelledby', tab2.id);
        expect($(content2)).to.have.attr('role', 'tabpanel');
        expect($(tab3)).to.have.attr('role', 'tab');
        expect($(tab3)).to.have.attr('aria-controls', content3.id);
        expect($(tab3)).to.have.attr('aria-selected', 'false');
        expect($(tab3)).to.have.attr('tabindex', '-1');
        expect($(content3)).to.have.attr('aria-labelledby', tab3.id);
        expect($(content3)).to.have.attr('role', 'tabpanel');        
        
        done();
      }, 100);
    });

    it('Should focus the second tab when right arrow is pressed', function (done) {
      tab1.click();
      var el = document.createEvent('Event');
      el.initEvent("keydown", true, true);
      // Set keycode to right arrow.
      el.keyCode = 39;
      tab1.dispatchEvent(el);

      window.setTimeout(function () {
        expect($(tab1)).to.not.have.class('is-active');
        expect($(tab1)).to.have.attr('tabindex', '-1');
        expect($(tab1)).to.have.attr('aria-selected', 'false');
        expect($(content1)).to.not.have.class('is-active');
        expect($(tab2)).to.have.class('is-active');
        expect($(tab2)).to.have.attr('tabindex', '0');
        expect($(tab2)).to.have.attr('aria-selected', 'true');
        expect($(content2)).to.have.class('is-active');
        done();
      }, 100);
    });

    it('Should activate the first tab when right arrow is pressed from last tab', function (done) {
      // Give focus to last tab.
      tab3.click();
      var el = document.createEvent('Event');
      el.initEvent("keydown", true, true);
      // Set keycode to right arrow.
      el.keyCode = 39;
      tab3.dispatchEvent(el);

      window.setTimeout(function () {
        expect($(tab3)).to.not.have.class('is-active');
        expect($(tab3)).to.have.attr('tabindex', '-1');
        expect($(tab3)).to.have.attr('aria-selected', 'false');
        expect($(content3)).to.not.have.class('is-active');
        expect($(tab1)).to.have.class('is-active');
        expect($(tab1)).to.have.attr('tabindex', '0');
        expect($(tab1)).to.have.attr('aria-selected', 'true');
        expect($(content1)).to.have.class('is-active');
        done();
      }, 100);
    });

    it('Should activate the last tab when left arrow is pressed from first tab', function (done) {
      // Give focus to first tab.
      tab1.click();
      var el = document.createEvent('Event');
      el.initEvent("keydown", true, true);
      // Set keycode to right arrow.
      el.keyCode = 37;
      tab1.dispatchEvent(el);

      window.setTimeout(function () {
        expect($(tab1)).to.not.have.class('is-active');
        expect($(tab1)).to.have.attr('tabindex', '-1');
        expect($(tab1)).to.have.attr('aria-selected', 'false');
        expect($(content1)).to.not.have.class('is-active');
        expect($(tab3)).to.have.class('is-active');
        expect($(tab3)).to.have.attr('tabindex', '0');
        expect($(tab3)).to.have.attr('aria-selected', 'true');
        expect($(content3)).to.have.class('is-active');
        done();
      }, 100);
    });    
  });

});
