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

/*global describe, it, expect, MaterialDialog, componentHandler */

describe('MaterialDialog', function () {

  function createDialog() {
    var dialog = document.createElement('div');
    dialog.className = 'mdl-dialog mdl-js-dialog';
    var content = document.createElement('div');
    content.classList.add('mdl-dialog__content');
    content.textContent = 'Test dialog content.';
    var actions = document.createElement('div');
    actions.classList.add('mdl-dialog__actions');
    var closeButton = document.createElement('button');
    closeButton.classList.add('mdl-button');
    closeButton.textContent = 'Close';
    closeButton.type = 'button';
    actions.appendChild(closeButton);
    dialog.appendChild(content);
    dialog.appendChild(actions);

    return dialog;
  }

  it('should be globally available', function () {
    expect(MaterialDialog).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var dialog = createDialog();

    componentHandler.upgradeElement(dialog, 'MaterialDialog');
    expect($(dialog)).to.have.data('upgraded', ',MaterialDialog');
  });

  it('should have public methods available via widget', function () {
    var dialog = createDialog();
    componentHandler.upgradeElement(dialog, 'MaterialDialog');
    var methods = [
      'show',
      'showModal',
      'close'
    ];
    methods.forEach(function (item) {
      expect(dialog.MaterialDialog[item]).to.be.a('function');
    });
  });

  it('should open when show is called', function () {
    var dialog = createDialog();
    componentHandler.upgradeElement(dialog, 'MaterialDialog');
    dialog.MaterialDialog.show();
    expect(dialog.hasAttribute('open')).to.equal(true);
    dialog.MaterialDialog.close();
  });

  it('should open with backdrop when showModal is called', function () {
    var dialog = createDialog();
    componentHandler.upgradeElement(dialog, 'MaterialDialog');
    dialog.MaterialDialog.showModal();
    expect(document.querySelector('.mdl-dialog-backdrop').nodeName).to.equal('DIV');
    expect(dialog.hasAttribute('open')).to.equal(true);
    dialog.MaterialDialog.close();
  });

  it('should close when close is called', function () {
    var dialog = createDialog();
    componentHandler.upgradeElement(dialog, 'MaterialDialog');
    dialog.MaterialDialog.show();
    expect(dialog.hasAttribute('open')).to.equal(true);
    dialog.MaterialDialog.close();
    expect(dialog.hasAttribute('open')).to.equal(false);
  });

  it('should remove the modal backdrop when closed', function () {
    var dialog = createDialog();
    componentHandler.upgradeElement(dialog, 'MaterialDialog');
    dialog.MaterialDialog.showModal();
    expect(document.querySelector('.mdl-dialog-backdrop').nodeName).to.equal('DIV');
    dialog.MaterialDialog.close();
    expect(document.querySelector('.mdl-dialog-backdrop')).to.equal(null);
  });
});
