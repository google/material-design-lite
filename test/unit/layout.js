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

describe('MaterialLayout', function () {

  MockMediaQueryList = function(media) {
    this.media = media;
    this.listeners = [];
  }

  MockMediaQueryList.registry = {};

  MockMediaQueryList.mockMatchMedia = function(query) {
    if (! MockMediaQueryList.registry.hasOwnProperty(query)) {
      MockMediaQueryList.registry[query] = new MockMediaQueryList(query);
    }
    return MockMediaQueryList.registry[query];
  }

  MockMediaQueryList.prototype.addListener = function(listener) {
    this.listeners.push(listener);
  }

  MockMediaQueryList.prototype.triggerMatch = function(matches) {
    this.matches = matches;
    this.listeners.forEach(function(listener) {
      // PhantomJS doesn't support MediaQueryListEvent() so mock the event.
      var event = {media: this.media, matches: this.matches};
      listener(event);
    }.bind(this));
  }

  it('should be globally available', function () {
    expect(MaterialLayout).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = document.createElement('div');
    el.innerHTML = '<div class="mdl-layout__header"></div>' +
    '<div class="mdl-layout__drawer"></div>' +
    '<div class="mdl-layout__content"></div>';

    var parent = document.createElement('div');
    parent.appendChild(el); // MaterialLayout.init() expects a parent

    componentHandler.upgradeElement(el, 'MaterialLayout');
    expect($(el)).to.have.data('upgraded', ',MaterialLayout');
  });

  describe('Click on the tabs', function (done) {
     var el;
     var tab1, tab2;
     var content1, content2;

     beforeEach(function() {
       el = document.createElement('div');
       el.innerHTML = '' +
       '  <header class="mdl-layout__header">' +
       '    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">' +
       '      <a id="tab1" href="#scroll-tab-1" class="mdl-layout__tab is-active">Tab 1</a>' +
       '      <a id="tab2" href="#scroll-tab-2" class="mdl-layout__tab">Tab 2</a>' +
       '      <a id="tab3" href="#scroll-tab-3" class="mdl-layout__tab">Tab 3</a>' +
       '    </div>' +
       '  </header>' +
       '  <main class="mdl-layout__content">' +
       '    <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">' +
       '      <div class="page-content"><!-- Your content goes here --></div>' +
       '    </section>' +
       '    <section class="mdl-layout__tab-panel" id="scroll-tab-2">' +
       '      <div class="page-content"><!-- Your content goes here --></div>' +
       '    </section>' +
       '    <section class="mdl-layout__tab-panel" id="scroll-tab-3">' +
       '      <div class="page-content"><!-- Your content goes here --></div>' +
       '    </section>' +
       '  </main>';

       var parent = document.createElement('div');
       parent.appendChild(el); // MaterialLayout.init() expects a parent

       tab1 = el.querySelector('#tab1');
       tab2 = el.querySelector('#tab2');
       content1 = el.querySelector('#scroll-tab-1');
       content2 = el.querySelector('#scroll-tab-2');

       componentHandler.upgradeElement(el, 'MaterialLayout');
     });

     it('should activate the second tab on click', function (done) {
       var ev = document.createEvent('MouseEvents');
       ev.initEvent('click', true, true);
       tab2.dispatchEvent(ev);

       window.setTimeout(function () {
         expect($(tab1)).to.not.have.class('is-active');
         expect($(content1)).to.not.have.class('is-active');
         expect($(tab2)).to.have.class('is-active');
         expect($(content2)).to.have.class('is-active');
         done();
       }, 100);
     });

     it('should activate the second tab on custom show method', function (done) {
       tab2.show();

       window.setTimeout(function () {
         expect($(tab1)).to.not.have.class('is-active');
         expect($(content1)).to.not.have.class('is-active');
         expect($(tab2)).to.have.class('is-active');
         expect($(content2)).to.have.class('is-active');
         done();
       }, 100);
     });
   });

  describe('Drawer', function () {
    var el;
    var drawer, drawerBtn;
    var navLink;

    beforeEach(function() {
      this.originalMatchMedia = window.MaterialLayout.prototype.matchMedia_;
      window.MaterialLayout.prototype.matchMedia_ = MockMediaQueryList.mockMatchMedia;
      window.patched = 'yes patched';

      el = document.createElement('div');
      el.innerHTML = '<div class="mdl-layout__header"></div>' +
        '<div class="mdl-layout__drawer">' +
        '   <nav class="mdl-navigation">' +
        '     <a class="mdl-navigation__link" href="">Phones</a>' +
        '     <a class="mdl-navigation__link" href="">Tablets</a>' +
        '     <a class="mdl-navigation__link" href="">Wear</a>' +
        '   </nav>' +
        '</div>' +
        '<div class="mdl-layout__content"></div>';

      var parent = document.createElement('div');
      parent.appendChild(el);

      componentHandler.upgradeElement(el, 'MaterialLayout');

      drawer = el.querySelector('.mdl-layout__drawer');
      drawerBtn = el.querySelector('.mdl-layout__drawer-button');
      navLink = el.querySelector('.mdl-layout__drawer a');
    });

    afterEach(function() {
      window.MaterialLayout.prototype.matchMedia_ = this.originalMatchMedia;
    });

    it('should have attribute aria-hidden="true"', function () {
      var screenSizeHandler = MockMediaQueryList.registry[
          '(max-width: 1024px)'];

      // Expect hidden on small screen
      screenSizeHandler.triggerMatch(true);
      expect($(drawer)).to.have.attr('aria-hidden', 'true');

      // Expect hidden on wide screen
      screenSizeHandler.triggerMatch(false);
      expect($(drawer)).to.have.attr('aria-hidden', 'true');
    });

    it('should have attribute aria-hidden="false" for fixed drawer', function () {
      $(el).addClass('mdl-layout--fixed-drawer');

      var screenSizeHandler = MockMediaQueryList.registry[
          '(max-width: 1024px)'];

      // Expect hidden on small screen
      screenSizeHandler.triggerMatch(true);
      expect($(drawer)).to.have.attr('aria-hidden', 'true');

      // Expect shown on wide screen
      screenSizeHandler.triggerMatch(true);
      expect($(drawer)).to.have.attr('aria-hidden', 'true');
    });

    it('button should have attribute aria-expanded="false"', function () {
      expect($(drawerBtn)).to.have.attr('aria-expanded', 'false');
    });

    it('and drawer button should have correct values for attributes aria-hidden and aria-expanded', function () {
      var ev = document.createEvent('MouseEvents');
      ev.initEvent('click', true, true);
      drawerBtn.dispatchEvent(ev);

      expect($(drawer)).to.have.attr('aria-hidden', 'false');
      expect($(drawerBtn)).to.have.attr('aria-expanded', 'true');
    });

    it('should be closed on hit ESCAPE', function () {
      var ev = document.createEvent('KeyboardEvent');
      ev.initEvent('keydown', true, true, null, false, false, false, false, 27, 0);
      drawer.dispatchEvent(ev);

      expect($(drawer)).to.not.have.class('is-visible');
      expect($(drawer)).to.have.attr('aria-hidden', 'true');
      expect($(drawerBtn)).to.have.attr('aria-expanded', 'false');
    });
  });

  describe('Manual switch mode', function () {
    it('should disable content switching', function (done) {
      var el = document.createElement('div');
      el.innerHTML = '' +
        '  <header class="mdl-layout__header">' +
        '    <div class="mdl-layout__tab-bar mdl-js-ripple-effect mdl-layout__tab-manual-switch">' +
        '      <a id="tab1" href="#scroll-tab-1" class="mdl-layout__tab is-active">Tab 1</a>' +
        '      <a id="tab2" href="#scroll-tab-2" class="mdl-layout__tab">Tab 2</a>' +
        '    </div>' +
        '  </header>' +
        '  <main class="mdl-layout__content">' +
        '    <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">' +
        '      <div class="page-content"><!-- Your content goes here --></div>' +
        '    </section>' +
        '    <section class="mdl-layout__tab-panel" id="scroll-tab-2">' +
        '      <div class="page-content"><!-- Your content goes here --></div>' +
        '    </section>' +
        '  </main>';

      var parent = document.createElement('div');
      parent.appendChild(el); // MaterialLayout.init() expects a parent

      var tab1 = el.querySelector('#tab1');
      var tab2 = el.querySelector('#tab2');
      var content1 = el.querySelector('#scroll-tab-1');
      var content2 = el.querySelector('#scroll-tab-2');

      componentHandler.upgradeElement(el, 'MaterialLayout');

      var ev = document.createEvent('MouseEvents');
      ev.initEvent('click', true, true);
      tab2.dispatchEvent(ev);

      window.setTimeout(function() {
        // Since content switching has been set to manual, layout shouldn't
        // have been switched.
        expect($(tab1)).to.have.class('is-active');
        expect($(content1)).to.have.class('is-active');
        expect($(tab2)).to.not.have.class('is-active');
        expect($(content2)).to.not.have.class('is-active');
        done();
      }, 100);
    });
  });
});
