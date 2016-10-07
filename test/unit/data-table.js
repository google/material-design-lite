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

var TABLE_TEMPLATE = '<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable" id="data-table-test">' +
      '<thead>' +
      '  <tr>' +
      '    <th class="mdl-data-table__cell--non-numeric">Material</th>' +
      '    <th>Quantity</th>' +
      '    <th>Unit price</th>' +
      '  </tr>' +
      '</thead>' +
      '<tbody>' +
      '  <tr>' +
      '    <td class="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>' +
      '    <td>25</td>' +
      '    <td>$2.90</td>' +
      '  </tr>' +
      '  <tr class="is-selected second-row">' +
      '    <td class="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>' +
      '    <td>50</td>' +
      '    <td>$1.25</td>' +
      '  </tr>' +
      '</tbody>' +
    '</table>';

describe('MaterialDataTable', function () {

  it('should be globally available', function () {
    expect(MaterialDataTable).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = document.createElement('div');
    el.innerHTML = TABLE_TEMPLATE;

    componentHandler.upgradeElement(el, 'MaterialDataTable');
    expect($(el)).to.have.data('upgraded', ',MaterialDataTable');
  });

  it('should have is-checked class when the row has the is-selected class', function () {
    var el = document.createElement('div');
    el.innerHTML = TABLE_TEMPLATE;
    document.body.appendChild(el);
    table = document.querySelector('#data-table-test')
    componentHandler.upgradeElement(table, 'MaterialDataTable');
    expect(table.querySelector('.second-row label').classList.contains('is-checked')).to.be.true;
  });

});