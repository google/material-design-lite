/**
 * A component handler interface using the revealing module design pattern.
 * More details on this pattern design here:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @author Jason Mayes.
 */
var componentHandler = (function() {
  'use strict';

  var registeredComponents_ = [];
  var createdComponents_ = [];


  /**
   * Searches registered components for a class we are interested in using.
   * Optionally replaces a match with passed object if specified.
   * @param {string} name The name of a class we want to use.
   * @param {object} opt_replace Optional object to replace match with.
   * @return {object | false}
   * @private
   */
  function findRegisteredClass_(name, opt_replace) {
    for (var i = 0; i < registeredComponents_.length; i++) {
      if (registeredComponents_[i].className === name) {
        if (opt_replace !== undefined) {
          registeredComponents_[i] = opt_replace;
        }
        return registeredComponents_[i];
      }
    }
    return false;
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


  /**
   * Upgrades a specific element rather than all in the DOM.
   * @param {HTMLElement} element The element we wish to upgrade.
   * @param {string} jsClass The name of the class we want to upgrade
   * the element to.
   */
  function upgradeElementInternal(element, jsClass) {
    // Only upgrade elements that have not already been upgraded.
    if (element.getAttribute('data-upgraded') === null) {
      // Upgrade element.
      element.setAttribute('data-upgraded', '');
      var registeredClass = findRegisteredClass_(jsClass);
      if (registeredClass) {
        createdComponents_.push(new registeredClass.classConstructor(element));
      } else {
        // If component creator forgot to register, try and see if
        // it is in global scope.
        createdComponents_.push(new window[jsClass](element));
      }
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
      'cssClass': config.cssClass
    };

    var found = findRegisteredClass_(config.classAsString, newConfig);

    if (!found) {
      registeredComponents_.push(newConfig);
    }
    
    upgradeDomInternal(config.classAsString);
  }


  // Now return the functions that should be made public with their publicly
  // facing names...
  return {
    upgradeDom: upgradeDomInternal,
    upgradeElement: upgradeElementInternal,
    register: registerInternal
  };
})();