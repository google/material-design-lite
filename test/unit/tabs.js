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
      '   <a href="#content1" id="tab1" class="mdl-tabs__tab">1</a>' +
      '   <a href="#content2" id="tab2" class="mdl-tabs__tab">2</a>' +
      '   <a href="#content3" id="tab3" class="mdl-tabs__tab">3</a>' +
      ' </div>' +
      ' <div class="mdl-tabs__panel" id="content1"></div>' +
      ' <div class="mdl-tabs__panel" id="content2"></div>' +
      ' <div class="mdl-tabs__panel" id="content3"></div>' +
      '</div>';
      componentHandler.upgradeElement(el, 'MaterialTabs');

      tab1 = el.querySelector('#tab1');
      tab2 = el.querySelector('#tab2');
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

});
