/**
 * material-design-lite - Material Design Components in CSS, JS and HTML
 * @version v1.0.0
 * @link https://github.com/google/material-design-lite
 * @license Apache-2
 */
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

// From: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
  'use strict';
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * Class constructor for Animation WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function DemoAnimation(element) {
  'use strict';

  this.element_ = element;
  this.position_ = this.Constant_.STARTING_POSITION;
  this.movable_ = this.element_.querySelector('.' + this.CssClasses_.MOVABLE);
  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
DemoAnimation.prototype.Constant_ = {
  STARTING_POSITION: 1
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
DemoAnimation.prototype.CssClasses_ = {
  MOVABLE: 'demo-animation__movable',
  POSITION_PREFIX: 'demo-animation--position-'
};

/**
 * Handle click of element.
 * @param {Event} event The event that fired.
 * @private
 */
DemoAnimation.prototype.handleClick_ = function(event) {
  'use strict';

  this.movable_.classList.remove(this.CssClasses_.POSITION_PREFIX +
      this.position_);
  this.position_++;
  if (this.position_ > 6) {
    this.position_ = 1;
  }
  this.movable_.classList.add(this.CssClasses_.POSITION_PREFIX +
      this.position_);
};

/**
 * Initialize element.
 */
DemoAnimation.prototype.init = function() {
  'use strict';

  if (this.element_) {
    if (!this.movable_) {
      console.error('Was expecting to find an element with class name ' +
          this.CssClasses_.MOVABLE + ' inside of: ', this.element_);
      return;
    }

    this.element_.addEventListener('click', this.handleClick_.bind(this));
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: DemoAnimation,
  classAsString: 'DemoAnimation',
  cssClass: 'demo-js-animation'
});

/**
 * Class constructor for Button WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialButton(element) {
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
MaterialButton.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialButton.prototype.CssClasses_ = {
  RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_CONTAINER: 'wsk-button__ripple-container',
  RIPPLE: 'wsk-ripple'
};

/**
 * Handle blur of element.
 * @param {HTMLElement} element The instance of a button we want to blur.
 * @private
 */
MaterialButton.prototype.blurHandler = function(event) {
  'use strict';

  // Don't fire for the artificial "mouseup" generated by a double-click.
  if (event && event.detail !== 2) {
    this.element_.blur();
  }
};

/**
 * Initialize element.
 */
MaterialButton.prototype.init = function() {
  'use strict';

  if (this.element_) {
    if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.RIPPLE);
      rippleContainer.appendChild(ripple);
      ripple.addEventListener('mouseup', this.blurHandler.bind(this));
      this.element_.appendChild(rippleContainer);
    }
    this.element_.addEventListener('mouseup', this.blurHandler.bind(this));
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialButton,
  classAsString: 'MaterialButton',
  cssClass: 'wsk-js-button'
});

/**
 * Class constructor for Checkbox WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialCheckbox(element) {
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
MaterialCheckbox.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialCheckbox.prototype.CssClasses_ = {
  INPUT: 'wsk-checkbox__input',
  BOX_OUTLINE: 'wsk-checkbox__box-outline',
  FOCUS_HELPER: 'wsk-checkbox__focus-helper',
  TICK_OUTLINE: 'wsk-checkbox__tick-outline',
  RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'wsk-checkbox__ripple-container',
  RIPPLE_CENTER: 'wsk-ripple--center',
  RIPPLE: 'wsk-ripple',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked',
  IS_UPGRADED: 'is-upgraded'
};

/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_(this.btnElement_, this.element_);
};

/**
 * Handle focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle mouseup.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onMouseUp_ = function(event) {
  'use strict';

  this.blur_();
};

/**
 * Handle class updates.
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialCheckbox.prototype.updateClasses_ = function(button, label) {
  'use strict';

  if (button.disabled) {
    label.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    label.classList.remove(this.CssClasses_.IS_DISABLED);
  }

  if (button.checked) {
    label.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    label.classList.remove(this.CssClasses_.IS_CHECKED);
  }
};

/**
 * Add blur.
 * @private
 */
MaterialCheckbox.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.btnElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};

/**
 * Initialize element.
 */
MaterialCheckbox.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ = this.element_.querySelector('.' +
        this.CssClasses_.INPUT);

    var boxOutline = document.createElement('span');
    boxOutline.classList.add(this.CssClasses_.BOX_OUTLINE);

    var tickContainer = document.createElement('span');
    tickContainer.classList.add(this.CssClasses_.FOCUS_HELPER);

    var tickOutline = document.createElement('span');
    tickOutline.classList.add(this.CssClasses_.TICK_OUTLINE);

    boxOutline.appendChild(tickOutline);

    this.element_.appendChild(tickContainer);
    this.element_.appendChild(boxOutline);

    var rippleContainer;
    if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
      this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_EFFECT);
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CENTER);
      rippleContainer.addEventListener('mouseup', this.onMouseUp_.bind(this));

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));
    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));
    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));
    this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));

    this.updateClasses_(this.btnElement_, this.element_);
    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialCheckbox,
  classAsString: 'MaterialCheckbox',
  cssClass: 'wsk-js-checkbox'
});

/**
 * Class constructor for Column Layout WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialColumnLayout(element) {
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
MaterialColumnLayout.prototype.Constant_ = {
  INVISIBLE_WRAPPING_ELEMENT_COUNT: 3
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialColumnLayout.prototype.CssClasses_ = {
  /**
   * Class names should use camelCase and be prefixed with the word "material"
   * to minimize conflict with 3rd party systems.
   */

  // TODO: Upgrade classnames in HTML / CSS / JS to use material prefix to
  // reduce conflict and convert to camelCase for consistency.
  INVISIBLE_WRAPPING_ELEMENT: 'wsk-column-layout__wrap-hack'
};


/**
 * Initialize element.
 */
MaterialColumnLayout.prototype.init = function() {
  'use strict';

  if (this.element_) {
    // Add some hidden elements to make sure everything aligns correctly. See
    // CSS file for details.
    for (var j = 0; j < this.Constant_.INVISIBLE_WRAPPING_ELEMENT_COUNT ; j++) {
      var hiddenHackDiv = document.createElement('div');
      hiddenHackDiv.classList.add(this.CssClasses_.INVISIBLE_WRAPPING_ELEMENT);
      this.element_.appendChild(hiddenHackDiv);
    }
  }
};


//The component registers itself. It can assume componentHandler is available
//in the global scope.
componentHandler.register({
  constructor: MaterialColumnLayout,
  classAsString: 'MaterialColumnLayout',
  cssClass: 'wsk-column-layout'
});

