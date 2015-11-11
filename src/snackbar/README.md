## Introduction

The Material Design Lite (MDL) **snackbar** component is a container used to notify a user of an operation's status.
It displays at the bottom of the screen.
A snackbar may contain an action button to execute a command for the user.
Actions should undo the committed action or retry it if it failed for example.
Actions should not be to close the snackbar.
By not providing an action, the snackbar becomes a **toast** component.

## To include an MDL **snackbar** component:

&nbsp;1. Create a `<div>` element to contain the snackbar. This element should have no content of its own and be a direct child of the `<body>`.

```html
<body>
  <div>
  </div>
</body>
```

&nbsp;2. Add the `mdl-js-snackbar` class to the container.

```html
<div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar">
</div>
```

> Note: In this example there are a few aria attributes for accessibility. Please modify these as-needed for your site.

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
