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


  describe('tooltip tests', function () {

    it('Should have MaterialTooltip globally available', function () {
      expect(MaterialTooltip).to.be.a('function');
    });

    it('Should be upgraded to a MaterialTooltip successfully', function () {
      var parent = document.createElement('div');
      parent.innerHTML = '<div id="target"></div><div id="tooltip" for="target"></div>';
      document.body.appendChild(parent);

      var el = parent.querySelector('#tooltip');
      componentHandler.upgradeElement(el, 'MaterialTooltip');
      expect($(el)).to.have.data('upgraded', ',MaterialTooltip');
    });
  });