/**
 * Class constructor for icon toggle WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialIconToggle(element) {
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
MaterialIconToggle.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialIconToggle.prototype.CssClasses_ = {
  INPUT: 'wsk-icon-toggle__input',
  JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'wsk-icon-toggle__ripple-container',
  RIPPLE_CENTER: 'wsk-ripple--center',
  RIPPLE: 'wsk-ripple',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked'
};

/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialIconToggle.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_(this.btnElement_, this.element_);
};

/**
 * Handle focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialIconToggle.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialIconToggle.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle mouseup.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialIconToggle.prototype.onMouseUp_ = function(event) {
  'use strict';

  this.blur_();
};

/**
 * Handle class updates.
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialIconToggle.prototype.updateClasses_ = function(button, label) {
  'use strict';

  if (button.disabled) {
    label.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    label.classList.remove(this.CssClasses_.IS_DISABLED);
  }

  if (button.checked) {
    label.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    label.classList.remove(this.CssClasses_.IS_CHECKED);
  }
};

/**
 * Add blur.
 * @private
 */
MaterialIconToggle.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.btnElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};

/**
 * Initialize element.
 */
MaterialIconToggle.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ =
        this.element_.querySelector('.' + this.CssClasses_.INPUT);

    var rippleContainer;
    if (this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
      this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
      rippleContainer.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT);
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CENTER);
      rippleContainer.addEventListener('mouseup', this.onMouseUp_.bind(this));

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));
    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));
    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));
    this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));

    this.updateClasses_(this.btnElement_, this.element_);
    this.element_.classList.add('is-upgraded');
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialIconToggle,
  classAsString: 'MaterialIconToggle',
  cssClass: 'wsk-js-icon-toggle'
});

/**
 * Class constructor for dropdown WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialMenu(element) {
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
MaterialMenu.prototype.Constant_ = {
  // Total duration of the menu animation.
  TRANSITION_DURATION_SECONDS: 0.3,
  // The fraction of the total duration we want to use for menu item animations.
  TRANSITION_DURATION_FRACTION: 0.8,
  // How long the menu stays open after choosing an option (so the user can see
  // the ripple).
  CLOSE_TIMEOUT: 150
};

/**
 * Keycodes, for code readability.
 * @enum {number}
 * @private
 */
MaterialMenu.prototype.Keycodes_ = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  UP_ARROW: 38,
  DOWN_ARROW: 40
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialMenu.prototype.CssClasses_ = {
  CONTAINER: 'wsk-menu__container',
  OUTLINE: 'wsk-menu__outline',
  ITEM: 'wsk-menu__item',
  ITEM_RIPPLE_CONTAINER: 'wsk-menu__item-ripple-container',
  RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',
  RIPPLE: 'wsk-ripple',
  // Statuses
  IS_UPGRADED: 'is-upgraded',
  IS_VISIBLE: 'is-visible',
  IS_ANIMATING: 'is-animating',
  // Alignment options
  BOTTOM_LEFT: 'wsk-menu--bottom-left',  // This is the default.
  BOTTOM_RIGHT: 'wsk-menu--bottom-right',
  TOP_LEFT: 'wsk-menu--top-left',
  TOP_RIGHT: 'wsk-menu--top-right',
  UNALIGNED: 'wsk-menu--unaligned'
};

/**
 * Initialize element.
 */
MaterialMenu.prototype.init = function() {
  'use strict';

  if (this.element_) {
    // Create container for the menu.
    var container = document.createElement('div');
    container.classList.add(this.CssClasses_.CONTAINER);
    this.element_.parentElement.insertBefore(container, this.element_);
    this.element_.parentElement.removeChild(this.element_);
    container.appendChild(this.element_);
    this.container_ = container;

    // Create outline for the menu (shadow and background).
    var outline = document.createElement('div');
    outline.classList.add(this.CssClasses_.OUTLINE);
    this.outline_ = outline;
    container.insertBefore(outline, this.element_);

    // Find the "for" element and bind events to it.
    var forElId = this.element_.getAttribute('for');
    var forEl = null;
    if (forElId) {
      forEl = document.getElementById(forElId);
      if (forEl) {
        this.forElement_ = forEl;
        forEl.addEventListener('click', this.handleForClick_.bind(this));
        forEl.addEventListener('keydown',
            this.handleForKeyboardEvent_.bind(this));
      }
    }

    var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);

    for (var i = 0; i < items.length; i++) {
      // Add a listener to each menu item.
      items[i].addEventListener('click', this.handleItemClick_.bind(this));
      // Add a tab index to each menu item.
      items[i].tabIndex = '-1';
      // Add a keyboard listener to each menu item.
      items[i].addEventListener('keydown',
          this.handleItemKeyboardEvent_.bind(this));
    }

    // Add ripple classes to each item, if the user has enabled ripples.
    if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
      this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);

      for (i = 0; i < items.length; i++) {
        var item = items[i];

        var rippleContainer = document.createElement('span');
        rippleContainer.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);

        var ripple = document.createElement('span');
        ripple.classList.add(this.CssClasses_.RIPPLE);
        rippleContainer.appendChild(ripple);

        item.appendChild(rippleContainer);
        item.classList.add(this.CssClasses_.RIPPLE_EFFECT);
      }
    }

    // Copy alignment classes to the container, so the outline can use them.
    if (this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT)) {
      this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT);
    }
    if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
      this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT);
    }
    if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
      this.outline_.classList.add(this.CssClasses_.TOP_LEFT);
    }
    if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
      this.outline_.classList.add(this.CssClasses_.TOP_RIGHT);
    }
    if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
      this.outline_.classList.add(this.CssClasses_.UNALIGNED);
    }

    container.classList.add(this.CssClasses_.IS_UPGRADED);
  }
};

/**
 * Handles a click on the "for" element, by positioning the menu and then
 * toggling it.
 * @private
 */
MaterialMenu.prototype.handleForClick_ = function(evt) {
  'use strict';

  if (this.element_ && this.forElement_) {
    var rect = this.forElement_.getBoundingClientRect();
    var forRect = this.forElement_.parentElement.getBoundingClientRect();

    if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
      // Do not position the menu automatically. Requires the developer to
      // manually specify position.
    } else if (this.element_.classList.contains(
        this.CssClasses_.BOTTOM_RIGHT)) {
      // Position below the "for" element, aligned to its right.
      this.container_.style.right = (forRect.right - rect.right) + 'px';
      this.container_.style.top =
          this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
    } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
      // Position above the "for" element, aligned to its left.
      this.container_.style.left = this.forElement_.offsetLeft + 'px';
      this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
    } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
      // Position above the "for" element, aligned to its right.
      this.container_.style.right = (forRect.right - rect.right) + 'px';
      this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
    } else {
      // Default: position below the "for" element, aligned to its left.
      this.container_.style.left = this.forElement_.offsetLeft + 'px';
      this.container_.style.top =
          this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
    }
  }

  this.toggle(evt);
};

/**
 * Handles a keyboard event on the "for" element.
 * @private
 */
