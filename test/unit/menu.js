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

  function createMenu() {
    var el = document.createElement('div');
    el.classList.add('mdl-menu');

    var list = document.createElement('ul');
    list.classList.add('mdl-menu__list');
    el.appendChild(list);

    return el;
  }

  it('should be globally available', function () {
    expect(MaterialMenu).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    el = createMenu();

    var menu = new MaterialMenu(el);
    expect(menu).to.be.an.instanceof(MaterialMenu);
  });

  it('should not upgrade without a list', function () {
    var el = document.createElement('div');
    el.classList.add('mdl-menu');

    expect(function() { new MaterialMenu(el) }).to.throw(Error);
  });

  describe('.buildDom()', function () {
    it('should return a valid DOM with no parameters', function() {
      var el = MaterialMenu.buildDom();
      expect(el).to.be.an.instanceof(Element);
      var sw = new MaterialMenu(el);
      expect(sw).to.be.an.instanceof(MaterialMenu);
    });

    it('should return a valid DOM with a provided list of items', function() {
      var testItems = ['foo', 'bar', 'foobar'];
      var el = MaterialMenu.buildDom({
        items: testItems
      });
      expect(el).to.be.an.instanceof(Element);
      var items = el.querySelectorAll('.mdl-menu__item');
      expect(items.length).to.be.equal(3);
      for (var i = 0; i < items.length; i++) {
        expect(items[i].textContent).to.be.equal(testItems[i]);
      }
    });
  });

  it('should start the showing animation on show()', function(done) {
    var el = createMenu();
    var menu = new MaterialMenu(el);

    expect(el.classList.contains('is-visible')).to.be.false;
    menu.show();
    window.setTimeout(function() {
      expect(el.classList.contains('is-visible')).to.be.true;
      done();
    }, 100);
  });

  it('should start the hiding animation on hide()', function(done) {
    var el = createMenu();
    var menu = new MaterialMenu(el);

    menu.show();
    window.setTimeout(function() {
      expect(el.classList.contains('is-visible')).to.be.true;
      menu.hide();
      window.setTimeout(function() {
        expect(el.classList.contains('is-visible')).to.be.false;
        done();
      }, 100);
    }, 100);
  });

  it('should start the showing animating on toggle() when invisible', function(done) {
    var el = createMenu();
    var menu = new MaterialMenu(el);

    expect(el.classList.contains('is-visible')).to.be.false;
    menu.toggle();
    window.setTimeout(function() {
      expect(el.classList.contains('is-visible')).to.be.true;
      done();
    }, 100);
  });

  it('should start the hiding animating on toggle() when visible', function(done) {
    var el = createMenu();
    var menu = new MaterialMenu(el);

    menu.show();
    window.setTimeout(function() {
      expect(el.classList.contains('is-visible')).to.be.true;
      menu.toggle();
      window.setTimeout(function() {
        expect(el.classList.contains('is-visible')).to.be.false;
        done();
      }, 100);
    }, 100);
  });

  it('should be anchored to the anchor', function (done) {
    var anchor = document.createElement('button');
    anchor.id = 'menuAnchor';

    var el = document.createElement('div');
    el.classList.add('mdl-menu');
    el.setAttribute('data-mdl-anchor', 'menuAnchor');

    var list = document.createElement('ul');
    list.classList.add('mdl-menu__list');
    list.innerHTML = '<li class="mdl-menu__item">5.0 Lollipop</li> ' +
                    '<li class="mdl-menu__item">4.4 KitKat</li> ' +
                    '<li disabled class="mdl-menu__item">4.3 Jelly Bean</li> ' +
                    '<li class="mdl-menu__item">Android History</li>';
    el.appendChild(list);

    document.body.appendChild(anchor);
    document.body.appendChild(el);

    var menu = new MaterialMenu(el);
    menu.show();
    window.setTimeout(function() {
      var anchorRect = anchor.getBoundingClientRect();
      var menuRect = el.getBoundingClientRect();

      expect(menuRect.left).to.equal(anchorRect.left);
      expect(menuRect.top).to.equal(anchorRect.bottom);
      done();
    }, 100);
  });
});
