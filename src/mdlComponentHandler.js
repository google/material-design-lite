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
 * A component handler interface using the revealing module design pattern.
 * More details on this design pattern here:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @author Jason Mayes.
 */
/* exported componentHandler */
var componentHandler = (function() {
  'use strict';

  var registeredComponents_ = [];
  var createdComponents_ = [];
  var downgradeMethod_ = 'mdlDowngrade_';
  var componentConfigProperty_ = 'mdlComponentConfigInternal_';

  /**
   * Searches registered components for a class we are interested in using.
   * Optionally replaces a match with passed object if specified.
   * @param {string} name The name of a class we want to use.
   * @param {object} optReplace Optional object to replace match with.
   * @return {object | false}
   * @private
   */
  function findRegisteredClass_(name, optReplace) {
    for (var i = 0; i < registeredComponents_.length; i++) {
      if (registeredComponents_[i].className === name) {
        if (optReplace !== undefined) {
          registeredComponents_[i] = optReplace;
        }
        return registeredComponents_[i];
      }
    }
    return false;
  }

  /**
   * Returns true if the given element has already been upgraded for the given
   * class.
   * @param {HTMLElement} element The element we want to check.
   * @param {string} jsClass The class to check for.
   * @return boolean
   * @private
   */
  function isElementUpgraded_(element, jsClass) {
    var dataUpgraded = element.getAttribute('data-upgraded');
    return dataUpgraded && dataUpgraded.indexOf(jsClass) !== -1;
  }

  /**
   * Searches existing DOM for elements of our component type and upgrades them
   * if they have not already been upgraded.
   * @param {string} jsClass the programatic name of the element class we need
   * to create a new instance of.
   * @param {string} cssClass the name of the CSS class elements of this type
   * will have.
   */
  function upgradeDomInternal(jsClass, cssClass) {
    if (jsClass === undefined && cssClass === undefined) {
      for (var i = 0; i < registeredComponents_.length; i++) {
        upgradeDomInternal(registeredComponents_[i].className,
            registeredComponents_[i].cssClass);
      }
    } else {
      if (cssClass === undefined) {
        var registeredClass = findRegisteredClass_(jsClass);
        if (registeredClass) {
          cssClass = registeredClass.cssClass;
        }
      }

      var elements = document.querySelectorAll('.' + cssClass);
      for (var n = 0; n < elements.length; n++) {
        upgradeElementInternal(elements[n], jsClass);
      }
    }
  }

  /**
   * Upgrades a specific element rather than all in the DOM.
   * @param {HTMLElement} element The element we wish to upgrade.
   * @param {string} optJsClass Optional name of the class we want to upgrade
   * the element to.
   */
  function upgradeElementInternal(element, optJsClass) {
    // Only upgrade elements that have not already been upgraded.
    var dataUpgraded = element.getAttribute('data-upgraded');

    var registeredClasses = [];
    // If jsClass is not provided scan the registered components to find the
    // ones matching the element's CSS classList.
    if (!optJsClass) {
      registeredClasses = registeredComponents_.filter(function(component) {
        return element.classList.contains(component.cssClass) &&
          !isElementUpgraded_(element, component.className);
      });
    } else if (!isElementUpgraded_(element, optJsClass)) {
      registeredClasses.push(findRegisteredClass_(optJsClass));
    }

    // Upgrade the element for each classes.
    for (var i = 0, l = registeredClasses.length; i < l; i++) {
      var registeredClass = registeredClasses[i];
      if (registeredClass) {
        dataUpgraded = element.getAttribute('data-upgraded');
        // Mark element as upgraded.
        if (dataUpgraded === null) {
          dataUpgraded = '';
        }
        element.setAttribute('data-upgraded', dataUpgraded + ',' +
          registeredClass.className);
        var instance = new registeredClass.classConstructor(element);
        instance[componentConfigProperty_] = registeredClass;
        createdComponents_.push(instance);
        // Call any callbacks the user has registered with this component type.
        for (var j = 0, len = registeredClass.callbacks.length; j < len; i++) {
          registeredClass.callbacks[i](element);
        }

        if (registeredClass.widget) {
          // Assign per element instance for control over API
          element[registeredClass.className] = instance;
        }
      } else {
        throw new Error(
          'Unable to find a registered component for the given class.');
      }

      var ev = document.createEvent('Events');
      ev.initEvent('mdl-componentupgraded', true, true);
      element.dispatchEvent(ev);
    }
  }

  /**
   * Registers a class for future use and attempts to upgrade existing DOM.
   * @param {object} config An object containing:
   * {constructor: Constructor, classAsString: string, cssClass: string}
   */
  function registerInternal(config) {
    var newConfig = {
      'classConstructor': config.constructor,
      'className': config.classAsString,
      'cssClass': config.cssClass,
      'widget': config.widget === undefined ? true : config.widget,
      'callbacks': []
    };

    registeredComponents_.forEach(function(item) {
      if (item.cssClass === newConfig.cssClass) {
        throw new Error('The provided cssClass has already been registered.');
      }
      if (item.className === newConfig.className) {
        throw new Error('The provided className has already been registered');
      }
    });

    if (config.constructor.prototype
        .hasOwnProperty(componentConfigProperty_)) {
      throw new Error(
        'MDL component classes must not have ' + componentConfigProperty_ +
          ' defined as a property.');
    }

    var found = findRegisteredClass_(config.classAsString, newConfig);

    if (!found) {
      registeredComponents_.push(newConfig);
    }
  }

  /**
   * Allows user to be alerted to any upgrades that are performed for a given
   * component type
   * @param {string} jsClass The class name of the MDL component we wish
   * to hook into for any upgrades performed.
   * @param {function} callback The function to call upon an upgrade. This
   * function should expect 1 parameter - the HTMLElement which got upgraded.
   */
  function registerUpgradedCallbackInternal(jsClass, callback) {
    var regClass = findRegisteredClass_(jsClass);
    if (regClass) {
      regClass.callbacks.push(callback);
    }
  }

  /**
   * Upgrades all registered components found in the current DOM. This is
   * automatically called on window load.
   */
  function upgradeAllRegisteredInternal() {
    for (var n = 0; n < registeredComponents_.length; n++) {
      upgradeDomInternal(registeredComponents_[n].className);
    }
  }

  /**
   * Finds a created component by a given DOM node.
   *
   * @param {!Element} node
   * @return {*}
   */
  function findCreatedComponentByNodeInternal(node) {
    for (var n = 0; n < createdComponents_.length; n++) {
      var component = createdComponents_[n];
      if (component.element_ === node) {
        return component;
      }
    }
  }

  /**
   * Check the component for the downgrade method.
   * Execute if found.
   * Remove component from createdComponents list.
   *
   * @param {*} component
   */
  function deconstructComponentInternal(component) {
    if (component &&
        component[componentConfigProperty_]
          .classConstructor.prototype
          .hasOwnProperty(downgradeMethod_)) {
      component[downgradeMethod_]();
      var componentIndex = createdComponents_.indexOf(component);
      createdComponents_.splice(componentIndex, 1);

      var upgrades = component.element_.dataset.upgraded.split(',');
      var componentPlace = upgrades.indexOf(
          component[componentConfigProperty_].classAsString);
      upgrades.splice(componentPlace, 1);
      component.element_.dataset.upgraded = upgrades.join(',');

      var ev = document.createEvent('Events');
      ev.initEvent('mdl-componentdowngraded', true, true);
      component.element_.dispatchEvent(ev);
    }
  }

  /**
   * Downgrade either a given node, an array of nodes, or a NodeList.
   *
   * @param {*} nodes
   */
  function downgradeNodesInternal(nodes) {
    var downgradeNode = function(node) {
      deconstructComponentInternal(findCreatedComponentByNodeInternal(node));
    };
    if (nodes instanceof Array || nodes instanceof NodeList) {
      for (var n = 0; n < nodes.length; n++) {
        downgradeNode(nodes[n]);
      }
    } else if (nodes instanceof Node) {
      downgradeNode(nodes);
    } else {
      throw new Error('Invalid argument provided to downgrade MDL nodes.');
    }
  }

  var syncDoing_ = false;
  /**
   *Sync all component for elements that Css Class have changed
   */
  function syncElementsThatCssClassChangedInternal() {
    if (syncDoing_ == true)
    {
        return;
    }
    syncDoing_ = true;
    //down grade all component for elements that have some cssClass DELETED changed
    var elementsDowngrade = [];
    for (var n = 0; n < createdComponents_.length; n++) {
      var component = createdComponents_[n];
      if (!component.element_.classList.contains(component[componentConfigProperty_].cssClass)) {
          if (elementsDowngrade.indexOf(component.element_) == -1) {
              elementsDowngrade.push(component.element_);
          }
      }
    }

    //down grade all component for elements that have some cssClass ADDED changed
    var elementsCssADDED = [];
    for (var i = 0; i < registeredComponents_.length; i++) {
      var jsClass = registeredComponents_[i].className;
      var cssClass = registeredComponents_[i].cssClass;

      if (cssClass === undefined) {
          var registeredClass = findRegisteredClass_(jsClass);
          if (registeredClass) {
              cssClass = registeredClass.cssClass;
          }
      }

      if (cssClass) {
        var elements = document.querySelectorAll('.' + cssClass);
        for (var n = 0; n < elements.length; n++) {
          var element = elements[n];

          // jsClass that have been upgraded.
          var dataUpgraded = element.getAttribute('data-upgraded');

          if (dataUpgraded && dataUpgraded.indexOf(jsClass) === -1) {
              // not contains jsClass, the jsClass is new ADDED, need down grade all component for this element
              if (elementsDowngrade.indexOf(element) == -1) {
                  elementsDowngrade.push(element);
              }
          }
          if (!dataUpgraded || dataUpgraded.indexOf(jsClass) === -1) {
              // the jsClass is new ADDED, need re upgrade all component for this element
              if (elementsCssADDED.indexOf(element) == -1) {
                  elementsCssADDED.push(element);
              }
          }
        }
      }
    }

    // prepare components need do downgrade
    var componentsNeedDowngrade = [];
    for (var n = 0; n < createdComponents_.length; n++) {
      var component = createdComponents_[n];
      if (elementsDowngrade.indexOf(component.element_) > -1) {
          componentsNeedDowngrade.push(component);
      }
    }
    // do downgrade
    if (componentsNeedDowngrade.length > 0) {
      for (var n = componentsNeedDowngrade.length - 1; n >= 0; n--) {
          var component = componentsNeedDowngrade[n];
          deconstructComponentInternal(component);
      }
    }

    //re upgrade all component for elements that have some cssClass ADDED changed
    for (var n = 0; n < elementsCssADDED.length; n++) {
      var element = elementsCssADDED[n];
      upgradeElementInternal(element);
    }

    syncDoing_ = false;
  }

  // Now return the functions that should be made public with their publicly
  // facing names...
  return {
    upgradeDom: upgradeDomInternal,
    upgradeElement: upgradeElementInternal,
    upgradeAllRegistered: upgradeAllRegisteredInternal,
    registerUpgradedCallback: registerUpgradedCallbackInternal,
    register: registerInternal,
    downgradeElements: downgradeNodesInternal,
    syncElementsThatCssClassChanged: syncElementsThatCssClassChangedInternal
  };
})();

window.addEventListener('load', function() {
  'use strict';

  /**
   * Performs a "Cutting the mustard" test. If the browser supports the features
   * tested, adds a mdl-js class to the <html> element. It then upgrades all MDL
   * components requiring JavaScript.
   */
  if ('classList' in document.createElement('div') &&
      'querySelector' in document &&
      'addEventListener' in window && Array.prototype.forEach) {
    document.documentElement.classList.add('mdl-js');
    componentHandler.upgradeAllRegistered();
  } else {
    componentHandler.upgradeElement =
        componentHandler.register = function() {};
  }
});
