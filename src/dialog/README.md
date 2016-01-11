## Introduction

The Material Design Lite (MDL) **dialog** component allows for verification of
user actions, simple data input, and alerts to provide extra information to users.

## To include a MDL **dialog** component

&nbsp;1a. Create an element as a child of the `<body>` for the dialog.
This should include at least two child elements.
The children elements will contain the content and actions.
```html
<body>
  <div>
    <div></div>
    <div></div>
  </div>
</body>
```

&nbsp;1b. Add the appropriate MDL classes to the element.
```html
  <body>
    <div class="mdl-dialog mdl-js-dialog">
      <div class="mdl-dialog__content"></div>
      <div class="mdl-dialog__actions"></div>
    </div>
  </body>
```

&nbsp;2. Add the content for the dialog.
```html
<body>
  <div class="mdl-dialog mdl-js-dialog">
    <div class="mdl-dialog__content">
      <p>
        Allow this site to collect usage data to improve your experience?
      <p>
    </div>
    <div class="mdl-dialog__actions"></div>
  </div>
</body>
```

&nbsp;3. Add two action buttons.
One should do no action and return the user to their last state on the page.
The primary button should carry out the requested action.
```html
<body>
  <div class="mdl-dialog mdl-js-dialog">
    <div class="mdl-dialog__content">
      <p>
        Allow this site to collect usage data to improve your experience?
      <p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button">Agree</button>
      <button type="button" class="mdl-button">Disagree</button>
    </div>
  </div>
</body>
```

&nbsp;4. Add any trigger to the page for the dialog to display.
For example a button.
```html
<body>
  <button id="show-dialog" type="button" class="mdl-button">Show Dialog</button>
  <div class="mdl-dialog mdl-js-dialog">
    <div class="mdl-dialog__content">
      <p>
        Allow this site to collect usage data to improve your experience?
      <p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button">Agree</button>
      <button type="button" class="mdl-button">Disagree</button>
    </div>
  </div>
</body>
```

&nbsp;5. Add JavaScript to trigger showing the dialog, closing the dialog,
and carrying out any needed actions on affirmative actions.
```javascript
(function() {
  'use strict';
  var dialog = document.querySelector('.mdl-dialog');
  var showButton = document.querySelector('#show-dialog');
  var actions = dialog
    .querySelector('.mdl-dialog__actions')
    .querySelectorAll('.mdl-button');
  var showHandler = function(event) {
    dialog.MaterialDialog.show();
  };
  var agreeHandler = function(event) {
    // Do your action logic here.
    dialog.MaterialDialog.close();
  };
  var disagreeHandler = function(event) {
    // Do what you need to based on user disagreement.
    dialog.MaterialDialog.close();
  };
  showButton.addEventListener('click', showHandler);
  actions[0].addEventListener('click', agreeHandler);
  actions[1].addEventListener('click', disagreeHandler);
}());
```

## Examples

### Simple dialog
```html
<body>
  <button type="button" class="mdl-button">Show Dialog</button>
  <div class="mdl-dialog mdl-js-dialog">
    <div class="mdl-dialog__content">
      <p>
        Allow this site to collect usage data to improve your experience?
      <p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button">Agree</button>
      <button type="button" class="mdl-button">Disagree</button>
    </div>
  </div>
</body>
```

### Dialog with title
```html
<body>
  <button id="show-dialog" type="button" class="mdl-button">Show Dialog</button>
  <div class="mdl-dialog mdl-js-dialog">
    <div class="mdl-dialog__title">
      <h4>Allow data collection?</h4>
    </div>
    <div class="mdl-dialog__content">
      <p>
        Allowing us to collect data will let us get you the information you want faster.
      <p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button">Agree</button>
      <button type="button" class="mdl-button">Disagree</button>
    </div>
  </div>
</body>
```

### Dialog with full width actions
```html
<body>
  <button type="button" class="mdl-button">Show Dialog</button>
  <div class="mdl-dialog mdl-js-dialog">
    <div class="mdl-dialog__content">
      <p>
        Allow this site to collect usage data to improve your experience?
      <p>
    </div>
    <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
      <button type="button" class="mdl-button">Agree</button>
      <button type="button" class="mdl-button">Disagree</button>
    </div>
  </div>
</body>
```

## JavaScript methods

The dialog component is accessed through the element where `mdl-js-dialog` is defined.
This is accessed through the `MaterialDialog` property on that node.
The following table describes the methods available and their use.

| Method | Use |
|--------|-----|
| `show` | Show a dialog. |
| `showModal` | Show a dialog as a modal. This includes a dark backdrop over the content. |
| `close` | Closes a dialog so it is no longer in view. |

### Example

```javascript
(function() {}(
  'use strict';
  // Find the dialog you wish to show or hide.
  var dialog = document.querySelector('.mdl-js-dialog');
  // Showing the dialog
  dialog.MaterialDialog.show();
  // Close the dialog from view.
  dialog.MaterialDialog.close();
  // Show the dialog with a backdrop over the content.
  dialog.MaterialDialog.showModal();
));
```

## Configuration options

The table below lists available classes and their effects.

| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-dialog` | Defines the container of the dialog component. | Required on dialog container. |
| `mdl-dialog__title` | Defines the title container in the dialog. | Optional on title container. |
| `mdl-dialog__content` | Defines the content container of the dialog. | Required on content container. |
| `mdl-dialog__actions` | Defines the actions container in the dialog. | Required on action container. |
| `mdl-dialog__actions--full-width` | Modifies the actions to each take the full width of the container. This makes each take their own line. | Optional on action container. |
