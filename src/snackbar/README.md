# Snackbar

## Introduction

The Material Design Lite (MDL) **snackbar** component is a container used to notify a user of an operation's status. It displays at the bottom of the screen.

Snackbars may also be used as a **toast** component. A toast may not be removed by the user and does not contain any actions.

## Usage

&nbsp;1. Add the `mdl-js-snackbar` class an element that is a direct child of the body.

```html
<div class="mdl-js-snackbar">
</div>
```

&nbsp;2. Use JavaScript to trigger a snackbar.

```JavaScript
var data = {
  message: 'Message Sent'
};
document.body.MaterialSnackbar.showSnackbar(data);
```

## Examples

### Snackbar

```JavaScript
var data = {
  message: 'Message Sent',
  actionHandler: function(event) {},
  actionText: 'Undo',
  timeout: 10000
};
document.body.MaterialSnackbar.showSnackbar(data);
```

### Toast

```JavaScript
document.body.MaterialSnackbar.showSnackbar({message: 'Image Uploaded'});
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

## License

Copyright Google, 2015. Licensed under an Apache-2 license.
