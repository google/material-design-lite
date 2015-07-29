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
});
