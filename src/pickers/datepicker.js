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
   * Global date picker settings
   * @type {Object}
   * @public
   */
  MaterialDatePicker.settings = {
    // Currently allowed formats: ['mm/dd/yyyy', 'dd.mm.yyyy', 'yyyy-mm-dd']
    format: 'mm/dd/yyyy',
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekDaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekDaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    months: [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ],
    monthsShort: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May',
      'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
      'Nov', 'Dec'
    ]
  };

  /**
   * Format givven date
   * @param  {Date}     date
   * @return {Stirng}
   */
  MaterialDatePicker.prototype.formatDate = function(date) {

  };

  /**
   * Instance based date picker settings.
   * Overrides global date picker settings
   *
   * @type {Object}
   * @public
   */
  MaterialDatePicker.prototype.settings = {};

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
    IS_DIRTY: 'is-dirty',

    WIDGET: 'mdl-datepicker__widget',
    INPUT: 'mdl-datepicker__input',
    NAVIGATION: 'mdl-datepicker__navigation',
    CALENDAR: 'mdl-datepicker__calendar',
    MONTH: 'mdl-datepicker__month',
    WEEKS: 'mdl-datepicker__weeks',
    WEEK: 'mdl-datepicker__week',
    WEEK_DAYS: 'mdl-datepicker__week-days',
    DATE: 'mdl-datepicker__date',
    DATE_TODAY: 'mdl-datepicker__date--today',
    DATE_SELECTED: 'mdl-datepicker__date--selected',
    DATE_EMPTY: 'mdl-datepicker__date--empty',
    MONTH_CURRENT: 'mdl-datepicker__current-month',
    MONTH_PREVIOUS: 'mdl-datepicker__previous-month',
    MONTH_NEXT: 'mdl-datepicker__next-month',
    HEADER: 'mdl-datepicker__header',
    HEADER_YEAR: 'mdl-datepicker__header-year',
    HEADER_DATE: 'mdl-datepicker__header-date',
    CALENDAR_PREVIOUS: 'mdl-datepicker__calendar--previous',
    CALENDAR_NEXT: 'mdl-datepicker__calendar--next',
    ACTIONS: 'mdl-datepicker__actions',
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
    this.pickedDate_ = this.selectedDate_;
    this.render_();
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
    this.selectedDate_ = this.pickedDate_;
    if (this.input_) {
      this.input_.value = this.selectedDate_.toLocaleDateString();
    }
    this.element_.classList.add(this.CssClasses_.IS_DIRTY);
    this.triggerEvent_('change');
    this.close();
  };

  /**
   * Date picker input focus handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.inputFocusHandler_ = function(e) {
    this.input_.blur();
    this.open();
  };

  /**
   * Date picker input blur handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.inputBlurHandler_ = function(e) {
    this.close();
  };

  /**
   * Select date action click handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.pickDateHandler_ = function(e) {
    e.preventDefault();
    var previousDate = this.calendarElement_.querySelector(
      '.' + this.CssClasses_.DATE +
      '.' + this.CssClasses_.DATE_SELECTED
    );

    if (previousDate) {
      previousDate.classList.remove(this.CssClasses_.DATE_SELECTED);
    }

    // Select current date
    var pickedDate = e.target;
    var pickedDateInt = pickedDate.getAttribute('data-date');
    pickedDate.classList.add(this.CssClasses_.DATE_SELECTED);
    this.pickedDate_.setFullYear(this.currentDate_.getFullYear());
    this.pickedDate_.setMonth(this.currentDate_.getMonth());
    this.pickedDate_.setDate(pickedDateInt);
    this.updateHeader_();
  };

  /**
   * Previous date picker month handler
   * @param  {Event} e
   * @return {void}
   */
  MaterialDatePicker.prototype.previousMonthHandler_ = function(e) {
    var previousMonth = new Date(this.currentDate_.getTime());
    previousMonth.setMonth(this.currentDate_.getMonth() - 1);

    var previousMonthElement = this.renderMonth_(previousMonth);
    this.calendarElement_.insertBefore(previousMonthElement, this.currentMonthElement_);
    this.currentMonthElement_.remove();
    this.currentMonthElement_ = previousMonthElement;
    this.currentDate_ = previousMonth;
    this.updateMonthTitle_();
  };

  /**
   * Next date picker month handler
   * @param  {Event} e
   * @return {void}
   */
  MaterialDatePicker.prototype.nextMonthHandler_ = function(e) {
    var nextMonth = new Date(this.currentDate_.getTime());
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    var nextMonthElement = this.renderMonth_(nextMonth);
    this.calendarElement_.insertBefore(nextMonthElement, this.currentMonthElement_);
    this.currentMonthElement_.remove();
    this.currentMonthElement_ = nextMonthElement;
    this.currentDate_ = nextMonth;
    this.updateMonthTitle_();
  };

  /**
   * Check if gived date is today
   * @param  {Date}     currentDate
   * @return {bool}
   */
  MaterialDatePicker.prototype.isToday_ = function(currentDate) {
    var today = new Date();

    if (today.getFullYear() !== currentDate.getFullYear()) {
      return false;
    }
    if (today.getMonth() !== currentDate.getMonth()) {
      return false;
    }
    if (today.getDate() !== currentDate.getDate()) {
      return false;
    }
    return true;
  };

  /**
   * Check if given date is selected date
   * @param  {Date}     currentDate
   * @return {bool}
   */
  MaterialDatePicker.prototype.isSelectedDate_ = function(currentDate) {
    if (!this.selectedDate_) {
      return false;
    }
    if (this.selectedDate_.getFullYear() !== currentDate.getFullYear()) {
      return false;
    }
    if (this.selectedDate_.getMonth() !== currentDate.getMonth()) {
      return false;
    }
    if (this.selectedDate_.getDate() !== currentDate.getDate()) {
      return false;
    }
    return true;
  };

  /**
   * Pick date on date picker, but do not store it as selected
   * @param  {Date}  date
   * @return {viod}
   */
  MaterialDatePicker.prototype.pickDate_ = function(date) {

  };

  /**
   * Render datepicker dialog
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.render_ = function() {
    console.log('render');
    if (!this.widgetElement_) {
      this.widgetElement_ = document.createElement('div');
      this.widgetElement_.classList.add(this.CssClasses_.WIDGET);

      // Append header element
      this.widgetElement_.appendChild(this.renderHeader_());
      this.widgetElement_.appendChild(this.renderCalendar_());

      this.element_.appendChild(this.widgetElement_);
    }
  };

  /**
   * Render date picker header element
   *
   * @private
   * @return {HTMLElement}
   */
  MaterialDatePicker.prototype.renderHeader_ = function() {
    if (!this.headerElement_) {
      this.headerElement_ = document.createElement('div');
      this.headerYearElement_ = document.createElement('div');
      this.headerDateElement_ = document.createElement('div');

      // Add appropriate classes
      this.headerElement_.classList.add(this.CssClasses_.HEADER);
      this.headerYearElement_.classList.add(this.CssClasses_.HEADER_YEAR);
      this.headerDateElement_.classList.add(this.CssClasses_.HEADER_DATE);

      // Assemble header element
      this.headerElement_.appendChild(this.headerYearElement_);
      this.headerElement_.appendChild(this.headerDateElement_);

      // Setup initial header values
      this.updateHeader_();
    }

    return this.headerElement_;
  };

  /**
   * Updat header date and year
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.updateHeader_ = function() {
    if (this.headerYearElement_) {
      this.headerYearElement_.innerHTML = this.pickedDate_.getFullYear();
    }

    if (this.headerDateElement_) {
      this.headerDateElement_.innerHTML = (
        this.settings.weekDaysShort[this.pickedDate_.getDay()] + ', ' +
        this.settings.monthsShort[this.pickedDate_.getMonth()] + ' '  +
        this.pickedDate_.getDate()
      );
    }
  };

  /**
   * Update current month title
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.updateMonthTitle_ = function() {
    this.currentMonthTitleElement_.innerHTML = (
      this.settings.months[this.currentDate_.getMonth()] + ', ' +
      this.currentDate_.getFullYear()
    );
  };

  /**
   * Render entire date picker content
   *
   * @private
   * @return {HTMLElement}
   */
  MaterialDatePicker.prototype.renderCalendar_ = function() {
    if (!this.calendarElement_) {
      this.calendarElement_ = document.createElement('div');
      this.calendarElement_.classList.add(this.CssClasses_.CALENDAR);

      this.calendarElement_.appendChild(this.renderNavigation_());
      this.calendarElement_.appendChild(this.renderWeekDays_());
      this.currentMonthElement_ = this.renderMonth_(this.currentDate_);
      this.calendarElement_.appendChild(this.currentMonthElement_);
      this.calendarElement_.appendChild(this.renderActions_());
    }

    return this.calendarElement_;
  };

  /**
   * Render month navigation
   *
   * @private
   * @return {HTMLElement}
   */
  MaterialDatePicker.prototype.renderNavigation_ = function() {
    if (!this.navigationElement_) {
      this.navigationElement_ = document.createElement('div');
      this.navigationElement_.classList.add(this.CssClasses_.NAVIGATION);

      var previousMonth = document.createElement('button');
      previousMonth.classList.add('mdl-button');
      previousMonth.classList.add('mdl-js-button');
      previousMonth.classList.add('mdl-button--icon');
      previousMonth.classList.add(this.CssClasses_.MONTH_PREVIOUS);
      var previousIcon = document.createElement('i');
      previousIcon.classList.add('material-icons');
      previousIcon.innerHTML = 'keyboard_arrow_left';
      previousMonth.appendChild(previousIcon);

      var nextMonth = document.createElement('button');
      nextMonth.classList.add('mdl-button');
      nextMonth.classList.add('mdl-js-button');
      nextMonth.classList.add('mdl-button--icon');
      nextMonth.classList.add(this.CssClasses_.MONTH_NEXT);
      var nextIcon = document.createElement('i');
      nextIcon.classList.add('material-icons');
      nextIcon.innerHTML = 'keyboard_arrow_right';
      nextMonth.appendChild(nextIcon);

      // Bind month change event
      this.boundPreviousMonthHandler = this.previousMonthHandler_.bind(this);
      this.boundNextMonthHandler = this.nextMonthHandler_.bind(this);
      previousMonth.addEventListener('click', this.boundPreviousMonthHandler);
      nextMonth.addEventListener('click', this.boundNextMonthHandler);

      this.currentMonthTitleElement_ = document.createElement('div');
      this.currentMonthTitleElement_.classList.add(this.CssClasses_.MONTH_CURRENT);

      if (this.currentDate_) {
        this.updateMonthTitle_();
      }

      this.navigationElement_.appendChild(previousMonth);
      this.navigationElement_.appendChild(this.currentMonthTitleElement_);
      this.navigationElement_.appendChild(nextMonth);

      componentHandler.upgradeElement(previousMonth);
      componentHandler.upgradeElement(nextMonth);
    }

    return this.navigationElement_;
  };

  /**
   * Render date picker week days heading
   *
   * @private
   * @return {HTMLElement}
   */
  MaterialDatePicker.prototype.renderWeekDays_ = function() {
    if (!this.weekDaysElement_) {
      this.weekDaysElement_ = document.createElement('div');
      this.weekDaysElement_.classList.add(this.CssClasses_.WEEK_DAYS);

      for (var i = 0; i <= 6; i++) {
        var weekDay = document.createElement('button');
        weekDay.classList.add(this.CssClasses_.DATE);
        weekDay.classList.add(this.CssClasses_.DATE_EMPTY);
        weekDay.innerHTML = this.settings.weekDaysLetter[i];
        this.weekDaysElement_.appendChild(weekDay);
      }
    }

    return this.weekDaysElement_;
  };

  /**
   * Render date picker weeks
   * @return {HTMLElement}
   */
  MaterialDatePicker.prototype.renderMonth_ = function(monthObject) {
    var month = document.createElement('div');
    month.classList.add(this.CssClasses_.MONTH);

    var firstDay = new Date(monthObject.getTime());
    var lastDay = new Date(monthObject.getTime());
    var currentDay = new Date(firstDay.getTime());
    var currentDayInt = 1;

    // Set first day of the month
    firstDay.setDate(1);

    // Set last day of the month
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(1);
    lastDay.setDate(lastDay.getDate() - 1);

    var renderDays = true;
    while (renderDays) {
      var week = document.createElement('div');
      week.classList.add(this.CssClasses_.WEEK);

      for (var i = 0; i <= 6; i++) {
        currentDay.setDate(currentDayInt);
        if (currentDayInt > lastDay.getDate()) {
          renderDays = false;
          break;
        }

        var weekDay = document.createElement('button');
        weekDay.classList.add(this.CssClasses_.DATE);
        if (currentDay.getDay() === i && currentDay.getDate() <= lastDay.getDate()) {
          weekDay.innerHTML = currentDayInt;
          weekDay.setAttribute('data-date', currentDayInt);
          currentDayInt++;

          // Check if today
          if (this.isToday_(currentDay)) {
            weekDay.classList.add(this.CssClasses_.DATE_TODAY);
          }

          // Check if current day is selected
          if (this.isSelectedDate_(currentDay)) {
            weekDay.classList.add(this.CssClasses_.DATE_SELECTED);
          }

          // Bind select date event
          this.boundPickDateHandler = this.pickDateHandler_.bind(this);
          weekDay.addEventListener('click', this.boundPickDateHandler);
        } else {
          // Render empty date
          weekDay.classList.add(this.CssClasses_.DATE_EMPTY);
        }

        week.appendChild(weekDay);
      }

      month.appendChild(week);
    }

    return month;
  };

  /**
   * Render date picker actions
   *
   * @private
   * @return {HTMLElement}
   */
  MaterialDatePicker.prototype.renderActions_ = function() {
    if (!this.actionsElement_) {
      this.actionsElement_ = document.createElement('div');
      this.actionsElement_.classList.add(this.CssClasses_.ACTIONS);

      // Cancel button
      this.cancelElement_ = document.createElement('button');
      this.cancelElement_.classList.add('mdl-button');
      this.cancelElement_.classList.add('mdl-js-button');
      this.cancelElement_.classList.add('mdl-button--accent');
      this.cancelElement_.classList.add(this.CssClasses_.ACTION_CANCEL);
      this.cancelElement_.innerHTML = 'Cancel';

      // OK button
      this.okElement_ = document.createElement('button');
      this.okElement_.classList.add('mdl-button');
      this.okElement_.classList.add('mdl-js-button');
      this.okElement_.classList.add('mdl-button--accent');
      this.okElement_.classList.add(this.CssClasses_.ACTION_OK);
      this.okElement_.innerHTML = 'OK';

      // Bind events
      this.boundCancelActionHandler = this.cancelHandler_.bind(this);
      this.boundOkActionHandler = this.okHandler_.bind(this);

      this.cancelElement_.addEventListener('click', this.boundCancelActionHandler);
      this.okElement_.addEventListener('click', this.boundOkActionHandler);

      this.actionsElement_.appendChild(this.cancelElement_);
      this.actionsElement_.appendChild(this.okElement_);

      componentHandler.upgradeElement(this.cancelElement_);
      componentHandler.upgradeElement(this.okElement_);
    }

    return this.actionsElement_;
  };

  /**
   * Open date picker dialog
   *
   * @public
   * @return {viod}
   */
  MaterialDatePicker.prototype.open = function() {
    if (!this.widgetElement_) {
      this.render_();
    }

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
      this.pickeDate_ = selectedDate;
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
      // Load default configuration
      this.settings = Object.create(MaterialDatePicker.settings);

      this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
      if (this.input_) {
        // Bind input events
        this.boundInputFocusHandler = this.inputFocusHandler_.bind(this);
        // this.boundInputBlurHandler = this.inputBlurHandler_.bind(this);

        this.input_.addEventListener('focus', this.boundInputFocusHandler);
        // this.input_.addEventListener('blur', this.boundInputBlurHandler);
      }

      // Setup properties default values.
      this.pickedDate_ = new Date();
      this.currentDate_ = new Date();
      this.selectedDate_ = new Date();

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
