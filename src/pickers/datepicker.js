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
    // General component classes
    IS_UPGRADED: 'is-upgraded',
    IS_VISIBLE: 'is-visible',
    IS_ATTACHED: 'is-attached',
    IS_DIRTY: 'is-dirty',

    // Appearance classes
    INLINE: 'mdl-datepicker--inline',
    FIXED: 'mdl-datepicker--fixed',
    LANDSCAPE: 'mdl-datepicker--landscape',

    // Datepicker related classes
    BACKDROP: 'mdl-datepicker__backdrop',
    WIDGET: 'mdl-datepicker__widget',
    INPUT: 'mdl-datepicker__input',
    NAVIGATION: 'mdl-datepicker__navigation',
    CALENDAR: 'mdl-datepicker__calendar',
    YEAR: 'mdl-datepicker__year',
    YEAR_SELECTED: 'mdl-datepicker__year--selected',
    YEAR_DISABLED: 'mdl-datepicker__year--disabled',
    YEAR_PICKER: 'mdl-datepicker--year-picker',
    YEAR_PICKER_ELEMENT: 'mdl-datepicker__year-picker',
    MONTH: 'mdl-datepicker__month',
    WEEKS: 'mdl-datepicker__weeks',
    WEEK: 'mdl-datepicker__week',
    WEEK_DAYS: 'mdl-datepicker__week-days',
    DATE: 'mdl-datepicker__date',
    DATE_TODAY: 'mdl-datepicker__date--today',
    DATE_SELECTED: 'mdl-datepicker__date--selected',
    DATE_EMPTY: 'mdl-datepicker__date--empty',
    DATE_DISABLED: 'mdl-datepicker__date--disabled',
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
  MaterialDatePicker.prototype.pickedDate_ = null;
  MaterialDatePicker.prototype.minDate_ = null;
  MaterialDatePicker.prototype.maxDate_ = null;

  /**
   * Trigger date picker internal events
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.triggerEvent_ = function(eventName) {
    var evt = document.createEvent('Events');
    evt.initEvent(eventName, true, true);
    this.element_.dispatchEvent(evt);
  };

  /**
   * Cancel action click handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.cancelHandler_ = function(e) {
    // e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.close();
    this.pickedDate_.setFullYear(this.selectedDate_.getFullYear());
    this.pickedDate_.setMonth(this.selectedDate_.getMonth());
    this.pickedDate_.setDate(this.selectedDate_.getDate());
    this.updateHeader_();
    this.updateMonthTitle_();
    this.changeCurrentMonth_(this.pickedDate_);
    if (this.element_.classList.contains(this.CssClasses_.YEAR_PICKER)) {
      this.element_.classList.remove(this.CssClasses_.YEAR_PICKER);
    }
  };

  /**
   * Ok action click handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.okHandler_ = function(e) {
    // e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.selectedDate_.setFullYear(this.pickedDate_.getFullYear());
    this.selectedDate_.setMonth(this.pickedDate_.getMonth());
    this.selectedDate_.setDate(this.pickedDate_.getDate());
    if (this.input_) {
      this.input_.value = this.formatInputDate_(this.selectedDate_);
    }
    this.element_.classList.add(this.CssClasses_.IS_DIRTY);
    if (this.element_.classList.contains(this.CssClasses_.YEAR_PICKER)) {
      this.element_.classList.remove(this.CssClasses_.YEAR_PICKER);
    }
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
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
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
   * Header year click handler
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.headerYearClickHandler_ = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (!this.element_.classList.contains(this.CssClasses_.YEAR_PICKER)) {
      this.element_.classList.add(this.CssClasses_.YEAR_PICKER);
      var selectedYear = this.yearPickerElement_.querySelector('.' + this.CssClasses_.YEAR_SELECTED);

      if (selectedYear) {
        var focusYear = selectedYear;

        for (var i = 0; i < 3; i++) {
          if (focusYear.previousElementSibling) {
            focusYear = focusYear.previousElementSibling;
          }
        }
        focusYear.parentNode.scrollTop = focusYear.offsetTop;
      }
    }
  };

  /**
   * Header date click handler
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.headerDateClickHandler_ = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (this.element_.classList.contains(this.CssClasses_.YEAR_PICKER)) {
      this.element_.classList.remove(this.CssClasses_.YEAR_PICKER);
    }
  };

  /**
   * Picker year click handler
   * @private
   * @param  {Event} e
   * @return {void}
   */
  MaterialDatePicker.prototype.pickYearHandler_ = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var selectedYear = this.yearPickerElement_.querySelector('.' + this.CssClasses_.YEAR_SELECTED);
    if (selectedYear && selectedYear.classList.contains(this.CssClasses_.YEAR_SELECTED)) {
      selectedYear.classList.remove(this.CssClasses_.YEAR_SELECTED);
    }
    var currentYear = e.target;
    currentYear.classList.add(this.CssClasses_.YEAR_SELECTED);
    var currentYearInt = parseInt(currentYear.getAttribute('data-year'), 10);

    this.pickedDate_.setFullYear(currentYearInt);
    var pickedDate = new Date(this.pickedDate_.getTime());
    if (!this.isInRange_(pickedDate)) {
      if (this.minDate_ && !this.maxDate_ && pickedDate.getTime() < this.minDate_.getTime()) {
        pickedDate.setFullYear(this.minDate_.getFullYear());
        pickedDate.setMonth(this.minDate_.getMonth());
        pickedDate.setDate(this.minDate_.getDate());
      } else if (!this.minDate_ && this.maxDate_ && pickedDate.getTime() > this.maxDate_.getTime()) {
        pickedDate.setFullYear(this.maxDate_.getFullYear());
        pickedDate.setMonth(this.maxDate_.getMonth());
        pickedDate.setDate(this.maxDate_.getDate());
      } else {
        pickedDate.setFullYear(this.minDate_.getFullYear());
        pickedDate.setMonth(this.minDate_.getMonth());
        pickedDate.setDate(this.minDate_.getDate());
      }

      this.pickedDate_.setFullYear(pickedDate.getFullYear());
      this.pickedDate_.setMonth(pickedDate.getMonth());
      this.pickedDate_.setDate(pickedDate.getDate());
    }

    this.currentMonth_.setFullYear(currentYearInt);
    this.currentMonth_.setMonth(this.pickedDate_.getMonth());
    this.currentMonth_.setDate(this.pickedDate_.getDate());

    this.updateHeader_();
    this.updateMonthTitle_();
    this.changeCurrentMonth_(this.currentMonth_);
  };

  /**
   * Select date action click handler
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.pickDateHandler_ = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
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

    var nextPickedDate = new Date(this.pickedDate_.getTime());
    nextPickedDate.setFullYear(this.currentMonth_.getFullYear());
    nextPickedDate.setMonth(this.currentMonth_.getMonth());
    nextPickedDate.setDate(pickedDateInt);

    if (this.isInRange_(nextPickedDate)) {
      this.pickedDate_.setFullYear(this.currentMonth_.getFullYear());
      this.pickedDate_.setMonth(this.currentMonth_.getMonth());
      this.pickedDate_.setDate(pickedDateInt);
      this.updateHeader_();
      this.updateYearPicker_();
    }
  };

  /**
   * Previous date picker month handler
   * @param  {Event} e
   * @return {void}
   */
  MaterialDatePicker.prototype.previousMonthHandler_ = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var previousMonth = new Date(this.currentMonth_.getTime());
    previousMonth.setMonth(this.currentMonth_.getMonth() - 1);
    this.changeCurrentMonth_(previousMonth);
  };

  /**
   * Next date picker month handler
   * @param  {Event} e
   * @return {void}
   */
  MaterialDatePicker.prototype.nextMonthHandler_ = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var nextMonth = new Date(this.currentMonth_.getTime());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.changeCurrentMonth_(nextMonth);
  };

  /**
   * Format given date for input value
   * @param  {Date}     dateObject
   * @return {string}
   */
  MaterialDatePicker.prototype.formatInputDate_ = function(dateObject) {
    var dateFormatted;

    // If guven format is actually function,
    // execute in global scope with selected date as parameter
    if (typeof this.settings.format === 'function') {
      var formatFunction = this.settings.format;
      var selectedDate = this.selectedDate_;
      return formatFunction.call(window, selectedDate);
    }

    /**
     * Append leading zero if necessary
     * @param {number} number
     * @return {string}
     */
    var addLeadingZero = function(number) {
      return ('0' + number).substr(-2, 2);
    };

    switch (this.settings.format) {
      case 'dd.mm.yyyy':
        dateFormatted = [
          addLeadingZero(dateObject.getDate()),
          addLeadingZero(dateObject.getMonth() + 1),
          dateObject.getFullYear()
        ].join('.');
        break;
      case 'yyyy-mm-dd':
        dateFormatted = [
          dateObject.getFullYear(),
          addLeadingZero(dateObject.getMonth() + 1),
          addLeadingZero(dateObject.getDate())
        ].join('-');
        break;
      case 'mm/dd/yyyy':
        dateFormatted = [
          addLeadingZero(dateObject.getMonth() + 1),
          addLeadingZero(dateObject.getDate()),
          dateObject.getFullYear()
        ].join('/');
        break;
      default:
        dateFormatted = [
          addLeadingZero(dateObject.getMonth() + 1),
          addLeadingZero(dateObject.getDate()),
          dateObject.getFullYear()
        ].join('/');
        break;
    }

    return dateFormatted;
  };

  /**
   * Format given date for header display
   * @param  {Date}     date
   * @return {string}
   */
  MaterialDatePicker.prototype.formatHeaderDate_ = function(date) {
    return (
      this.settings.weekDaysShort[date.getDay()] + ', ' +
      this.settings.monthsShort[date.getMonth()] + ' '  +
      date.getDate()
    );
  };

  /**
   * Check if gived date is today
   * @param  {Date}     currentDate
   * @return {boolean}
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
   * @return {boolean}
   */
  MaterialDatePicker.prototype.isPickedDate_ = function(currentDate) {
    if (!this.pickedDate_) {
      return false;
    }
    if (this.pickedDate_.getFullYear() !== currentDate.getFullYear()) {
      return false;
    }
    if (this.pickedDate_.getMonth() !== currentDate.getMonth()) {
      return false;
    }
    if (this.pickedDate_.getDate() !== currentDate.getDate()) {
      return false;
    }
    return true;
  };

  /**
   * Check if given date is in range, if range is set.
   * @private
   * @param  {Date}  dateObject
   * @return {boolean}
   */
  MaterialDatePicker.prototype.isInRange_ = function(dateObject) {
    var isInRange = true;

    if (this.minDate_ && !this.maxDate_) {
      if (this.minDate_.getTime() > dateObject.getTime()) {
        isInRange = false;
      }
    } else if (!this.minDate_ && this.maxDate_) {
      if (this.maxDate_.getTime() < dateObject.getTime()) {
        isInRange = false;
      }
    } else if (this.minDate_ && this.maxDate_) {
      if (this.minDate_.getTime() <= dateObject.getTime() &&
          dateObject.getTime() <= this.maxDate_.getTime()) {

      } else {
        isInRange = false;
      }
    }

    return isInRange;
  };

  /**
   * Check if given year is in range, if range is set
   * @param  {number}  year
   * @return {boolean}
   */
  MaterialDatePicker.prototype.isYearInRange_ = function(year) {
    var isInRange = true;

    if (this.minDate_ && !this.maxDate_) {
      if (this.minDate_.getFullYear() > year) {
        isInRange = false;
      }
    } else if (!this.minDate_ && this.maxDate_) {
      if (this.maxDate_.getFullYear() < year) {
        isInRange = false;
      }
    } else if (this.minDate_ && this.maxDate_) {
      if (this.minDate_.getFullYear() <= year &&
          year <= this.maxDate_.getFullYear()) {
        // Everything ok
      } else {
        isInRange = false;
      }
    }

    return isInRange;
  };

  /**
   * Change current month and rerender calendar
   * @private
   * @param  {Date} currentMonth
   * @return {void}
   */
  MaterialDatePicker.prototype.changeCurrentMonth_ = function(currentMonth) {
    if (!currentMonth) {
      return undefined;
    }
    var currentMonthElement = this.renderMonth_(currentMonth);

    if (this.currentMonthElement_) {
      this.calendarElement_.insertBefore(currentMonthElement, this.currentMonthElement_);
    } else {
      this.calendarElement_.appendChild(currentMonthElement);
    }

    var dateButtons = this.currentMonthElement_.querySelectorAll('.' + this.CssClasses_.DATE);
    for (var i = 0; i < dateButtons.length; i++) {
      var dateButton = dateButtons[i];
      dateButton.removeEventListener('click', this.boundPickDateHandler);
    }
    if (this.currentMonthElement_.remove) {
      this.currentMonthElement_.remove();
    } else {
      this.currentMonthElement_.parentNode.removeChild(this.currentMonthElement_);
    }
    this.currentMonthElement_ = currentMonthElement;
    this.currentMonth_ = currentMonth;
    this.updateMonthTitle_();
  };

  /**
   * Render datepicker dialog
   *
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.render_ = function() {
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

      // Bind click events
      this.boundHeaderYearClickHandler = this.headerYearClickHandler_.bind(this);
      this.boundHeaderDateClickHandler = this.headerDateClickHandler_.bind(this);
      this.headerYearElement_.addEventListener('click', this.boundHeaderYearClickHandler);
      this.headerDateElement_.addEventListener('click', this.boundHeaderDateClickHandler);

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
      this.headerDateElement_.innerHTML = this.formatHeaderDate_(this.pickedDate_);
    }
  };

  /**
   * Update current month title
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.updateMonthTitle_ = function() {
    this.currentMonthTitleElement_.innerHTML = (
      this.settings.months[this.currentMonth_.getMonth()] + ', ' +
      this.currentMonth_.getFullYear()
    );
  };

  /**
   * Update year picker current year
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.updateYearPicker_ = function() {
    var pickedYear = this.yearPickerElement_.querySelector('.' + this.CssClasses_.YEAR_SELECTED);
    if (pickedYear) {
      pickedYear.classList.remove(this.CssClasses_.YEAR_SELECTED);
    }
    pickedYear = this.yearPickerElement_.querySelector(
      '.' + this.CssClasses_.YEAR + '[data-year="' + this.pickedDate_.getFullYear() + '"]'
    );
    pickedYear.classList.add(this.CssClasses_.YEAR_SELECTED);

    var focusYear = pickedYear;
    for (var i = 0; i < 3; i++) {
      if (focusYear.previousElementSibling) {
        focusYear = focusYear.previousElementSibling;
      }
    }
    focusYear.parentNode.scrollTop = focusYear.offsetTop;
  };

  /**
   * Render entire date picker content
   *
   * @private
   * @return {Element}
   */
  MaterialDatePicker.prototype.renderCalendar_ = function() {
    if (!this.calendarElement_) {
      this.calendarElement_ = document.createElement('div');
      this.calendarElement_.classList.add(this.CssClasses_.CALENDAR);

      this.calendarElement_.appendChild(this.renderNavigation_());
      this.calendarElement_.appendChild(this.renderWeekDays_());
      this.currentMonthElement_ = this.renderMonth_(this.currentMonth_);
      this.calendarElement_.appendChild(this.currentMonthElement_);
      this.calendarElement_.appendChild(this.renderYearPicker_());
      this.calendarElement_.appendChild(this.renderActions_());
    }

    return this.calendarElement_;
  };

  /**
   * Render month navigation
   *
   * @private
   * @return {Element}
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
      previousMonth.addEventListener('click', this.boundPreviousMonthHandler, true);
      nextMonth.addEventListener('click', this.boundNextMonthHandler, true);

      this.currentMonthTitleElement_ = document.createElement('div');
      this.currentMonthTitleElement_.classList.add(this.CssClasses_.MONTH_CURRENT);

      if (this.currentMonth_) {
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
   * @return {Element}
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
   * @return {Element}
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

          if (!this.isInRange_(currentDay)) {
            weekDay.classList.add(this.CssClasses_.DATE_DISABLED);
          }

          // Bind select date event
          if (!weekDay.classList.contains(this.CssClasses_.DATE_DISABLED)) {
            if (this.isToday_(currentDay)) {
              weekDay.classList.add(this.CssClasses_.DATE_TODAY);
            }

            // Check if current day is selected
            if (this.isPickedDate_(currentDay)) {
              weekDay.classList.add(this.CssClasses_.DATE_SELECTED);
            }

            this.boundPickDateHandler = this.pickDateHandler_.bind(this);
            weekDay.addEventListener('click', this.boundPickDateHandler, true);
          }
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
   * Render year picker
   * @private
   * @return {Element}
   */
  MaterialDatePicker.prototype.renderYearPicker_ = function() {
    var year;
    var yearButton;

    if (!this.yearPickerElement_) {
      this.yearPickerElement_ = document.createElement('div');
      this.yearPickerElement_.classList.add(this.CssClasses_.YEAR_PICKER_ELEMENT);

      var today = new Date();
      var startYear = today.getFullYear() - 100;
      var endYear = today.getFullYear() + 100;
      this.boundPickYearHandler = this.pickYearHandler_.bind(this);

      for (year = startYear; year <= endYear; year++) {
        yearButton = document.createElement('button');
        yearButton.classList.add(this.CssClasses_.YEAR);
        yearButton.setAttribute('data-year', year);
        yearButton.innerHTML = year;

        if (this.isYearInRange_(year)) {
          yearButton.addEventListener('click', this.boundPickYearHandler);
          if (this.pickedDate_) {
            if (this.pickedDate_.getFullYear() === year) {
              yearButton.classList.add(this.CssClasses_.YEAR_SELECTED);
            }
          }
        } else {
          yearButton.classList.add(this.CssClasses_.YEAR_DISABLED);
        }

        this.yearPickerElement_.appendChild(yearButton);
      }
    } else {
      // Year picker already rendered, yust need to update state
      var yearButtons = this.yearPickerElement_.querySelectorAll('.' + this.CssClasses_.YEAR);
      for (var i = 0; i < yearButtons.length; i++) {
        yearButton = null;
        yearButton = yearButtons[i];
        var existingYear = parseInt(yearButton.getAttribute('data-year'), 10);

        if (this.isYearInRange_(existingYear)) {
          if (yearButton.classList.contains(this.CssClasses_.YEAR_DISABLED)) {
            yearButton.classList.remove(this.CssClasses_.YEAR_DISABLED);
          }
          // First try remove, then add event listener again to avoid duplication
          yearButton.removeEventListener('click', this.boundPickYearHandler);
          yearButton.addEventListener('click', this.boundPickYearHandler);
        } else {
          yearButton.removeEventListener('click', this.boundPickYearHandler);
          yearButton.classList.add(this.CssClasses_.YEAR_DISABLED);
        }
      }
    }

    return this.yearPickerElement_;
  };

  /**
   * Render date picker actions
   *
   * @private
   * @return {Element}
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

      this.cancelElement_.addEventListener('click', this.boundCancelActionHandler, true);
      this.okElement_.addEventListener('click', this.boundOkActionHandler, true);

      this.actionsElement_.appendChild(this.cancelElement_);
      this.actionsElement_.appendChild(this.okElement_);

      componentHandler.upgradeElement(this.cancelElement_);
      componentHandler.upgradeElement(this.okElement_);
    }

    return this.actionsElement_;
  };

  /**
   * Destroy all properties and widget elements
   * @private
   * @return {void}
   */
  MaterialDatePicker.prototype.destroy_ = function() {
    var i = 0;

    if (this.yearPickerElement_) {
      var yearButtons = this.yearPickerElement_.querySelectorAll('.' + this.CssClasses_.YEAR);
      for (i = 0; i < yearButtons.length; i++) {
        var yearButton = yearButtons[i];
        yearButton.removeEventListener('click', this.boundPickYearHandler);
      }
    }
    if (this.currentMonthElement_) {
      var dateButtons = this.currentMonthElement_.querySelectorAll('.' + this.CssClasses_.DATE);
      for (i = 0; i < dateButtons.length; i++) {
        var dateButton = dateButtons[i];
        dateButton.removeEventListener('click', this.boundPickDateHandler);
      }
    }
    if (this.cancelElement_) {
      componentHandler.downgradeElements(this.cancelElement_);
      this.cancelElement_.removeEventListener('click', this.boundCancelActionHandler);
    }
    if (this.okElement_) {
      componentHandler.downgradeElements(this.okElement_);
      this.okElement_.removeEventListener('click', this.boundOkActionHandler);
    }
    if (this.navigationElement_) {
      var previousMonth = this.navigationElement_.querySelector('.' + this.CssClasses_.MONTH_PREVIOUS);
      var nextMonth = this.navigationElement_.querySelector('.' + this.CssClasses_.MONTH_NEXT);

      if (previousMonth) {
        previousMonth.removeEventListener('click', this.boundPreviousMonthHandler);
      }
      if (nextMonth) {
        nextMonth.removeEventListener('click', this.boundNextMonthHandler);
      }
    }
    if (this.headerDateElement_) {
      this.headerDateElement_.removeEventListener('click', this.boundHeaderDateClickHandler);
    }
    if (this.headerYearElement_) {
      this.headerYearElement_.removeEventListener('click', this.boundHeaderYearClickHandler);
    }
    if (this.widgetElement_) {
      if (this.widgetElement_.remove) {
        this.widgetElement_.remove();
      } else {
        this.widgetElement_.parentNode.removeChild(this.widgetElement_);
      }
      this.widgetElement_ = null;
    }
  };

  /**
   * Open date picker dialog
   *
   * @public
   * @return {void}
   */
  MaterialDatePicker.prototype.open = function() {
    // Date picker widget already opened
    if (this.element_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      return;
    }

    if (!this.widgetElement_) {
      this.render_();
    }

    // Slightly delay picker show to enable animation
    setTimeout(function() {
      if (this.backdrop_) {
        this.backdrop_.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
      this.element_.classList.add(this.CssClasses_.IS_VISIBLE);
      this.triggerEvent_('open');
    }.bind(this), 0);
  };
  MaterialDatePicker.prototype['open'] = MaterialDatePicker.prototype.open;

  /**
   * Close date picker dialog
   *
   * @public
   * @return {void}
   */
  MaterialDatePicker.prototype.close = function() {
    // Inline styles can't be closed.
    // @TODO: This should be reviewed with Google guys
    if (this.element_.classList.contains(this.CssClasses_.INLINE)) {
      return;
    }

    // Date picker widget already closed
    if (!this.element_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      return;
    }
    if (this.element_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      if (this.backdrop_) {
        this.backdrop_.style.display = 'none';
        document.body.style.overflow = 'initial';
      }
      this.element_.classList.remove(this.CssClasses_.IS_VISIBLE);
      this.triggerEvent_('close');

      setTimeout(function() {
        // Destroy all properties and wiget elements after close
        this.destroy_();
      }.bind(this), 200);
    }
  };
  MaterialDatePicker.prototype['close'] = MaterialDatePicker.prototype.close;

  /**
   * Get selected date to datepicker
   *
   * @public
   * @return {Date}
   */
  MaterialDatePicker.prototype.getSelectedDate = function() {
    return this.selectedDate_;
  };
  MaterialDatePicker.prototype['getSelectedDate'] = MaterialDatePicker.prototype.getSelectedDate;

  /**
   * Set selected date to datepicker
   *
   * @param  {Date} selectedDate
   *
   * @public
   * @return {Date}
   */
  MaterialDatePicker.prototype.setSelectedDate = function(selectedDate) {
    if (selectedDate && this.isInRange_(selectedDate)) {
      this.pickedDate_ = selectedDate;
      this.currentMonth_ = selectedDate;
      this.selectedDate_ = selectedDate;
      this.render_();
    }

    return this.getSelectedDate();
  };
  MaterialDatePicker.prototype['setSelectedDate'] = MaterialDatePicker.prototype.setSelectedDate;

  /**
   * Set allowed date picker range. Dates outside of the range can't be selected.
   * @param {Date} minDate Minimum date
   * @param {Date} maxDate Maximum date
   */
  MaterialDatePicker.prototype.setRange = function(minDate, maxDate) {
    if (minDate && minDate instanceof Date) {
      // Set minimum lowest possible value of the date
      minDate.setHours(0);
      minDate.setMinutes(0);
      minDate.setSeconds(0);
      minDate.setMilliseconds(0);
    }
    this.minDate_ = minDate || null;

    if (maxDate && maxDate instanceof Date) {
      // Set maximum highest possible value of the date
      maxDate.setHours(23);
      maxDate.setMinutes(59);
      maxDate.setSeconds(59);
      maxDate.setMilliseconds(999);
    }
    this.maxDate_ = maxDate || null;

    // Means that widget exists and is opened
    if (this.widgetElement_) {
      this.changeCurrentMonth_(this.currentMonth_);
      this.renderYearPicker_();
    }
  };
  MaterialDatePicker.prototype['setRange'] = MaterialDatePicker.prototype.setRange;

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
        this.input_.addEventListener('focus', this.boundInputFocusHandler, true);
      }

      // Setup properties default values.
      this.pickedDate_ = new Date();
      this.currentMonth_ = new Date();
      this.selectedDate_ = new Date();

      if (this.element_.classList.contains(this.CssClasses_.FIXED)) {
        this.backdrop_ = document.createElement('div');
        this.backdrop_.classList.add(this.CssClasses_.BACKDROP);
        this.backdrop_.style.display = 'none';
        this.backdrop_.setAttribute('tabindex', -1);
        document.body.appendChild(this.backdrop_);
      }

      if (this.element_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
        // Hide datepicker until it is fully rendered
        this.element_.classList.remove(this.CssClasses_.IS_VISIBLE);

        // Once rendered, show datepicker
        this.open();
      }

      // Set private isInitialized_ property for internal tracking
      this.isInitialized_ = true;

      // Add "is-updated" class
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    }
  };

  /**
   * Downgrade datepicker component
   * @return {void}
   */
  MaterialDatePicker.prototype.mdlDowngrade_ = function() {
    if (this.input_) {
      this.input_.removeEventListener('click', this.boundInputFocusHandler);
    }
    if (this.backdrop_) {
      if (this.backdrop_.remove) {
        this.backdrop_.remove();
      } else {
        this.backdrop_.parentNode.removeChild(this.backdrop_);
      }
    }
    this.destroy_();

    // Trigger "destroy" event for all those who are listening
    // for other component events
    this.triggerEvent_('destroy');
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
