/**
 * Copyright 2016 Google Inc. All Rights Reserved.
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

const TAB_DATA = 'data-mdl-tabindex';
const TAB_DATA_HANDLED = 'data-mdl-tabindex-handled';

let storedTransformPropertyName_;

/**
 * Remap touch events to pointer events, if the browser doesn't support touch events.
 * @param {string} eventName The requested event name.
 * @param {Object} globalObj The global object, useful for testing (defaults to window).
 * @return {string} The remapped event name.
 */
function remapEvent(eventName, globalObj = window) {
  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
      case 'touchstart':
        return 'pointerdown';
      case 'touchmove':
        return 'pointermove';
      case 'touchend':
        return 'pointerup';
      default:
        return eventName;
    }
  }

  return eventName;
}

/**
 * Choose the correct transform property to use on the current browser.
 * @param {Object} globalObj The global object, useful for testing (defaults to window).
 * @return {string} The transform property name.
 */
function getTransformPropertyName(globalObj = window) {
  if (storedTransformPropertyName_ === undefined || globalObj !== window) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : '-webkit-transform');

    if (globalObj === window) {
      storedTransformPropertyName_ = transformPropertyName;
    }
    return transformPropertyName;
  }

  return storedTransformPropertyName_;
}

/**
 * Determine whether the current browser supports CSS properties.
 * @param {Object} globalObj The global object, useful for testing (defaults to window).
 * @return {boolean} Whether the current browser supports CSS properties.
 */
function supportsCssCustomProperties(globalObj = window) {
  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }
  return false;
}

/**
 * Save the tab state for an element.
 * @param {Element} el The element for which to save the tab state.
 */
function saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }
  el.setAttribute(TAB_DATA_HANDLED, true);
}

/**
 * Restore the tab state for an element, if it was saved.
 * @param {Element} el The element for which to restore the tab state.
 */
function restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }
    el.removeAttribute(TAB_DATA_HANDLED);
  }
}

export {remapEvent, getTransformPropertyName, supportsCssCustomProperties, saveElementTabState, restoreElementTabState};
