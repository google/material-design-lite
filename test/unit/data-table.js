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

/*global describe, it, expect, MaterialDataTable, componentHandler */

describe('MaterialDataTable', function () {

  function createTable() {
    var table = document.createElement('table');
    table.classList.add('mdl-data-table');
    table.classList.add('mdl-js-data-table');

    table.createTHead();
    var headTh = document.createElement('th');
    table.querySelector('thead').appendChild(headTh);

    var tBodyRow = table.insertRow(0);
    tBodyRow.insertCell(0);

    return table;
  }

  it('should be globally available', function () {
    expect(MaterialDataTable).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var table = createTable();

    componentHandler.upgradeElement(table, 'MaterialDataTable');
    expect($(table)).to.have.data('upgraded', ',MaterialDataTable');
  });

  it('should have is-checked class when the row has the is-selected class', function () {
    var table = createTable();
    table.classList.add('mdl-data-table--selectable');
    var row = table.insertRow();
    row.classList.add('is-selected');
    row.insertCell();

    document.body.appendChild(table);

    var queryTable = document.querySelector('.mdl-data-table');
    componentHandler.upgradeElement(queryTable, 'MaterialDataTable');
    expect(queryTable.querySelector('tbody:nth-child(2) label').classList.contains('is-checked')).to.be.true;
  });

});
