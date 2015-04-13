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


  describe('column-layout tests', function () {

    it('Should have MaterialColumnLayout globally available', function () {
      expect(MaterialColumnLayout).to.be.a('function');
    });

    it('Should be upgraded to a MaterialColumnLayout successfully', function () {
      var el = document.createElement('div');
      componentHandler.upgradeElement(el, 'MaterialColumnLayout');
      expect($(el)).to.have.data('upgraded', ',MaterialColumnLayout');
    });
  });
