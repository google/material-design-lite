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


  describe('button tests', function () {

    it('Should have MaterialButton globally available', function () {
      expect(MaterialButton).to.be.a('function');
    });

    it('Should be upgraded to a MaterialButton successfully', function () {
      var el = document.createElement('button');
      componentHandler.upgradeElement(el, 'MaterialButton');
      expect($(el)).to.have.data('upgraded', ',MaterialButton');
    });

    it('Should be upgraded to a raised MaterialButton button with ripples successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Raised</button>';
      var btn = el.firstChild;
      componentHandler.upgradeElement(btn, 'MaterialButton');
      expect($(btn.childNodes[1])).to.have.class('mdl-button__ripple-container');
      expect($(btn.childNodes[1].firstChild)).to.have.class('mdl-ripple');
    });

    it('Should be upgraded to a MaterialButton FAB with ripples successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect">♥</button>';
      var btn = el.firstChild;
      componentHandler.upgradeElement(btn, 'MaterialButton');
      expect($(btn.childNodes[1])).to.have.class('mdl-button__ripple-container');
      expect($(btn.childNodes[1].firstChild)).to.have.class('mdl-ripple');
    });

    it('Should be upgraded to a MaterialButton FAB with ripples successfully (without specifying jsClass)', function () {
      var el = document.createElement('div');
      el.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect">♥</button>';
      var btn = el.firstChild;
      componentHandler.upgradeElement(btn);
      expect($(btn.childNodes[1])).to.have.class('mdl-button__ripple-container');
      expect($(btn.childNodes[1].firstChild)).to.have.class('mdl-ripple');
    });
  });