MaterialMenu.prototype.handleForKeyboardEvent_ = function(evt) {
  'use strict';

  if (this.element_ && this.container_ && this.forElement_) {
    var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM +
      ':not([disabled])');

    if (items && items.length > 0 &&
        this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      if (evt.keyCode === this.Keycodes_.UP_ARROW) {
        evt.preventDefault();
        items[items.length - 1].focus();
      } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
        evt.preventDefault();
        items[0].focus();
      }
    }
  }
};

/**
 * Handles a keyboard event on an item.
 * @private
 */
MaterialMenu.prototype.handleItemKeyboardEvent_ = function(evt) {
  'use strict';

  if (this.element_ && this.container_) {
    var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM +
      ':not([disabled])');

    if (items && items.length > 0 &&
        this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      var currentIndex = Array.prototype.slice.call(items).indexOf(evt.target);

      if (evt.keyCode === this.Keycodes_.UP_ARROW) {
        evt.preventDefault();
        if (currentIndex > 0) {
          items[currentIndex - 1].focus();
        } else {
          items[items.length - 1].focus();
        }
      } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
        evt.preventDefault();
        if (items.length > currentIndex + 1) {
          items[currentIndex + 1].focus();
        } else {
          items[0].focus();
        }
      } else if (evt.keyCode === this.Keycodes_.SPACE ||
            evt.keyCode === this.Keycodes_.ENTER) {
        evt.preventDefault();
        // Send mousedown and mouseup to trigger ripple.
        var e = new MouseEvent('mousedown');
        evt.target.dispatchEvent(e);
        e = new MouseEvent('mouseup');
        evt.target.dispatchEvent(e);
        // Send click.
        evt.target.click();
      } else if (evt.keyCode === this.Keycodes_.ESCAPE) {
        evt.preventDefault();
        this.hide();
      }
    }
  }
};

/**
 * Handles a click event on an item.
 * @private
 */
MaterialMenu.prototype.handleItemClick_ = function(evt) {
  'use strict';

  if (evt.target.getAttribute('disabled') !== null) {
    evt.stopPropagation();
  } else {
    // Wait some time before closing menu, so the user can see the ripple.
    this.closing_ = true;
    window.setTimeout(function(evt) {
      this.hide();
      this.closing_ = false;
    }.bind(this), this.Constant_.CLOSE_TIMEOUT);
  }
};

/**
 * Calculates the initial clip (for opening the menu) or final clip (for closing
 * it), and applies it. This allows us to animate from or to the correct point,
 * that is, the point it's aligned to in the "for" element.
 * @private
 */
MaterialMenu.prototype.applyClip_ = function(height, width) {
  'use strict';

  if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
    // Do not clip.
    this.element_.style.clip = null;
  } else if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
    // Clip to the top right corner of the menu.
    this.element_.style.clip =
        'rect(0 ' + width + 'px ' + '0 ' + width + 'px)';
  } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
    // Clip to the bottom left corner of the menu.
    this.element_.style.clip =
        'rect(' + height + 'px 0 ' + height + 'px 0)';
  } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
    // Clip to the bottom right corner of the menu.
    this.element_.style.clip = 'rect(' + height + 'px ' + width + 'px ' +
        height + 'px ' + width + 'px)';
  } else {
    // Default: do not clip (same as clipping to the top left corner).
    this.element_.style.clip = null;
  }
};

/**
 * Adds an event listener to clean up after the animation ends.
 * @private
 */
MaterialMenu.prototype.addAnimationEndListener_ = function() {
  'use strict';

  var cleanup = function() {
    this.element_.classList.remove(this.CssClasses_.IS_ANIMATING);
  }.bind(this);

  // Remove animation class once the transition is done.
  this.element_.addEventListener('transitionend', cleanup);
  this.element_.addEventListener('webkitTransitionEnd', cleanup);
};

/**
 * Displays the menu.
 * @public
 */
MaterialMenu.prototype.show = function(evt) {
  'use strict';

  if (this.element_ && this.container_ && this.outline_) {
    // Measure the inner element.
    var height = this.element_.getBoundingClientRect().height;
    var width = this.element_.getBoundingClientRect().width;

    // Apply the inner element's size to the container and outline.
    this.container_.style.width = width + 'px';
    this.container_.style.height = height + 'px';
    this.outline_.style.width = width + 'px';
    this.outline_.style.height = height + 'px';

    var transitionDuration = this.Constant_.TRANSITION_DURATION_SECONDS *
        this.Constant_.TRANSITION_DURATION_FRACTION;

    // Calculate transition delays for individual menu items, so that they fade
    // in one at a time.
    var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
    for (var i = 0; i < items.length; i++) {
      var itemDelay = null;
      if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT) ||
          this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
        itemDelay = ((height - items[i].offsetTop - items[i].offsetHeight) /
            height * transitionDuration) + 's';
      } else {
        itemDelay = (items[i].offsetTop / height * transitionDuration) + 's';
      }
      items[i].style.transitionDelay = itemDelay;
    }

    // Apply the initial clip to the text before we start animating.
    this.applyClip_(height, width);

    // Wait for the next frame, turn on animation, and apply the final clip.
    // Also make it visible. This triggers the transitions.
    window.requestAnimFrame(function() {
      this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
      this.element_.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
      this.container_.classList.add(this.CssClasses_.IS_VISIBLE);
    }.bind(this));

    // Clean up after the animation is complete.
    this.addAnimationEndListener_();

    // Add a click listener to the document, to close the menu.
    var callback = function(e) {
      // Check to see if the document is processing the same event that
      // displayed the menu in the first place. If so, do nothing.
      // Also check to see if the menu is in the process of closing itself, and
      // do nothing in that case.
      if (e !== evt && !this.closing_) {
        document.removeEventListener('click', callback);
        this.hide();
      }
    }.bind(this);
    document.addEventListener('click', callback);
  }
};

/**
 * Hides the menu.
 * @public
 */
MaterialMenu.prototype.hide = function(evt) {
  'use strict';

  if (this.element_ && this.container_ && this.outline_) {
    var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);

    // Remove all transition delays; menu items fade out concurrently.
    for (var i = 0; i < items.length; i++) {
      items[i].style.transitionDelay = null;
    }

    // Measure the inner element.
    var height = this.element_.getBoundingClientRect().height;
    var width = this.element_.getBoundingClientRect().width;

    // Turn on animation, and apply the final clip. Also make invisible.
    // This triggers the transitions.
    this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
    this.applyClip_(height, width);
    this.container_.classList.remove(this.CssClasses_.IS_VISIBLE);

    // Clean up after the animation is complete.
    this.addAnimationEndListener_();
  }
};

/**
 * Displays or hides the menu, depending on current state.
 * @public
 */
MaterialMenu.prototype.toggle = function(evt) {
  'use strict';

  if (this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
    this.hide(evt);
  } else {
    this.show(evt);
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialMenu,
  classAsString: 'MaterialMenu',
  cssClass: 'wsk-js-menu'
});

