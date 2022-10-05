---
title: Dialog
description: Variations on Material Design dialogs.
link: https://m3.material.io/components/dialogs
codepen: poVZxGR
---

Dialogs can require an action, communicate information, or help users accomplish a task. There are two types of dialogs: basic and full-screen.

## Preview

<div class="preview">
  <dialog class="dialog" open>
    <div class="icon">
      <i class="material-icons">add</i>
    </div>
    <div class="title">Dialog with hero icon</div>
    <div class="content">
      A dialog is a type of modal window that appears in front of app content to
      provide critical information, or prompt for a decision to be made.
    </div>
    <div class="actions">
      <button class="text">Action 1</button>
      <button class="text">Action 2</button>
    </div>
  </dialog>
</div>

## Installation

To import just the component styles, copy the following into your project's **styles.css** file:

```css
/* Core Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/core.css');
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
/* Roboto Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap');
/* Component Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/components/dialog/style.css');
```

## Usage

Start with a **dialog** or **div** element and add the **dialog** class name:

```html
<dialog class="dialog"></dialog>
```

The **dialog** class name is implicit when using the **dialog** element.

### Hero Icon (Optional)

<div class="preview">
  <dialog class="dialog" open>
    <div class="icon">
      <i class="material-icons">add</i>
    </div>
  </dialog>
</div>

To add a hero icon to a dialog add a **i** element with the **material-icons** class name:

```html
<dialog class="dialog">
  <div class="icon">
    <i class="material-icons">add</i>
  </div>
</dialog>
```

### Title (Optional)

<div class="preview">
  <dialog class="dialog" open>
    <div class="title">Dialog with title</div>
  </dialog>
</div>

To add a title to a dialog add a **div** element with the **title** class name:

```html
<dialog class="dialog">
  <div class="title">Dialog with title</div>
</dialog>
```

### Content (Optional)

<div class="preview">
  <dialog class="dialog" open>
    <div class="content">
      A dialog is a type of modal window that appears in front of app content to
      provide critical information, or prompt for a decision to be made.
    </div>
  </dialog>
</div>

To add content to a dialog add a **div** element with the **content** class name:

```html
<dialog class="dialog">
  <div class="content">
    A dialog is a type of modal window that appears in front of app content to
    provide critical information, or prompt for a decision to be made.
  </div>
</dialog>
```

### Actions (Optional)

<div class="preview">
  <dialog class="dialog" open>
    <div class="actions">
      <button class="text">Action 1</button>
      <button class="text">Action 2</button>
    </div>
  </dialog>
</div>

To add actions to a dialog add a **div** element with the **actions** class name:

```html
<dialog class="dialog">
  <div class="actions">
    <button class="text">Action 1</button>
    <button class="text">Action 2</button>
  </div>
</dialog>
```

## Display Modes

### Static

To have a dialog always be visible, add the **open** attribute to the **dialog** element:

```html
<dialog class="dialog" open></dialog>
```

### Modal

To have a dialog be modal, add the **modal** class name to the **dialog** element:

```html
<dialog class="dialog modal"></dialog>
```

Then from your JavaScript, call the **showModal()** method on the **dialog** element:

```js
const dialog = document.querySelector('dialog');
dialog.showModal();
```

## Variants

### Default

Default dialog styling.

<div class="preview">
  <dialog class="dialog" open>
    <div class="icon">
      <i class="material-icons">add</i>
    </div>
    <div class="title">Dialog with hero icon</div>
    <div class="content">
      A dialog is a type of modal window that appears in front of app content to
      provide critical information, or prompt for a decision to be made.
    </div>
    <div class="actions">
      <button class="text">Action 1</button>
      <button class="text">Action 2</button>
    </div>
  </dialog>
</div>

```html
<dialog class="dialog" open>
  <div class="icon">
    <i class="material-icons">add</i>
  </div>
  <div class="title">Dialog with hero icon</div>
  <div class="content">
    A dialog is a type of modal window that appears in front of app content to
    provide critical information, or prompt for a decision to be made.
  </div>
  <div class="actions">
    <button class="text">Action 1</button>
    <button class="text">Action 2</button>
  </div>
</dialog>
```

## Design Tokens

| Token                                 | Description                      | Default                                                                                   |
|---------------------------------------|----------------------------------|-------------------------------------------------------------------------------------------|
| `--md-sys-comp-dialog-background-color` | The background color of the dialog | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div> |
| `--md-sys-comp-dialog-color`            | The foreground color of the dialog | <div class="tooltip token-box color-on-surface-variant" data-tooltip="--md-sys-color-on-surface-variant"></div> |
| `--md-comp-dialog-container-min-width`   | The min width of the container      | `280px`                                                                                    |
| `--md-comp-dialog-container-max-width`   | The max width of the container      | `560px`                                                                                    |

## Resources

- [ARIA Resources](https://static.corp.google.com/ariablueprints/dialog/dialog-modal-1.0.html)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
