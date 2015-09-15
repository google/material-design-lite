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

describe('MaterialMenu', function () {

  it('should be globally available', function () {
    expect(MaterialMenu).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var parent = document.createElement('div'), // parent must exist for MaterialMenu.init()
      el = document.createElement('ul');
    parent.appendChild(el)

    componentHandler.upgradeElement(el, 'MaterialMenu');
    expect($(el)).to.have.data('upgraded', ',MaterialMenu');
  });

  describe ('visibility API', function () {
    var parent;
    var el;

    before(function() {
      parent = document.createElement('div'); // parent must exist for MaterialMenu.init()
      el = document.createElement('ul');
      parent.appendChild(el)
      componentHandler.upgradeElement(el, 'MaterialMenu');
    });

    it('should start the showing animation on show()', function(done) {
      expect($(el.parentElement)).to.not.have.class('is-visible');
      el.MaterialMenu.show();
      window.setTimeout(function() {
        expect($(el.parentElement)).to.have.class('is-visible');

        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('transitionend', true, true)
        el.dispatchEvent(ev);
        done();
      }, 100);
    });

    it('should start the hiding animation on hide()', function(done) {
      expect($(el.parentElement)).to.have.class('is-visible');
      el.MaterialMenu.hide();
      window.setTimeout(function() {
        expect($(el.parentElement)).to.not.have.class('is-visible');

        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('transitionend', true, true)
        el.dispatchEvent(ev);
        done();
      }, 100);
    });

    it('should start the showing animating on toggle() when invisible', function(done) {
      expect($(el.parentElement)).to.not.have.class('is-visible');
      el.MaterialMenu.toggle();
      window.setTimeout(function() {
        expect($(el.parentElement)).to.have.class('is-visible');

        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('transitionend', true, true)
        el.dispatchEvent(ev);
        done();
      }, 100);
    });

    it('should start the hiding animating on toggle() when visible', function(done) {
      expect($(el.parentElement)).to.have.class('is-visible');
      el.MaterialMenu.toggle();
      window.setTimeout(function() {
        expect($(el.parentElement)).to.not.have.class('is-visible');

        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('transitionend', true, true)
        el.dispatchEvent(ev);
        done();
      }, 100);
    });

  });

  it('Should be made visible on button click', function (done) {
    var ctr = document.createElement('div')
    ctr.innerHTML = '<button id="clickable">Menu</button>' +
                    '<ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect" for="clickable">' +
                    '  <li class="mdl-menu__item">5.0 Lollipop</li>' +
                    '  <li class="mdl-menu__item">4.4 KitKat</li>' +
                    '  <li disabled class="mdl-menu__item">4.3 Jelly Bean</li>' +
                    '  <li class="mdl-menu__item">Android History</li>' +
                    '</ul>';
    document.body.appendChild(ctr); // `for` only works in document

    var el = ctr.querySelector('ul');
    componentHandler.upgradeElement(el, 'MaterialMenu');

    var ev = document.createEvent('MouseEvents');
    ev.initEvent('click', true, true);
    ctr.querySelector('#clickable').dispatchEvent(ev);
    window.setTimeout(function() {
      expect($(el.parentElement)).to.have.class('is-visible');
      document.body.removeChild(ctr);
      done();
    }, 100);
  });

});
