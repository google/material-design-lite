/**
 * @license
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

/**
 * Class constructor for Data Table Card MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialDataTable(element) {
  'use strict';

  this.element_ = element;

  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialDataTable.prototype.Constant_ = {
  // None at the moment.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialDataTable.prototype.CssClasses_ = {
  DATA_TABLE: 'mdl-data-table',
  SELECTABLE: 'mdl-data-table--selectable',
  IS_SELECTED: 'is-selected',
  IS_UPGRADED: 'is-upgraded'
};

MaterialDataTable.prototype.selectRow_ = function(checkbox, row, rows) {
  'use strict';

  if (row) {
    return function() {
      if (checkbox.checked) {
        row.classList.add(this.CssClasses_.IS_SELECTED);
      } else {
        row.classList.remove(this.CssClasses_.IS_SELECTED);
      }
    }.bind(this);
  }

  if (rows) {
    return function() {
      var i;
      var el;
      if (checkbox.checked) {
        for (i = 0; i < rows.length; i++) {
          el = rows[i].querySelector('td').querySelector('.mdl-checkbox');
          el.MaterialCheckbox.check();
          rows[i].classList.add(this.CssClasses_.IS_SELECTED);
        }
      } else {
        for (i = 0; i < rows.length; i++) {
          el = rows[i].querySelector('td').querySelector('.mdl-checkbox');
          el.MaterialCheckbox.uncheck();
          rows[i].classList.remove(this.CssClasses_.IS_SELECTED);
        }
      }
    }.bind(this);
  }
};

MaterialDataTable.prototype.createCheckbox_ = function(row, rows) {
  'use strict';

  var label = document.createElement('label');
  label.classList.add('mdl-checkbox');
  label.classList.add('mdl-js-checkbox');
  label.classList.add('mdl-js-ripple-effect');
  label.classList.add('mdl-data-table__select');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('mdl-checkbox__input');
  if (row) {
    checkbox.addEventListener('change', this.selectRow_(checkbox, row));
  } else if (rows) {
    checkbox.addEventListener('change', this.selectRow_(checkbox, null, rows));
  }
  label.appendChild(checkbox);
  componentHandler.upgradeElement(label, 'MaterialCheckbox');
  return label;
};

/**
 * Initialize element.
 */
MaterialDataTable.prototype.init = function() {
  'use strict';

  if (this.element_) {

    var firstHeader = this.element_.querySelector('th');
    var rows = this.element_.querySelector('tbody').querySelectorAll('tr');

    if (this.element_.classList.contains(this.CssClasses_.SELECTABLE)) {
      var th = document.createElement('th');
      var headerCheckbox = this.createCheckbox_(null, rows);
      th.appendChild(headerCheckbox);
      firstHeader.parentElement.insertBefore(th, firstHeader);

      for (var i = 0; i < rows.length; i++) {
        var firstCell = rows[i].querySelector('td');
        if (firstCell) {
          var td = document.createElement('td');
          var rowCheckbox = this.createCheckbox_(rows[i]);
          td.appendChild(rowCheckbox);
          rows[i].insertBefore(td, firstCell);
        }
      }
    }

    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialDataTable,
  classAsString: 'MaterialDataTable',
  cssClass: 'mdl-js-data-table'
});
