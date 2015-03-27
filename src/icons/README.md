#Icon

##Introduction
The Material Design Lite (MDL) **icon** component is an effort to standardize the use of graphical indicators in applications and page displays. MDL icons are intended to replace the myriad images used by developers (which vary significantly in appearance) and provide a robust, uniform library from which developers can choose appropriate indicators. 

MDL icons are individual glyphs (characters) from a specific MDL web font, accessed via the CSS3 `@font-face` rule. As such, they may be styled and manipulated as freely as any other characters: size, foreground and background color, weight, and other characteristics can be specified, inherited, or modified via script to achieve the desired appearance. An icon performs no action itself, either by its display nor when the user clicks or touches it, unless scripted to do so. The MDL icon font provides over seven hundred glyphs, all immediately available once the web font is referenced.

To view the complete list of icons, see [this page](http://google.github.io/web-starter-kit/latest/styleguide/icons/demo.html). The icons are organized by general usage (action, communication, navigation, etc.); hover the mouse pointer over an icon to see the class name required to reference it (explained below).

Icons are an established but non-standardized feature of most user interfaces, and provide users with non-textual cues about application options, content, or activity, regardless of hardware device, operating system, or browser environment. Their design and use is an important factor in the overall user experience. See the icon component's [Material Design specifications page](http://www.google.com/design/spec/style/icons.html) for details. 

##Basic use
To use any MDL component, you must include the minified CSS and JavaScript files using standard relative-path references in the `<head>` section of the page, as described in the MDL Introduction.

###To include an MDL **icon** component:

&nbsp;1. Code a `<span>` element; the span should have no content of its own.
```html
<span></span>
```
&nbsp;2. Add the MDL classes, separated by spaces, to the span using the `class` attribute.
```html
<span class="wsk-icon wsk-icon--alarm"></span>
```

The icon component is ready for use.

####Examples

A warning icon.

```html
<span class="wsk-icon wsk-icon--warning"></span>
```

A fast-forward icon.

```html
<span class="wsk-icon wsk-icon--fast-forward"></span>
```

A cut icon.

```html
<span class="wsk-icon wsk-icon--content-cut"></span>
```

##Configuration options
The MDL CSS classes define and specify the icon to use. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `wsk-icon` | Defines the container as an MDL icon component | Required on span element |
| `wsk-icon--ICON_CLASS_NAME` | Assigns a specific icon to the container | Required on span element (see icon demo page for complete list) |

##More information
For working examples of the **icon** component, see the MDL [icon demo page](http://google.github.io/web-starter-kit/latest/styleguide/icons/demo.html).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.

