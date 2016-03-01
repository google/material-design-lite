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

 function addLeadingZero(number) {
   return ('0' + number).substr(-2, 2);
 };

describe('MaterialDatePicker', function () {

  it('should be globally available', function () {
    expect(MaterialDatePicker).to.be.a('function');
  });

  it('should upgrade successfully', function() {
    var element = document.createElement('div');
    element.classList.add('mdl-datepicker');
    element.classList.add('mdl-js-datepicker');

    componentHandler.upgradeElement(element, 'MaterialDatePicker');
    expect($(element)).to.have.data('upgraded', ',MaterialDatePicker');
  });

  it('should be a widget', function() {
    var element = document.createElement('div');
    element.classList.add('mdl-datepicker');
    element.classList.add('mdl-js-datepicker');

    componentHandler.upgradeElement(element, 'MaterialDatePicker');
    expect(element.MaterialDatePicker).to.be.a('object');
  });

  describe('Visibe API', function() {
    var element;

    before(function() {
      element = document.createElement('div');
      element.classList.add('mdl-datepicker');
      element.classList.add('mdl-js-datepicker');

      componentHandler.upgradeElement(element, 'MaterialDatePicker');
    });

    it('should show on open()', function(done) {
      expect($(element)).to.not.have.class('is-visible');
      element.MaterialDatePicker.open();

      window.setTimeout(function() {
        expect($(element)).to.have.class('is-visible');
        done();
      }, 200);
    });

    it('should hide on close()', function(done) {
      expect($(element)).to.have.class('is-visible');
      element.MaterialDatePicker.close();

      window.setTimeout(function() {
        expect($(element)).to.not.have.class('is-visible');
        done();
      }, 200);
    });

    it('should be able to set selected date', function() {
      var selectedDate = new Date();
      element.MaterialDatePicker.setSelectedDate(selectedDate);
      expect(element.MaterialDatePicker.getSelectedDate().getTime()).to.equal(selectedDate.getTime());
    });

    it('should be able to set date range', function() {
      var minDate = new Date(),
          maxDate = null;

      element.MaterialDatePicker.setRange(minDate, maxDate);
    });

    it('should keep date in range', function () {
      var minDate = new Date(),
          maxDate = new Date();
      minDate.setDate(1);
      maxDate.setDate(1);
      maxDate.setMonth(maxDate.getMonth() + 1);
      maxDate.setDate(maxDate.getDate() - 1);

      // Set range to first and last day of the current month
      element.MaterialDatePicker.setRange(minDate, maxDate);

      // Set selected date on the last day of previous month (out of range)
      var selectedDate = new Date(minDate.getTime());
      selectedDate.setDate(selectedDate.getDate() - 1)
      element.MaterialDatePicker.setSelectedDate(selectedDate);

      var validatedSelectedDate = element.MaterialDatePicker.getSelectedDate();
      var isValid = false;
      if (minDate.getTime() <= validatedSelectedDate.getTime() && validatedSelectedDate.getTime() <= maxDate.getTime()) {
        isValid = true;
      }
      expect(isValid).to.equal(true);
    });

  });

  describe('Interaction', function() {
    var element,
        textInput;

    before(function() {
      textInput = document.createElement('input');
      textInput.classList.add('mdl-js-textfield');
      textInput.classList.add('mdl-textfield__input');
      textInput.classList.add('mdl-datepicker__input');

      element = document.createElement('div');
      element.classList.add('mdl-datepicker');
      element.classList.add('mdl-js-datepicker');
      element.classList.add('mdl-textfield');
      element.classList.add('mdl-js-textfield');
      element.appendChild(textInput);

      componentHandler.upgradeElement(element, 'MaterialDatePicker');
    });

    it('should upgrade textfield', function() {
      expect($(textInput)).to.have.data('upgraded', ',MaterialTextfield');
    });

    it('should populate textfield after date selection process', function(done) {
      element.MaterialDatePicker.open();

      window.setTimeout(function() {
        var month = element.querySelector('.mdl-datepicker__month');
        var weeks = month.querySelectorAll('.mdl-datepicker__week');

        var days = weeks[3].querySelectorAll('.mdl-datepicker__date');
        var testDay = days[3];

        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, true);
        element.dispatchEvent(evt);

        window.setTimeout(function() {
          var okButton = element.querySelector('.mdl-datepicker__ok');

          var evt2 = document.createEvent('MouseEvents');
          evt2.initEvent('click', true, true);
          okButton.dispatchEvent(evt2);

          window.setTimeout(function() {
            var selectedDate = element.MaterialDatePicker.getSelectedDate();
            expect(textInput.value).to.equal(
              [selectedDate.getFullYear(), addLeadingZero(selectedDate.getMonth() + 1), addLeadingZero(selectedDate.getDate())].join('-')
            );

            done();
          }, 100);
        }, 100);
      }, 100);
    });

  });

});