/**
 * Class constructor for Radio WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialRadio(element) {
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
MaterialRadio.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialRadio.prototype.CssClasses_ = {
  IS_FOCUSED: 'is-focused',

  IS_DISABLED: 'is-disabled',

  IS_CHECKED: 'is-checked',

  IS_UPGRADED: 'is-upgraded',

  WSK_JS_RADIO: 'wsk-js-radio',

  WSK_RADIO_BTN: 'wsk-radio__button',

  WSK_RADIO_OUTER_CIRCLE: 'wsk-radio__outer-circle',

  WSK_RADIO_INNER_CIRCLE: 'wsk-radio__inner-circle',

  WSK_JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',

  WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',

  WSK_RADIO_RIPPLE_CONTAINER: 'wsk-radio__ripple-container',

  WSK_RIPPLE_CENTER: 'wsk-ripple--center',

  WSK_RIPPLE: 'wsk-ripple'
};


/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_(this.btnElement_, this.element_);

  // Since other radio buttons don't get change events, we need to look for
  // them to update their classes.
  var radios = document.getElementsByClassName(this.CssClasses_.WSK_JS_RADIO);
  for (var i = 0; i < radios.length; i++) {
    var button = radios[i].querySelector('.' + this.CssClasses_.WSK_RADIO_BTN);
    // Different name == different group, so no point updating those.
    if (button.getAttribute('name') === this.btnElement_.getAttribute('name')) {
      this.updateClasses_(button, radios[i]);
    }
  }
};


/**
 * Handle focus.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};


/**
 * Handle lost focus.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};


/**
 * Handle mouseup.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onMouseup_ = function(event) {
  'use strict';

  this.blur_();
};


/**
 * Update classes.
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialRadio.prototype.updateClasses_ = function(button, label) {
  'use strict';

  if (button.disabled) {
    label.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    label.classList.remove(this.CssClasses_.IS_DISABLED);
  }

  if (button.checked) {
    label.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    label.classList.remove(this.CssClasses_.IS_CHECKED);
  }
};


/**
 * Add blur.
 * @private
 */
MaterialRadio.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.btnElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};


/**
 * Initialize element.
 */
MaterialRadio.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ = this.element_.querySelector('.' +
        this.CssClasses_.WSK_RADIO_BTN);

    var outerCircle = document.createElement('span');
    outerCircle.classList.add(this.CssClasses_.WSK_RADIO_OUTER_CIRCLE);

    var innerCircle = document.createElement('span');
    innerCircle.classList.add(this.CssClasses_.WSK_RADIO_INNER_CIRCLE);

    this.element_.appendChild(outerCircle);
    this.element_.appendChild(innerCircle);

    var rippleContainer;
    if (this.element_.classList.contains(
        this.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
      this.element_.classList.add(
          this.CssClasses_.WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add(
          this.CssClasses_.WSK_RADIO_RIPPLE_CONTAINER);
      rippleContainer.classList.add(this.CssClasses_.WSK_JS_RIPPLE_EFFECT);
      rippleContainer.classList.add(this.CssClasses_.WSK_RIPPLE_CENTER);
      rippleContainer.addEventListener('mouseup', this.onMouseup_.bind(this));

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.WSK_RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));

    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));

    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));

    this.element_.addEventListener('mouseup', this.onMouseup_.bind(this));


    this.updateClasses_(this.btnElement_, this.element_);
    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
  }
};


// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialRadio,
  classAsString: 'MaterialRadio',
  cssClass: 'wsk-js-radio'
});

/**
 * Class constructor for Slider WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialSlider(element) {
  'use strict';

  this.element_ = element;
  // Browser feature detection.
  this.isIE_ = window.navigator.msPointerEnabled;
  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialSlider.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialSlider.prototype.CssClasses_ = {
  IE_CONTAINER: 'wsk-slider__ie-container',
  SLIDER_CONTAINER: 'wsk-slider__container',
  BACKGROUND_FLEX: 'wsk-slider__background-flex',
  BACKGROUND_LOWER: 'wsk-slider__background-lower',
  BACKGROUND_UPPER: 'wsk-slider__background-upper',
  IS_LOWEST_VALUE: 'is-lowest-value',
  IS_UPGRADED: 'is-upgraded'
};

/**
 * Handle input on element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSlider.prototype.onInput_ = function(event) {
  'use strict';

  this.updateValue_();
};

/**
 * Handle change on element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSlider.prototype.onChange_ = function(event) {
  'use strict';

  this.updateValue_();
};

/**
 * Handle mouseup on element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSlider.prototype.onMouseUp_ = function(event) {
  'use strict';

  event.target.blur();
};

/**
 * Handle updating of values.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSlider.prototype.updateValue_ = function(event) {
  'use strict';

  // Calculate and apply percentages to div structure behind slider.
  var fraction = (this.element_.value - this.element_.min) /
      (this.element_.max - this.element_.min);

  if (fraction === 0) {
    this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE);
  }

  if (!this.isIE_) {
    this.backgroundLower_.style.flex = fraction;
    this.backgroundLower_.style.webkitFlex = fraction;
    this.backgroundUpper_.style.flex = 1 - fraction;
    this.backgroundUpper_.style.webkitFlex = 1 - fraction;
  }
};

/**
 * Initialize element.
 */
MaterialSlider.prototype.init = function() {
  'use strict';

  if (this.element_) {
    if (this.isIE_) {
      // Since we need to specify a very large height in IE due to
      // implementation limitations, we add a parent here that trims it down to
      // a reasonable size.
      var containerIE = document.createElement('div');
      containerIE.classList.add(this.CssClasses_.IE_CONTAINER);
      this.element_.parentElement.insertBefore(containerIE, this.element_);
      this.element_.parentElement.removeChild(this.element_);
      containerIE.appendChild(this.element_);
    } else {
      // For non-IE browsers, we need a div structure that sits behind the
      // slider and allows us to style the left and right sides of it with
      // different colors.
      var container = document.createElement('div');
      container.classList.add(this.CssClasses_.SLIDER_CONTAINER);
      this.element_.parentElement.insertBefore(container, this.element_);
      this.element_.parentElement.removeChild(this.element_);
      container.appendChild(this.element_);
      var backgroundFlex = document.createElement('div');
      backgroundFlex.classList.add(this.CssClasses_.BACKGROUND_FLEX);
      container.appendChild(backgroundFlex);
      this.backgroundLower_ = document.createElement('div');
      this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER);
      backgroundFlex.appendChild(this.backgroundLower_);
      this.backgroundUpper_ = document.createElement('div');
      this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER);
      backgroundFlex.appendChild(this.backgroundUpper_);
    }

    this.element_.addEventListener('input', this.onInput_.bind(this));
    this.element_.addEventListener('change', this.onChange_.bind(this));
    this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));

    this.updateValue_();
    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialSlider,
  classAsString: 'MaterialSlider',
  cssClass: 'wsk-js-slider'
});

