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

function CodeBlockCodePen() {
  'use strict';

  this.htmlCodeBlocks = document.getElementsByClassName('language-markup');
  this.init();
}

/**
 * Creates CodePen buttons in all code blocks (`pre`) that are HTML.
 */
CodeBlockCodePen.prototype.init = function() {
  'use strict';

  // Also insert the MDL Library.
  var mdlLibs = [
      '<!-- MDL library and Material icons font -->',
      '<link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">',
      '<link rel="stylesheet" href="$$hosted_libs_prefix$$/$$version$$/material.indigo-pink.min.css">',
      '<script src="$$hosted_libs_prefix$$/$$version$$/material.min.js"></script>',
      // TODO: Remove below before launch. For testing only.
      '<link rel="stylesheet" href="https://storage.googleapis.com/materialdesignlite/material.css">',
      '<script src="https://storage.googleapis.com/materialdesignlite/material.min.js"></script>'
  ];

  for (var i = 0, len = this.htmlCodeBlocks.length; i < len; i++) {
    var pre = this.htmlCodeBlocks[i];

    // If pre is a <code> node we check if it's enclosed in a <pre> tag and
    // process that instead.
    if (pre.tagName.toLowerCase() !== 'pre') {
      pre = pre.parentNode;
    }
    // Verify there is not already a codePen Button and that we are in a <pre>.
    if (pre.getElementsByTagName('form').length > 0 ||
        pre.tagName.toLowerCase() !== 'pre') {
      continue;
    }

    // Extract <style> blocks from the source code.
    var code = pre.innerText;
    var styleLines = [
      'body {',
      'padding: 40px;',
      '}'
    ];
    while (code.indexOf('<style>') !== -1) {
      var startIndex = code.indexOf('<style>');
      var endIndex = code.indexOf('</style>');
      var styleBlock = code.substring(startIndex + 7, endIndex).trim();
      var styleBlockLines = styleBlock.split('\n').map(
        function(elem) {
          return elem.trim();
        });
      styleLines = styleLines.concat(styleBlockLines);
      code = code.substr(endIndex + 8);
    }

    // Create the CodePen Form and add it to the <pre> block.
    var form = document.createElement('form');
    form.classList.add('codepen-button');
    form.setAttribute('action', 'http://codepen.io/pen/define');
    form.setAttribute('method', 'POST');
    form.addEventListener('click', this.clickHandler(form));
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'data');
    input.setAttribute('value', JSON.stringify(
      {html: '<html>\n  <head>\n    ' +
          mdlLibs.join('\n    ') +
          '\n  </head>\n  <body>\n    ' +
          code.split('\n').join('\n    ').trim() +
          '\n  </body>\n</html>',
      css: styleLines.join('\n')}));
    form.appendChild(input);
    pre.appendChild(form);
  }
};

/**
 * Click handler for CodePEn buttons. Simply submits the form to CodePen.
 */
CodeBlockCodePen.prototype.clickHandler = function(form) {
  'use strict';

  return function() {
    form.submit();
  };
};

window.addEventListener('load', function() {
  'use strict';

  new CodeBlockCodePen();
});
