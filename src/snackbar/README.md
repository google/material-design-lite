# Snackbar

## Introduction

The Material Design Lite (MDL) **snackbar** component is a container used to notify a user of an operation's status. It displays at the bottom of the screen.

Snackbars may also be used as a **toast** component. A toast may not be removed by the user and does not contain any actions.

## Usage

&nbsp;1a. Code a `<div>` element. This must be a direct child of the `<body>` element.

```html
<body>
  <div>
  </div>
</body>
```

&nbsp;1b. Add the snackbar class to the div.

```html
<body>
  <div class="mdl-snackbar">
  </div>
</body>
```

&nbsp;2a. Inside the snackbar element, provide a `<div>` for the text and a `<button>` for the action.

```html
<body>
  <div class="mdl-snackbar">
    <div>
    </div>
    <button>
    </button>
  </div>
</body>
```

&nbsp;2b. Add the classes for the text and action.

```html
<body>
  <div class="mdl-snackbar">
    <div class="mdl-snackbar__text">
    </div>
    <button class="mdl-snackbar__action">
    </button>
  </div>
</body>
```
&nbsp;3. Provide the text content and action text.

```html
<body>
  <div class="mdl-snackbar">
    <div class="mdl-snackbar__text">
      Message sent.
    </div>
    <button class="mdl-snackbar__action">
      Undo
    </button>
  </div>
</body>
```

## Examples

A snackbar with a form to undo an message being sent.
```html
<div class="mdl-snackbar">
  <div class="mdl-snackbar__text">
    Message sent.
  </div>
  <form method="POST" action="undo-message-send" accept-charset="utf-8">
    <input type="hidden" name="message-id" value="1">
    <button class="mdl-snackbar__action">
      Undo
    </button>
  </form>
</div>
```

A snackbar without an action, called a Toast.
```html
<div class="mdl-snackbar">
  <div class="mdl-snackbar__text">
    Message sent.
  </div>
</div>
```

## More information
For working examples of the **snackbar** component, see the MDL [snackbar demo page](www.github.com/google/material-design-lite/src/snackbar/demo.html).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.