/**
 * Class constructor for Spinner WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialSpinner(element) {
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
MaterialSpinner.prototype.Constant_ = {
  WSK_SPINNER_LAYER_COUNT: 4
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialSpinner.prototype.CssClasses_ = {
  WSK_SPINNER_LAYER: 'wsk-spinner__layer',
  WSK_SPINNER_CIRCLE_CLIPPER: 'wsk-spinner__circle-clipper',
  WSK_SPINNER_CIRCLE: 'wsk-spinner__circle',
  WSK_SPINNER_GAP_PATCH: 'wsk-spinner__gap-patch',
  WSK_SPINNER_LEFT: 'wsk-spinner__left',
  WSK_SPINNER_RIGHT: 'wsk-spinner__right'
};

/**
* Auxiliary method to create a spinner layer.
*/
MaterialSpinner.prototype.createLayer = function(index) {
  'use strict';

  var layer = document.createElement('div');
  layer.classList.add(this.CssClasses_.WSK_SPINNER_LAYER);
  layer.classList.add(this.CssClasses_.WSK_SPINNER_LAYER + '-' + index);

  var leftClipper = document.createElement('div');
  leftClipper.classList.add(this.CssClasses_.WSK_SPINNER_CIRCLE_CLIPPER);
  leftClipper.classList.add(this.CssClasses_.WSK_SPINNER_LEFT);

  var gapPatch = document.createElement('div');
  gapPatch.classList.add(this.CssClasses_.WSK_SPINNER_GAP_PATCH);

  var rightClipper = document.createElement('div');
  rightClipper.classList.add(this.CssClasses_.WSK_SPINNER_CIRCLE_CLIPPER);
  rightClipper.classList.add(this.CssClasses_.WSK_SPINNER_RIGHT);

  var circleOwners = [leftClipper, gapPatch, rightClipper];

  for (var i = 0; i < circleOwners.length; i++) {
    var circle = document.createElement('div');
    circle.classList.add(this.CssClasses_.WSK_SPINNER_CIRCLE);
    circleOwners[i].appendChild(circle);
  }

  layer.appendChild(leftClipper);
  layer.appendChild(gapPatch);
  layer.appendChild(rightClipper);

  this.element_.appendChild(layer);
};

/**
* Stops the spinner animation.
* Public method for users who need to stop the spinner for any reason.
* @public
*/
MaterialSpinner.prototype.stop = function() {
  'use strict';

  this.element_.classList.remove('is-active');
};

/**
* Starts the spinner animation.
* Public method for users who need to manually start the spinner for any reason
* (instead of just adding the 'is-active' class to their markup).
* @public
*/
MaterialSpinner.prototype.start = function() {
  'use strict';

  this.element_.classList.add('is-active');
};

/**
 * Initialize element.
 */
MaterialSpinner.prototype.init = function() {
  'use strict';

  if (this.element_) {
    for (var i = 1; i <= this.Constant_.WSK_SPINNER_LAYER_COUNT; i++) {
      this.createLayer(i);
    }

    this.element_.classList.add('is-upgraded');
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialSpinner,
  classAsString: 'MaterialSpinner',
  cssClass: 'wsk-js-spinner'
});

/**
 * Class constructor for Checkbox WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialSwitch(element) {
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
MaterialSwitch.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialSwitch.prototype.CssClasses_ = {
  WSK_SWITCH_INPUT: 'wsk-switch__input',

  WSK_SWITCH_TRACK: 'wsk-switch__track',

  WSK_SWITCH_THUMB: 'wsk-switch__thumb',

  WSK_SWITCH_FOCUS_HELPER: 'wsk-switch__focus-helper',

  WSK_JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',

  WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',

  WSK_SWITCH_RIPPLE_CONTAINER: 'wsk-switch__ripple-container',

  WSK_RIPPLE_CENTER: 'wsk-ripple--center',

  WSK_RIPPLE: 'wsk-ripple',

  IS_FOCUSED: 'is-focused',

  IS_DISABLED: 'is-disabled',

  IS_CHECKED: 'is-checked'
};


/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_(this.btnElement_, this.element_);
};


/**
 * Handle focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};


/**
 * Handle lost focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};


/**
 * Handle mouseup.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onMouseUp_ = function(event) {
  'use strict';

  this.blur_();
};


/**
 * Handle class updates.
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialSwitch.prototype.updateClasses_ = function(button, label) {
  'use strict';

  if (button.disabled) {
    label.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    label.classList.remove(this.CssClasses_.IS_DISABLED);
  }

  if (button.checked) {
    label.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    label.classList.remove(this.CssClasses_.IS_CHECKED);
  }
};


/**
 * Add blur.
 * @private
 */
MaterialSwitch.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.btnElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};


/**
 * Initialize element.
 */
MaterialSwitch.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ = this.element_.querySelector('.' +
        this.CssClasses_.WSK_SWITCH_INPUT);

    var track = document.createElement('div');
    track.classList.add(this.CssClasses_.WSK_SWITCH_TRACK);

    var thumb = document.createElement('div');
    thumb.classList.add(this.CssClasses_.WSK_SWITCH_THUMB);

    var focusHelper = document.createElement('span');
    focusHelper.classList.add(this.CssClasses_.WSK_SWITCH_FOCUS_HELPER);

    thumb.appendChild(focusHelper);

    this.element_.appendChild(track);
    this.element_.appendChild(thumb);

    var rippleContainer;
    if (this.element_.classList.contains(
        this.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
      this.element_.classList.add(
          this.CssClasses_.WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add(
          this.CssClasses_.WSK_SWITCH_RIPPLE_CONTAINER);
      rippleContainer.classList.add(this.CssClasses_.WSK_JS_RIPPLE_EFFECT);
      rippleContainer.classList.add(this.CssClasses_.WSK_RIPPLE_CENTER);
      rippleContainer.addEventListener('mouseup', this.onMouseUp_.bind(this));

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.WSK_RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));

    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));

    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));

    this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));


    this.updateClasses_(this.btnElement_, this.element_);
    this.element_.classList.add('is-upgraded');
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialSwitch,
  classAsString: 'MaterialSwitch',
  cssClass: 'wsk-js-switch'
});

/**
 * Class constructor for Tabs WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialTabs(element) {
  'use strict';

  // Stores the HTML element.
  this.element_ = element;

  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string}
 * @private
 */
MaterialTabs.prototype.Constant_ = {
  // None at the moment.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialTabs.prototype.CssClasses_ = {
  TAB_CLASS: 'wsk-tabs__tab',
  PANEL_CLASS: 'wsk-tabs__panel',
  ACTIVE_CLASS: 'is-active',
  UPGRADED_CLASS: 'is-upgraded',

  WSK_JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  WSK_RIPPLE_CONTAINER: 'wsk-tabs__ripple-container',
  WSK_RIPPLE: 'wsk-ripple',
  WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events'
};

/**
 * Handle clicks to a tabs component
 * @private
 */
