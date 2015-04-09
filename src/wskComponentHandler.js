/**
 * A component handler interface using the revealing module design pattern.
 * More details on this pattern design here:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @author Jason Mayes.
 */
 /* exported componentHandler */
var componentHandler = (function() {
  'use strict';

  var registeredComponents_ = [];
  var createdComponents_ = [];

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
   * @param {string} jsClass The name of the class we want to upgrade
   * the element to.
   */
  function upgradeElementInternal(element, jsClass) {
    // Only upgrade elements that have not already been upgraded.
    var dataUpgraded = element.getAttribute('data-upgraded');

    if (dataUpgraded === null || dataUpgraded.indexOf(jsClass) === -1) {
      // Upgrade element.
      if (dataUpgraded === null) {
        dataUpgraded = '';
      }
      element.setAttribute('data-upgraded', dataUpgraded + ',' + jsClass);
      var registeredClass = findRegisteredClass_(jsClass);
      if (registeredClass) {
        // new
        var instance = new registeredClass.classConstructor(element);
        createdComponents_.push(instance);
        // Call any callbacks the user has registered with this component type.
        registeredClass.callbacks.forEach(function (callback) {
          callback(element);
        });

        // Assign per element instance for control over API
        element.widget = instance;
      } else {
        // If component creator forgot to register, try and see if
        // it is in global scope.
        createdComponents_.push(new window[jsClass](element));
      }

      var ev = document.createEvent('Events');
      ev.initEvent('wsk-componentupgraded', true, true);
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
      'callbacks': []
    };

    var found = findRegisteredClass_(config.classAsString, newConfig);

    if (!found) {
      registeredComponents_.push(newConfig);
    }
  }


  /**
   * Allows user to be alerted to any upgrades that are performed for a given
   * component type
   * @param {string} jsClass The class name of the WSK component we wish
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


  // Now return the functions that should be made public with their publicly
  // facing names...
  return {
    upgradeDom: upgradeDomInternal,
    upgradeElement: upgradeElementInternal,
    upgradeAllRegistered: upgradeAllRegisteredInternal,
    registerUpgradedCallback: registerUpgradedCallbackInternal,
    register: registerInternal
  };
})();


window.addEventListener('load', function() {
  'use strict';

  /**
   * Performs a "Cutting the mustard" test. If the browser supports the features
   * tested, adds a wsk-js class to the <html> element. It then upgrades all WSK
   * components requiring JavaScript.
   */
  if ('classList' in document.createElement('div') && 'querySelector' in document &&
      'addEventListener' in window && Array.prototype.forEach) {
    document.documentElement.classList.add('wsk-js');
    componentHandler.upgradeAllRegistered();
  } else {
    componentHandler.upgradeElement = componentHandler.register = function () { };
  }
});
