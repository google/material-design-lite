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

(function() {
'use strict';

var codeList = document.getElementsByTagName('pre');

for (var i = 0; i < codeList.length; i++) {
  var elem = codeList[i];
  var jsonString = JSON.stringify({
      html: elem.innerText || '',
      css: '',
      js: ''
    })
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  var form =
    '<form name="pen-form" action="http://codepen.io/pen/define" ' +
    'method="POST" target="_blank">' +
      '<input type="hidden" name="data" value=\'' +
      jsonString +
      '\'>' +
      '<input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" ' +
      'class="codepen-mover-button" width="40" height="40" ' +
      'value="Create New Pen with Prefilled Data">' +
    '</form>';

  elem.innerHTML += form;
}

})();