MaterialTabs.prototype.initTabs_ = function(e) {
  'use strict';

  if (this.element_.classList.contains(this.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
    this.element_.classList.add(
      this.CssClasses_.WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
  }

  // Select element tabs, document panels
  this.tabs_ = this.element_.querySelectorAll('.' + this.CssClasses_.TAB_CLASS);
  this.panels_ =
      this.element_.querySelectorAll('.' + this.CssClasses_.PANEL_CLASS);

  // Create new tabs for each tab element
  for (var i = 0; i < this.tabs_.length; i++) {
    new MaterialTab(this.tabs_[i], this);
  }

  this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
};

/**
 * Reset tab state, dropping active classes
 * @private
 */
MaterialTabs.prototype.resetTabState_ = function() {
  'use strict';

  for (var k = 0; k < this.tabs_.length; k++) {
    this.tabs_[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Reset panel state, droping active classes
 * @private
 */
MaterialTabs.prototype.resetPanelState_ = function() {
  'use strict';

  for (var j = 0; j < this.panels_.length; j++) {
    this.panels_[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

MaterialTabs.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.initTabs_();
  }
};

function MaterialTab(tab, ctx) {
  'use strict';

  if (tab) {
    if (ctx.element_.classList.contains(ctx.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(ctx.CssClasses_.WSK_RIPPLE_CONTAINER);
      rippleContainer.classList.add(ctx.CssClasses_.WSK_JS_RIPPLE_EFFECT);
      var ripple = document.createElement('span');
      ripple.classList.add(ctx.CssClasses_.WSK_RIPPLE);
      rippleContainer.appendChild(ripple);
      tab.appendChild(rippleContainer);
    }

    tab.addEventListener('click', function(e) {
      e.preventDefault();
      var href = tab.href.split('#')[1];
      var panel = ctx.element_.querySelector('#' + href);
      ctx.resetTabState_();
      ctx.resetPanelState_();
      tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
      panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
    });

  }
}

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialTabs,
  classAsString: 'MaterialTabs',
  cssClass: 'wsk-js-tabs'
});

/**
 * Class constructor for Textfield WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialTextfield(element) {
  'use strict';

  this.element_ = element;
  this.maxRows = this.Constant_.NO_MAX_ROWS;
  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialTextfield.prototype.Constant_ = {
  NO_MAX_ROWS: -1,
  MAX_ROWS_ATTRIBUTE: 'maxrows'
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialTextfield.prototype.CssClasses_ = {
  LABEL: 'wsk-textfield__label',
  INPUT: 'wsk-textfield__input',
  IS_DIRTY: 'is-dirty',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_INVALID: 'is-invalid',
  IS_UPGRADED: 'is-upgraded'
};

/**
 * Handle input being entered.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onKeyDown_ = function(event) {
  'use strict';

  var currentRowCount = event.target.value.split('\n').length;
  if (event.keyCode === 13) {
    if (currentRowCount >= this.maxRows) {
      event.preventDefault();
    }
  }
};

/**
 * Handle focus.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle class updates.
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialTextfield.prototype.updateClasses_ = function() {
  'use strict';

  if (this.input_.disabled) {
    this.element_.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
  }

  if (this.input_.validity.valid) {
    this.element_.classList.remove(this.CssClasses_.IS_INVALID);
  } else {
    this.element_.classList.add(this.CssClasses_.IS_INVALID);
  }

  if (this.input_.value && this.input_.value.length > 0) {
    this.element_.classList.add(this.CssClasses_.IS_DIRTY);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
  }
};

/**
 * Initialize element.
 */
MaterialTextfield.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
    this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);

    if (this.input_) {
      if (this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
        this.maxRows = parseInt(this.input_.getAttribute(
            this.Constant_.MAX_ROWS_ATTRIBUTE), 10);
        if (isNaN(this.maxRows)) {
          this.maxRows = this.Constant_.NO_MAX_ROWS;
        }
      }

      this.input_.addEventListener('input', this.updateClasses_.bind(this));
      this.input_.addEventListener('focus', this.onFocus_.bind(this));
      this.input_.addEventListener('blur', this.onBlur_.bind(this));

      if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
        // TODO: This should handle pasting multi line text.
        // Currently doesn't.
        this.input_.addEventListener('keydown', this.onKeyDown_.bind(this));
      }

      this.updateClasses_();
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    }
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialTextfield,
  classAsString: 'MaterialTextfield',
  cssClass: 'wsk-js-textfield'
});

/**
 * Class constructor for Tooltip WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialTooltip(element) {
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
MaterialTooltip.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialTooltip.prototype.CssClasses_ = {
  IS_ACTIVE: 'is-active'
};


/**
 * Handle mouseenter for tooltip.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTooltip.prototype.handleMouseEnter_ = function(event) {
  'use strict';

  event.stopPropagation();
  var props = event.target.getBoundingClientRect();
  this.element_.style.left = props.left + (props.width / 2) + 'px';
  this.element_.style.marginLeft = -1 * (this.element_.offsetWidth / 2) + 'px';
  this.element_.style.top = props.top + props.height + 10 + 'px';
  this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
};


/**
 * Handle mouseleave for tooltip.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTooltip.prototype.handleMouseLeave_ = function(event) {
  'use strict';

  event.stopPropagation();
  this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
};


/**
 * Initialize element.
 */
MaterialTooltip.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var forElId = this.element_.getAttribute('for');
    var forEl = null;

    if (forElId) {
      forEl = document.getElementById(forElId);
    }

    if (forEl) {
      forEl.addEventListener('mouseenter', this.handleMouseEnter_.bind(this),
          false);
      forEl.addEventListener('mouseleave', this.handleMouseLeave_.bind(this));
    }
  }
};


// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialTooltip,
  classAsString: 'MaterialTooltip',
  cssClass: 'wsk-tooltip'
});

/**
 * Class constructor for Layout WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialLayout(element) {
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
MaterialLayout.prototype.Constant_ = {
  MAX_WIDTH: '(max-width: 850px)'
};

/**
 * Modes.
 * @enum {number}
 * @private
 */
