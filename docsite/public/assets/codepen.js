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

  this.codepenButtons = document.getElementsByClassName('codepen-button');
  this.init();
}

// Also insert the MDL Library.
CodeBlockCodePen.prototype.MDLIBS = [
  '<!-- Material Design Lite -->',
  '<script src="$$hosted_libs_prefix$$/$$version$$/material.min.js"></script>',
  '<link rel="stylesheet" href="$$hosted_libs_prefix$$/$$version$$/material.indigo-pink.min.css">',
  '<!-- Material Design icon font -->',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'
];

/**
 * Creates CodePen buttons in all code blocks (`pre`) that are HTML.
 */
CodeBlockCodePen.prototype.init = function() {
  'use strict';

  [].slice.call(this.codepenButtons).forEach(function(form) {
    // Attach the click event to the codepen button.
    form.addEventListener('click', this.clickHandler(form, form.parentNode));
  }, this);
};

/**
 * Extracts the parts of the text that is inside occurrences of the tag and
 * endTag.
 * @param  {String} tag The start tag which content we need to extract
 * @param  {String} endTag The end tag which content we need to extract
 * @param  {String} text The text for which we need to extract the content in
 *                       the given tags
 * @return {Object} An Object with 2 attributes: textRemainder which contains
 *                  the text not inside any of the given tag. and tagContent
 *                  which contains a concatenation of what was inside the tags
 */
CodeBlockCodePen.prototype.extractTagsContent = function(tag, endTag, text) {
  'use strict';
  var tagStartIndex;
  var tagEndIndex;
  var tagText = '';

  while (text.indexOf(tag) !== -1) {
    tagStartIndex = text.indexOf(tag);
    tagEndIndex = text.indexOf(endTag);
    tagText += text.substring(tagStartIndex + tag.length, tagEndIndex);
    text = text.substring(0, tagStartIndex).trim() + '\n' +
      text.substr(tagEndIndex + endTag.length).trim();
  }

  return {textRemainder: text, tagContent: tagText};
};

/**
 * Click handler for CodePen buttons. Prepares the content for CodePen and
 * submits the form.
 * @param  {HTMLElement} form The CodePen form
 * @param  {HTMLElement} pre The pre containing the code to send to CodePen
 * @return {function} The click handler
 */
CodeBlockCodePen.prototype.clickHandler = function(form, pre) {
  'use strict';

  return function() {

    // Track codepen button clicks
    if (typeof ga !== 'undefined') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'codepen',
        eventAction: 'click',
        eventLabel: window.location.pathname +
          (window.location.hash ? window.location.hash : '')
      });
    }

    // Modify relative URLs to make them absolute.
    var code = pre.textContent.replace('../assets/demos/',
      window.location.origin + '/assets/demos/');

    // Extract <style> blocks from the source code.
    var cssExtractResult = this.extractTagsContent('<style>', '</style>',
      code);

    code = cssExtractResult.textRemainder;
    var css = cssExtractResult.tagContent.trim();

    // Extract <script> blocks from the source code.
    var jsExtractResult = this.extractTagsContent('<script>', '</script>',
      code);

    code = jsExtractResult.textRemainder.trim();
    var js = jsExtractResult.tagContent.trim();

    // Remove <input> children from previous clicks.
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'data');
    input.setAttribute('value', JSON.stringify(
      {
        title: 'Material Design Lite components demo',
        html:
          '<html>\n' +
          '  <head>\n    ' + this.MDLIBS.join('\n    ') + '\n  </head>\n' +
          '  <body>\n    ' + code.split('\n').join('\n    ') + '\n  </body>\n' +
          '</html>',
        css: css,
        js: js}));
    form.appendChild(input);

    form.submit();
  }.bind(this);
};

window.addEventListener('load', function() {
  'use strict';

  new CodeBlockCodePen();
});
