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

(function() {
  'use strict';

  /**
   * Class constructor for date picker MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
  var MaterialDatePicker = function MaterialDatePicker(element) {
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialDatePicker'] = MaterialDatePicker;

  /**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string | number}
   * @private
   */
  MaterialDatePicker.prototype.Constant_ = {
    // None for now.
  };

  /**
   * Store events in one place so they can be updated easily.
   *
   * @enum {string}
   * @private
   */
  MaterialDatePicker.prototype.Event_ = {
    // None for now.
  };

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  MaterialDatePicker.prototype.CssClasses_ = {
    IS_UPGRADED: 'is-upgraded',
    IS_VISIBLE: 'is-visible',
    IS_ATTACHED: 'is-attached',

    WRAPPER: 'mdl-datepicker__wrapper',
    INPUT: 'mdl-datepicker__input',
    WEEK: 'mdl-datepicker__week',
    DATE: 'mdl-datepicker__date',
    DATE_TODAY: 'mdl-datepicker__date--today',
    DATE_SELECTED: 'mdl-datepicker__date--selected',
    DATE_EMPTY: 'mdl-datepicker__date--empty',
    MONTH_CURRENT: 'mdl-datepicker__current-month',
    MONTH_PREVIOUS: 'mdl-datepicker__previous-month',
    MONTH_NEXT: 'mdl-datepicker__next-month',
    HEADER_YEAR: 'mdl-datepicker__header-year',
    HEADER_DATE: 'mdl-datepicker__header-date',
    CALENDAR_PREVIOUS: 'mdl-datepicker__calendar--previous',
    CALENDAR_NEXT: 'mdl-datepicker__calendar--next',
    ACTION_CANCEL: 'mdl-datepicker__cancel',
    ACTION_OK: 'mdl-datepicker__ok'
  };

  MaterialDatePicker.prototype.isInitialized_ = null;
  MaterialDatePicker.prototype.currentDate_ = null;
  MaterialDatePicker.prototype.selectedDate_ = null;

  /**
   * Trigger date picker internal events
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.triggerEvent_ = function(eventName) {
    var evt = document.createEvent('Events');
    evt.initEvent(eventName);
    this.element_.dispatchEvent(evt);
  };

  /**
   * Cancel action click handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.cancelHandler_ = function(e) {
    e.preventDefault();
    this.close();
  };

  /**
   * Ok action click handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.okHandler_ = function(e) {
    e.preventDefault();
    this.selectedDate_ = this.currentDate_;
    this.triggerEvent_('change');
    this.close();
  };

  /**
   * Select date action click handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.selectDateHandler_ = function(e) {
    e.preventDefault();
  };

  /**
   * Render datepicker dialog
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.render_ = function() {
    console.log('render');
  };

  /**
   * Open date picker dialog
   *
   * @public
   * @return {viod}
   */
  MaterialDatePicker.prototype.open = function() {
    this.element_.classList.add(this.CssClasses_.IS_VISIBLE);
    this.triggerEvent_('open');
  };
  MaterialDatePicker.prototype['open'] = MaterialDatePicker.prototype.open;

  /**
   * Close date picker dialog
   *
   * @public
   * @return {void}
   */
  MaterialDatePicker.prototype.close = function() {
    if (this.element_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      this.element_.classList.remove(this.CssClasses_.IS_VISIBLE);
      this.triggerEvent_('close');
    }
  };
  MaterialDatePicker.prototype['close'] = MaterialDatePicker.prototype.close;

  /**
   * Get or set selected date to datepicker
   *
   * @param  {Date} selectedDate
   *
   * @public
   * @return {void}
   */
  MaterialDatePicker.prototype.selectedDate = function(selectedDate) {
    if (selectedDate) {
      this.currentDate_ = selectedDate;
      this.selectedDate_ = selectedDate;
      this.render_();
    }

    return this.selectedDate_;
  };
  MaterialDatePicker.prototype['selectedDate'] = MaterialDatePicker.prototype.selectedDate;

  /**
   * Initialize element.
   */
  MaterialDatePicker.prototype.init = function() {
    if (this.element_) {
      // Init logic
      this.cancelElement_ = this.element_.querySelector('.' + this.CssClasses_.ACTION_CANCEL);
      this.okElement_ = this.element_.querySelector('.' + this.CssClasses_.ACTION_OK);

      // Bind events
      this.boundCancelActionHandler = this.cancelHandler_.bind(this);
      this.boundOkActionHandler = this.okHandler_.bind(this);

      this.cancelElement_.addEventListener('click', this.boundCancelActionHandler);
      this.okElement_.addEventListener('click', this.boundOkActionHandler);

      if (this.element_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
        // Hide datepicker until it is fully rendered
        this.element_.classList.remove(this.CssClasses_.IS_VISIBLE);
        this.render_();

        // Once rendered, show datepicker
        this.element_.classList.add(this.CssClasses_.IS_VISIBLE);
      }

      // Set private isInitialized_ property for internal tracking
      this.isInitialized_ = true;

      // Add "is-updated" class
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    }
  };

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: MaterialDatePicker,
    classAsString: 'MaterialDatePicker',
    cssClass: 'mdl-js-datepicker',
    widget: true
  });
})();