MaterialLayout.prototype.Mode_ = {
  STANDARD: 0,
  SEAMED: 1,
  WATERFALL: 2,
  SCROLL: 3
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialLayout.prototype.CssClasses_ = {
  HEADER: 'wsk-layout__header',
  DRAWER: 'wsk-layout__drawer',
  CONTENT: 'wsk-layout__content',
  DRAWER_BTN: 'wsk-layout__drawer-button',

  JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_CONTAINER: 'wsk-layout__tab-ripple-container',
  RIPPLE: 'wsk-ripple',
  RIPPLE_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',

  HEADER_SEAMED: 'wsk-layout__header--seamed',
  HEADER_WATERFALL: 'wsk-layout__header--waterfall',
  HEADER_SCROLL: 'wsk-layout__header--scroll',

  FIXED_HEADER: 'wsk-layout--fixed-header',
  OBFUSCATOR: 'wsk-layout__obfuscator',

  TAB_BAR: 'wsk-layout__tab-bar',
  TAB_CONTAINER: 'wsk-layout__tab-bar-container',
  TAB: 'wsk-layout__tab',
  TAB_BAR_BUTTON: 'wsk-layout__tab-bar-button',
  TAB_BAR_LEFT_BUTTON: 'wsk-layout__tab-bar-left-button',
  TAB_BAR_RIGHT_BUTTON: 'wsk-layout__tab-bar-right-button',
  PANEL: 'wsk-layout__tab-panel',

  SHADOW_CLASS: 'is-casting-shadow',
  COMPACT_CLASS: 'is-compact',
  SMALL_SCREEN_CLASS: 'is-small-screen',
  DRAWER_OPEN_CLASS: 'is-visible',
  ACTIVE_CLASS: 'is-active',
  UPGRADED_CLASS: 'is-upgraded'
};

/**
 * Handles scrolling on the content.
 * @private
 */
MaterialLayout.prototype.contentScrollHandler_ = function() {
  'use strict';

  if (this.content_.scrollTop > 0) {
    this.header_.classList.add(this.CssClasses_.SHADOW_CLASS);
    this.header_.classList.add(this.CssClasses_.COMPACT_CLASS);
  } else {
    this.header_.classList.remove(this.CssClasses_.SHADOW_CLASS);
    this.header_.classList.remove(this.CssClasses_.COMPACT_CLASS);
  }
};

/**
 * Handles changes in screen size.
 * @private
 */
MaterialLayout.prototype.screenSizeHandler_ = function() {
  'use strict';

  if (this.screenSizeMediaQuery_.matches) {
    this.element_.classList.add(this.CssClasses_.SMALL_SCREEN_CLASS);
  }
  else {
    this.element_.classList.remove(this.CssClasses_.SMALL_SCREEN_CLASS);
    // Collapse drawer (if any) when moving to a large screen size.
    if (this.drawer_) {
      this.drawer_.classList.remove(this.CssClasses_.DRAWER_OPEN_CLASS);
    }
  }
};

/**
 * Handles toggling of the drawer.
 * @param {Element} drawer The drawer container element.
 * @private
 */
MaterialLayout.prototype.drawerToggleHandler_ = function() {
  'use strict';

  this.drawer_.classList.toggle(this.CssClasses_.DRAWER_OPEN_CLASS);
};

/**
 * Reset tab state, dropping active classes
 * @private
 */
MaterialLayout.prototype.resetTabState_ = function(tabBar) {
  'use strict';

  for (var k = 0; k < tabBar.length; k++) {
    tabBar[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Reset panel state, droping active classes
 * @private
 */
MaterialLayout.prototype.resetPanelState_ = function(panels) {
  'use strict';

  for (var j = 0; j < panels.length; j++) {
    panels[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Initialize element.
 */
MaterialLayout.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var container = document.createElement('div');
    container.classList.add('wsk-layout__container');
    this.element_.parentElement.insertBefore(container, this.element_);
    this.element_.parentElement.removeChild(this.element_);
    container.appendChild(this.element_);

    this.header_ = this.element_.querySelector('.' + this.CssClasses_.HEADER);
    this.drawer_ = this.element_.querySelector('.' + this.CssClasses_.DRAWER);
    this.tabBar_ = this.element_.querySelector('.' + this.CssClasses_.TAB_BAR);
    this.content_ = this.element_.querySelector('.' + this.CssClasses_.CONTENT);

    var mode = this.Mode_.STANDARD;

    // Keep an eye on screen size, and add/remove auxiliary class for styling
    // of small screens.
    this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH);
    this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this));
    this.screenSizeHandler_();

    if (this.header_) {
      if (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)) {
        mode = this.Mode_.SEAMED;
      } else if (this.header_.classList.contains(
          this.CssClasses_.HEADER_WATERFALL)) {
        mode = this.Mode_.WATERFALL;
      } else if (this.element_.classList.contains(
          this.CssClasses_.HEADER_SCROLL)) {
        mode = this.Mode_.SCROLL;
      }

      if (mode === this.Mode_.STANDARD) {
        this.header_.classList.add(this.CssClasses_.SHADOW_CLASS);
        if (this.tabBar_) {
          this.tabBar_.classList.add(this.CssClasses_.SHADOW_CLASS);
        }
      } else if (mode === this.Mode_.SEAMED || mode === this.Mode_.SCROLL) {
        this.header_.classList.remove(this.CssClasses_.SHADOW_CLASS);
        if (this.tabBar_) {
          this.tabBar_.classList.remove(this.CssClasses_.SHADOW_CLASS);
        }
      } else if (mode === this.Mode_.WATERFALL) {
        // Add and remove shadows depending on scroll position.
        // Also add/remove auxiliary class for styling of the compact version of
        // the header.
        this.content_.addEventListener('scroll',
            this.contentScrollHandler_.bind(this));
        this.contentScrollHandler_();
      }
    }

    // Add drawer toggling button to our layout, if we have an openable drawer.
    if (this.drawer_) {
      var drawerButton = document.createElement('div');
      drawerButton.classList.add(this.CssClasses_.DRAWER_BTN);
      drawerButton.addEventListener('click',
          this.drawerToggleHandler_.bind(this));

      // If we have a fixed header, add the button to the header rather than
      // the layout.
      if (this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)) {
        this.header_.insertBefore(drawerButton, this.header_.firstChild);
      } else {
        this.element_.insertBefore(drawerButton, this.content_);
      }

      var obfuscator = document.createElement('div');
      obfuscator.classList.add(this.CssClasses_.OBFUSCATOR);
      this.element_.appendChild(obfuscator);
      obfuscator.addEventListener('click',
          this.drawerToggleHandler_.bind(this));
    }

    // Initialize tabs, if any.
    if (this.tabBar_) {
      var tabContainer = document.createElement('div');
      tabContainer.classList.add(this.CssClasses_.TAB_CONTAINER);
      this.element_.insertBefore(tabContainer, this.tabBar_);
      this.element_.removeChild(this.tabBar_);

      var leftButton = document.createElement('div');
      leftButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
      leftButton.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
      leftButton.addEventListener('click', function() {
        this.tabBar_.scrollLeft -= 100;
      }.bind(this));

      var rightButton = document.createElement('div');
      rightButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
      rightButton.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
      rightButton.addEventListener('click', function() {
        this.tabBar_.scrollLeft += 100;
      }.bind(this));

      tabContainer.appendChild(leftButton);
      tabContainer.appendChild(this.tabBar_);
      tabContainer.appendChild(rightButton);

      // Add and remove buttons depending on scroll position.
      var tabScrollHandler = function() {
        if (this.tabBar_.scrollLeft > 0) {
          leftButton.classList.add(this.CssClasses_.ACTIVE_CLASS);
        } else {
          leftButton.classList.remove(this.CssClasses_.ACTIVE_CLASS);
        }

        if (this.tabBar_.scrollLeft <
            this.tabBar_.scrollWidth - this.tabBar_.offsetWidth) {
          rightButton.classList.add(this.CssClasses_.ACTIVE_CLASS);
        } else {
          rightButton.classList.remove(this.CssClasses_.ACTIVE_CLASS);
        }
      }.bind(this);

      this.tabBar_.addEventListener('scroll', tabScrollHandler);
      tabScrollHandler();

      if (this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
        this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
      }

      // Select element tabs, document panels
      var tabs = this.tabBar_.querySelectorAll('.' + this.CssClasses_.TAB);
      var panels = this.content_.querySelectorAll('.' + this.CssClasses_.PANEL);

      // Create new tabs for each tab element
      for (var i = 0; i < tabs.length; i++) {
        new MaterialLayoutTab(tabs[i], tabs, panels, this);
      }
    }

    this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
  }
};

