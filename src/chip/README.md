## Introduction

The Material Design Lite (MDL) **chip** component is a small, interactive element.
Chips are commonly used for contacts, text, rules, icons, and photos.

## TO INCLUDE AN MDL CHIP COMPONENT:

&nbsp;1. Create a container element for the chip; typically `<span>` and `<div>` are used, but any container element should work equally well. If you need interactivity, use a `<button>`, or add the `tabindex` attribute to your container.
```html
<span>
</span>
```

&nbsp;2. Add in the text wrapper and the MDL classes.
```html
<span class="mdl-chip">
    <span class="mdl-chip__text">Chip Text</span>
</span>
```

&nbsp;3. For deletable chips, add in the delete icon. This can be an `<a>`, `<button>` or non-interactive tags like `<span>`.
```html
<span class="mdl-chip">
    <span class="mdl-chip__text">Chip Text</span>
    <a href="#" class="mdl-chip__action"><i class="material-icons">cancel</i></a>
</span>
```

&nbsp;4. Contact chips need to have the `mdl-chip--contact` class added to the container, along with another container for the contact icon. The icon container for photos is typically an `<img>` tag, but other types of content can be used with a little extra supporting css.
```html
<span class="mdl-chip">
    <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">A</span>
    <span class="mdl-chip__text">Chip Text</span>
    <a href="#" class="mdl-chip__action"><i class="material-icons">cancel</i></a>
</span>
```

## Examples

A button based contact chip whose contact image is a `<span>` with a `background-image`.

```html
<style>
    .demo-chip .mdl-chip__contact {
        background-image: url("./path/to/image");
        background-size: cover;
    }
</style>

<button class="mdl-chip demo-chip">
    <span class="mdl-chip__contact">&nbsp;</span>
    <span class="mdl-chip__text">Chip Text</span>
    <a href="#" class="mdl-chip__action"><i class="material-icons">cancel</i></a>
</button>
```

## CSS Classes

| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-chip` | Defines element as an MDL chip container | Required on "outer" container |
| `mdl-chip--contact` | Defines an MDL chip as a contact style chip | Optional, goes on "outer" container |
| `mdl-chip__text` | Defines element as the chip's text | Required on "inner" text container |
| `mdl-chip__action` | Defines element as the chip's action | Required on "inner" action container, if present |
| `mdl-chip__contact` | Defines element as the chip's contact container | Required on "inner" contact container, if the `mdl-chip--contact` class is present on "outer" container |