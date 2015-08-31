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

describe('MaterialSnackbar', function () {

  it('should be globally available', function () {
    expect(MaterialSnackbar).to.be.a('function');
  });

  it('should be upgradable', function() {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSnackbar');
    expect($(el)).to.have.data('upgraded', ',MaterialSnackbar');
  });

  it('should reveal showSnackbar to widget', function() {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSnackbar');
    expect(el.MaterialSnackbar.showSnackbar).to.be.a('function');
  });

  it('should throw an error if not provided data', function() {
    expect(function() {
      var el = document.createElement('div');
      componentHandler.upgradeElement(el, 'MaterialSnackbar');
      el.MaterialSnackbar.showSnackbar();
    }).to.throw('Please provide a data object with at least a message to display.');
  });

  it('should throw an error if not provided a message', function() {
    expect(function() {
      var el = document.createElement('div');
      componentHandler.upgradeElement(el, 'MaterialSnackbar');
      el.MaterialSnackbar.showSnackbar({});
    }).to.throw('Please provide a message to be displayed.');
  });

  it('should throw an error if not provided actionText with an actionHandler', function() {
    expect(function() {
      var el = document.createElement('div');
      componentHandler.upgradeElement(el, 'MaterialSnackbar');
      el.MaterialSnackbar.showSnackbar({
        message: 'Test message',
        actionHandler: function(event) {}
      });
    }).to.throw('Please provide action text with the handler.');
  });

});