function MaterialLayoutTab(tab, tabs, panels, layout) {
  'use strict';

  if (tab) {
    if (layout.tabBar_.classList.contains(
        layout.CssClasses_.JS_RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(layout.CssClasses_.RIPPLE_CONTAINER);
      rippleContainer.classList.add(layout.CssClasses_.JS_RIPPLE_EFFECT);
      var ripple = document.createElement('span');
      ripple.classList.add(layout.CssClasses_.RIPPLE);
      rippleContainer.appendChild(ripple);
      tab.appendChild(rippleContainer);
    }

    tab.addEventListener('click', function(e) {
      e.preventDefault();
      var href = tab.href.split('#')[1];
      var panel = layout.content_.querySelector('#' + href);
      layout.resetTabState_(tabs);
      layout.resetPanelState_(panels);
      tab.classList.add(layout.CssClasses_.ACTIVE_CLASS);
      panel.classList.add(layout.CssClasses_.ACTIVE_CLASS);
    });

  }
}

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialLayout,
  classAsString: 'MaterialLayout',
  cssClass: 'wsk-js-layout'
});

/**
 * Class constructor for Ripple WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialRipple(element) {
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
MaterialRipple.prototype.Constant_ = {
  INITIAL_SCALE: 'scale(0.0001, 0.0001)',
  INITIAL_SIZE: '1px',
  INITIAL_OPACITY: '0.4',
  FINAL_OPACITY: '0',
  FINAL_SCALE: ''
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialRipple.prototype.CssClasses_ = {
  RIPPLE_CENTER: 'wsk-ripple--center',
  RIPPLE_EFFECT_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',
  RIPPLE: 'wsk-ripple',
  IS_ANIMATING: 'is-animating',
  IS_VISIBLE: 'is-visible'
};

/**
 * Handle mouse / finger down on element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRipple.prototype.downHandler_ = function(event) {
  'use strict';

  this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE);

  if (event.type === 'mousedown' && this.ignoringMouseDown_) {
    this.ignoringMouseDown_ = false;
  } else {
    if (event.type === 'touchstart') {
      this.ignoringMouseDown_ = true;
    }
    var frameCount = this.getFrameCount();
    if (frameCount > 0) {
      return;
    }
    this.setFrameCount(1);
    var bound = event.currentTarget.getBoundingClientRect();
    var x;
    var y;
    // Check if we are handling a keyboard click.
    if (event.clientX === 0 && event.clientY === 0) {
      x = Math.round(bound.width / 2);
      y = Math.round(bound.height / 2);
    } else {
      var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
      x = Math.round(clientX - bound.left);
      y = Math.round(clientY - bound.top);
    }
    this.setRippleXY(x, y);
    this.setRippleStyles(true);
    window.requestAnimFrame(this.animFrameHandler.bind(this));
  }
};

/**
 * Handle mouse / finger up on element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRipple.prototype.upHandler_ = function(event) {
  'use strict';

  // Don't fire for the artificial "mouseup" generated by a double-click.
  if (event && event.detail !== 2) {
    this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE);
  }
};

/**
 * Initialize element.
 */
MaterialRipple.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var recentering =
        this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);
    if (!this.element_.classList.contains(
        this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)) {
      this.rippleElement_ = this.element_.querySelector('.' +
          this.CssClasses_.RIPPLE);
      this.frameCount_ = 0;
      this.rippleSize_ = 0;
      this.x_ = 0;
      this.y_ = 0;

      // Touch start produces a compat mouse down event, which would cause a
      // second ripples. To avoid that, we use this property to ignore the first
      // mouse down after a touch start.
      this.ignoringMouseDown_ = false;

      if (this.rippleElement_) {
        var bound = this.element_.getBoundingClientRect();
        this.rippleSize_ = Math.sqrt(bound.width * bound.width +
            bound.height * bound.height) * 2 + 2;
        this.rippleElement_.style.width = this.rippleSize_ + 'px';
        this.rippleElement_.style.height = this.rippleSize_ + 'px';
      }

      this.element_.addEventListener('mousedown', this.downHandler_.bind(this));
      this.element_.addEventListener('touchstart',
          this.downHandler_.bind(this));

      this.element_.addEventListener('mouseup', this.upHandler_.bind(this));
      this.element_.addEventListener('touchend', this.upHandler_.bind(this));
      this.element_.addEventListener('blur', this.upHandler_.bind(this));

      this.getFrameCount = function() {
        return this.frameCount_;
      };

      this.setFrameCount = function(fC) {
        this.frameCount_ = fC;
      };

      this.getRippleElement = function() {
        return this.rippleElement_;
      };

      this.setRippleXY = function(newX, newY) {
        this.x_ = newX;
        this.y_ = newY;
      };

      this.setRippleStyles = function(start) {
        if (this.rippleElement_ !== null) {
          var transformString;
          var scale;
          var size;
          var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';

          if (start) {
            scale = this.Constant_.INITIAL_SCALE;
            size = this.Constant_.INITIAL_SIZE;
          } else {
            scale = this.Constant_.FINAL_SCALE;
            size = this.rippleSize_ + 'px';
            if (recentering) {
              offset = 'translate(' + bound.width / 2 + 'px, ' +
                bound.height / 2 + 'px)';
            }
          }

          transformString = 'translate(-50%, -50%) ' + offset + scale;

          this.rippleElement_.style.webkitTransform = transformString;
          this.rippleElement_.style.msTransform = transformString;
          this.rippleElement_.style.transform = transformString;

          if (start) {
            this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING);
          } else {
            this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING);
          }
        }
      };

      this.animFrameHandler = function() {
        if (this.frameCount_-- > 0) {
          window.requestAnimFrame(this.animFrameHandler.bind(this));
        } else {
          this.setRippleStyles(false);
        }
      };
    }
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialRipple,
  classAsString: 'MaterialRipple',
  cssClass: 'wsk-js-ripple-effect'
});
