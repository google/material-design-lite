#Shadow

##Introduction
The Material Design Lite (MDL) **shadow** is not a component in the same sense as an MDL card, menu, or textbox; it is a visual effect that can be assigned to a user interface element. The effect simulates a three-dimensional positioning of the element, as though it were slightly raised above the surface it rests upon. The shadow starts at the edges of the element and gradually fades outward, providing a realistic 3-D effect.

Shadows are a convenient and intuitive means of distinguishing an element from its surroundings. A shadow can draw the user's eye to an object and emphasize the object's importance, uniqueness, or immediacy. The shadow's unit of measurement is the *density-independent pixel*, or *dp*.

Shadows are a well-established feature in user interfaces, and provide users a visual clue to an object's intended use or value. Their design and use is an important factor in the overall user experience.

##Basic use
To use any MDL component, you must include the minified CSS and JavaScript files using standard relative-path references in the `<head>` section of the page, as described in the MDL Introduction.

###To include an MDL **shadow** effect:

&nbsp;1. Code an element, such as a `<div>`, that is to receive the shadow effect; size and style it as desired, and add any required content.
```html
<div>
Some content
</div>
```
&nbsp;2. Add an MDL shadow class to the element using the `class` attribute.
```html
<div class="mdl-shadow--4dp">
Some content
</div>
```

The shadowed component is ready for use.

####Examples

A div with a user-specified class and a 2-pixel shadow.

```html
<div class="my-shadow-card mdl-shadow--2dp">2dp Shadow</div>
```

A div with a user-specified class and a 4-pixel shadow.

```html
<div class="my-shadow-card mdl-shadow--4dp">4dp Shadow</div>
```

##Configuration options
The MDL CSS classes apply various predefined visual shadows to the element. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-shadow--2dp` | Assigns a 2dp shadow to the object | Optional; if omitted, no shadow is present |
| `mdl-shadow--3dp` | Assigns a 3dp shadow to the object | Optional; if omitted, no shadow is present |
| `mdl-shadow--4dp` | Assigns a 4dp shadow to the object | Optional; if omitted, no shadow is present |
| `mdl-shadow--6dp` | Assigns a 6dp shadow to the object | Optional; if omitted, no shadow is present |
| `mdl-shadow--8dp` | Assigns a 8dp shadow to the object | Optional; if omitted, no shadow is present |
| `mdl-shadow--16p` | Assigns a 16dp shadow to the object | Optional; if omitted, no shadow is present |

##More information
For working examples of the **shadow** effect, see the MDL [shadow demo page](www.github.com/google/material-design-lite/src/shadow/demo.html). Also see the MDL [card demo page](www.github.com/google/material-design-lite/src/card/demo.html).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.
