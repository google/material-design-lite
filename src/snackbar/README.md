# Snackbar

## Introduction

The Material Design Lite (MDL) **snackbar** component is a container used to notify a user of an operation's status.
It displays at the bottom of the screen.
The action should not be to close the snackbar.

Snackbars may also be used as a **toast** component.

## Usage

&nbsp;1. Create a `<div>` element to contain the snackbar. This element should have no content of its own.

```html
<div>
</div>
```

&nbsp;2. Add the `mdl-js-snackbar` class to the container.

```html
<div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar">
</div>
```

> Note: Here we also added some basic aria attributes for accessiblity. Please modify these as-needed for your site.

&nbsp;3. Use JavaScript to trigger a snackbar.

```JavaScript
var notification = document.querySelector('.mdl-js-snackbar');
var data = {
  message: 'Message Sent'
};
notification.MaterialSnackbar.showSnackbar(data);
```

## Examples

### Snackbar

```js
var notification = document.querySelector('.mdl-js-snackbar');
var data = {
  message: 'Message Sent',
  actionHandler: function(event) {},
  actionText: 'Undo',
  timeout: 10000
};
notification.MaterialSnackbar.showSnackbar(data);
```

### Toast

```js
var notification = document.querySelector('.mdl-js-snackbar');
notification.MaterialSnackbar.showSnackbar({message: 'Image Uploaded'});
```

## Data Object

The Snackbar components `showSnackbar` method takes an object for snackbar data.
The table below shows the properties and their usage.

| Property | Effect | Remarks | Type |
|-----------|--------|---------|---------|
| message   | The text message to display. | Required | String |
| timeout   | The amount of time in milliseconds to show the snackbar. | Optional (default 8000) | Integer |
| actionHandler | The function to execute when the action is clicked. | Optional | Function |
| actionText | The text to display for the action button. | Required if actionHandler is set |  String. |
