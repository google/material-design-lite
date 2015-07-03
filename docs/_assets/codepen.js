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

// Also insert the MDL Library.
CodeBlockCodePen.prototype.MDLIBS = [
  // TODO: Remove below before launch. For testing only.
  '<!-- For testing. TODO: Remove before launch -->',
  '<script src="https://mdl-staging.storage.googleapis.com/material.min.js"></script>',
  '<!-- Material Design Lite -->',
  '<script src="$$hosted_libs_prefix$$/$$version$$/material.min.js"></script>',
  '<!-- Material Design icon font -->',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'
];

// Also insert the MDL CSS.
CodeBlockCodePen.prototype.MDLCSS = [
  // TODO: Remove below before launch. For testing only.
  '/* For testing. TODO: Remove before launch */',
  '@import url("https://mdl-staging.storage.googleapis.com/material.min.css");',
  '/* Material Design Lite */',
  '@import url("$$hosted_libs_prefix$$/$$version$$/material.indigo-pink.min.css");',
  '',
];

/**
 * Creates CodePen buttons in all code blocks (`pre`) that are HTML.
 */
CodeBlockCodePen.prototype.init = function() {
  'use strict';

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

    // Create the CodePen Form and add it to the <pre> block.
    var form = document.createElement('form');
    form.classList.add('codepen-button');
    form.setAttribute('action', 'https://codepen.io/pen/define');
    form.setAttribute('method', 'POST');
    form.setAttribute('target', '_blank');
    form.addEventListener('click', this.clickHandler(form, pre));

    pre.appendChild(form);
  }
};

/**
 * Click handler for CodePEn buttons. Simply submits the form to CodePen.
 */
CodeBlockCodePen.prototype.clickHandler = function(form, pre) {
  'use strict';

  return function() {

    // Modify relative URLs to make them absolute.
    var code = pre.textContent.replace('../assets/demos/',
      window.location.origin + '/assets/demos/');

    // Extract <style> blocks from the source code.
    var styleLines = this.MDLCSS.slice();

    while (code.indexOf('<style>') !== -1) {
      var startIndex = code.indexOf('<style>');
      var endIndex = code.indexOf('</style>');
      var styleBlock = code.substring(startIndex + 7, endIndex).trim();
      var styleBlockLines = styleBlock.split('\n').map(
        function(elem) {
          return elem.trim();
        });
      styleLines = styleLines.concat(styleBlockLines);
      code = code.substring(0, startIndex).trim() + '\n' +
        code.substr(endIndex + 8).trim();
    }

    // Remove <input> children from previous clicks.
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'data');
    input.setAttribute('value', JSON.stringify(
      {html: '<html>\n  <head>\n    ' +
      this.MDLIBS.join('\n    ') +
      '\n  </head>\n  <body>\n    ' +
      code.split('\n').join('\n    ').trim() +
      '\n  </body>\n</html>',
        css: styleLines.join('\n').trim()}));
    form.appendChild(input);

    form.submit();
  }.bind(this);
};

window.addEventListener('load', function() {
  'use strict';

  new CodeBlockCodePen();
});
