#Menu

##Introduction
The Material Design Lite (MDL) **menu** component is a user interface element that allows users to select one of a number of options. The selection typically results in an action initiation, a setting change, or other observable effect. Menu options are always presented in sets of two or more, and options may be programmatically enabled or disabled as required. The menu appears when the user is asked to choose among a series of options, and is usually dismissed after the choice is made.

Menus are an established but non-standardized feature in user interfaces, and allow users to make choices that direct the activity, progress, or characteristics of software. Their design and use is an important factor in the overall user experience. See the menu component's [Material Design specifications page](http://www.google.com/design/spec/components/menus.html) for details. 

##Basic use
To use any MDL component, you must include the minified CSS and JavaScript files using standard relative-path references in the `<head>` section of the page, as described in the MDL Introduction.

###To include an MDL **menu** component:

&nbsp;1. Code a `<ul>` unordered list element; this is the container that holds the options.
```html
<ul>
</ul>
```
&nbsp;2. Inside the unordered list, code one `<button>` element for each option. Include any desired attributes and values, such as an id or event handler, and add a text caption as appropriate.
```html
<ul>
  <button>Continue</button>
  <button>Stop</button>
  <button>Pause</button>
</ul>
```
&nbsp;3. Add one or more MDL classes, separated by spaces, to the unordered list and the buttons using the `class` attribute.
```html
<ul class="wsk-dropdown-menu">
  <button class="wsk-item">Continue</button>
  <button class="wsk-item">Stop</button>
  <button class="wsk-item">Pause</button>
</ul>
```

The menu component is ready for use.

####Example
A menu with three options, with ripple effect on option links.

```html
<ul class="wsk-menu">
  <button class="wsk-menu__item wsk-js-ripple-effect">Fast</button>
  <button class="wsk-menu__item wsk-js-ripple-effect">Medium</button>
  <button class="wsk-menu__item wsk-js-ripple-effect">Slow</button>
</ul>
```

##Configuration options
The MDL CSS classes apply various predefined visual and behavioral enhancements to the menu. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `wsk-menu` | Defines an unordered list container as an MDL component | Required on ul element |
| `wsk-menu__item` | Defines buttons as MDL menu options and assigns basic MDL behavior | Required on button elements |
| `wsk-js-ripple-effect` | Applies *ripple* click effect to option links | Optional; goes on button elements |

>**Note:** Disabled versions of the menu buttons are provided, and are invoked with the standard HTML boolean attribute `disabled`. `<button class="wsk-menu__item" disabled>Medium</button>`
>This attribute may be added or removed programmatically via scripting.

##More information
For working examples of the **menu** component, see the MDL [menu demo page](www.github.com/google/material-design-lite/src/menu/demo.html).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.

