## Introduction
The Material Design Lite (MDL) **date picker** component allows user to easily pick specific date from calendar. Component allows user to quickly switch between months (month picker) and years (year picker) context views. They are activated by clicking on year or date in component header. Month picker is automatically selected upon component initialization.

## Basic usage
There are two different starting points for date picker component usage.
First one is picker attached to mdl-textfield which allows user to automatically populate input with formatted value of selected date.
Second one is standalone picker which requires code logic to handle date picker "selected date" after picker is changed or closed.

```html
<!-- Standalone date picker component -->
<div class="mdl-datepicker mdl-js-datepicker"></div>
```

```html
<!-- Input attached date picker component -->
<div class="mdl-textfield mdl-js-textfield mdl-datepicker mdl-js-datepicker">
    <input type="text" class="mdl-textfield__input mdl-datepicker__input">
    <label class="mdl-textfield__label">Select date</label>
</div>
```

##Usage examples

###Input attached date picker

```html
<div id="demo-picker" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-datepicker mdl-js-datepicker">
  <input type="text" class="mdl-textfield__input mdl-datepicker__input" required>
  <label class="mdl-textfield__label">Select date</label>
</div><!-- /.mdl-datepicker mdl-js-datepicker -->
```

###Fixed date picker

```html
<div id="fixed-picker" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-datepicker mdl-js-datepicker mdl-datepicker--fixed">
  <input type="text" class="mdl-textfield__input mdl-datepicker__input">
  <label class="mdl-textfield__label">Select date</label>
</div><!-- /.mdl-datepicker mdl-js-datepicker -->
```

###Custom format component

```html
<div id="custom-format" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-datepicker mdl-js-datepicker mdl-datepicker--fixed">
  <input type="text" class="mdl-textfield__input mdl-datepicker__input">
  <label class="mdl-textfield__label">Select date</label>
</div><!-- /.mdl-datepicker mdl-js-datepicker -->

<script>
    var customFormat = document.querySelector('#custom-format');
    customFormat.MaterialDatePicker.locales.format = function (selectedDate) {
      return [
        addLeadingZero(selectedDate.getDate()),
        addLeadingZero(selectedDate.getMonth() + 1),
        selectedDate.getFullYear()
      ].join('+');
    };
</script>
```


###Allowed date range

```html
<div id="custom-range" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-datepicker mdl-js-datepicker mdl-datepicker--fixed">
  <input type="text" class="mdl-textfield__input mdl-datepicker__input">
  <label class="mdl-textfield__label">Select date</label>
</div><!-- /.mdl-datepicker mdl-js-datepicker -->

<script>
    var minDate = new Date(),
        maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);

    var customRange = document.querySelector('#custom-range');
    customRange.MaterialDatePicker.setRange(minDate, maxDate);
</script>
```

###Inline standalone date picker

```html
<div id="inline-datepicker" class="mdl-datepicker mdl-js-datepicker mdl-datepicker--inline is-visible">
  <p>Selected date: <span id="inline-selected-date"></span></p>
</div><!-- /.mdl-datepicker mdl-js-datepicker -->

<script>
    var inlinePicker = document.querySelector('#inline-datepicker');
    var inlinePickerSpan = document.querySelector('#inline-selected-date');
    inlinePicker.addEventListener('change', function(e) {
      var selectedDate = inlinePicker.MaterialDatePicker.getSelectedDate();
      inlinePickerSpan.innerHTML = [
        selectedDate.getFullYear(),
        addLeadingZero(selectedDate.getMonth() + 1),
        addLeadingZero(selectedDate.getDate())
      ].join('-');
    });
</script>
```

###Inline landscape oriented date picker

```html
<div id="landscape-datepicker" class="mdl-datepicker mdl-js-datepicker mdl-datepicker--landscape mdl-datepicker--inline is-visible">
  <p>Selected date: <span id="landscape-selected-date"></span></p>
</div><!-- /.mdl-datepicker mdl-js-datepicker -->

<script>
    var landscapePicker = document.querySelector('#landscape-datepicker');
    var landscapePickerSpan = document.querySelector('#landscape-selected-date');
    landscapePicker.addEventListener('change', function(e) {
      var selectedDate = landscapePicker.MaterialDatePicker.getSelectedDate();
      landscapePickerSpan.innerHTML = [
        selectedDate.getFullYear(),
        addLeadingZero(selectedDate.getMonth() + 1),
        addLeadingZero(selectedDate.getDate())
      ].join('-');
    });
</script>
```

##CSS classes

###Blocks

| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| mdl-datepicker | Defines the container of the date picker component | Required on date picker container |
| mdl-js-datepicker | Assigns basic MDL behavior to date picker component | Required on date picker container |

###Elements
| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| mdl-datepicker__input | Defines input element on which date picker component is attached | Optional on date picker component |

###Modifiers
| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| mdl-datepicker--fixed | Modify component to be displayed fixed inside window. | Optional on date picker component |
| mdl-datepicker--inline | Modify component to be displayed inline and relative to container. | Optional on picker component |
| mdl-datepicker--landscape | Modify component to be displayed in landscape mode. | Optional on picker component. |