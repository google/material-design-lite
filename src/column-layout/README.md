#Column-layout

##Introduction
The Material Design Lite (MDL) **column-layout** component is a simplified method for displaying brief content blocks in a columnar list format that easily adapts to different hardware devices and display environments. It reduces the usual coding burden required to correctly display and manipulate columns of content in a variety of display conditions. 

The MDL column-layout is best suited for short lines of content, such as those that might be found in a long list, and that can benefit from being broken up into a columnar display. The content can automatically expand to a comfortable width into two or three columns (in which case the items will read sequentially left-to-right), or can automatically collapse to a minimum of one column (in which case the items will read sequentially top-to-bottom), automatically reformatting themselves to conform to device, orientation, and environment changes as they occur.

Column-layouts are an established but non-standardized feature in most user interfaces, and provide users with a way to conveniently access content that might otherwise take up too much screen space. Their design and use is an important factor in the overall user experience. See the column-layout component's [Material Design specifications page](http://www.google.com/design/spec/components/column-layouts.html) for details. 

##Basic use
To use any MDL component, you must include the minified CSS and JavaScript files using standard relative-path references in the `<head>` section of the page, as described in the MDL Introduction.

###To include an MDL **column-layout** component:

&nbsp;1. Code a `<div>` element; this is the "outer" container, intended to hold all of the columns' text items.
```html
<div>
</div>
```
&nbsp;2. For each brief text item, code one "inner" div, including the text to be displayed.
```html
<div>
  <div>Apples</div>
  <div>Bananas</div>
  <div>Cherries</div>
  <div>Dill seeds</div>
  <div>Eggplant</div>
  <div>Figs</div>
  <div>Ginger root</div>
  <div>Horseradish</div>
  <div>Iceberg lettuce</div>
  <div>etc.</div>
</div>
```
&nbsp;3. Add one or more MDL classes, separated by spaces, to the "outer" and "inner" divs using the `class` attribute.
```html
<div class="mdl-column-layout">
  <div class="mdl-column-layout__child">Apples</div>
  <div class="mdl-column-layout__child">Bananas</div>
  <div class="mdl-column-layout__child">Cherries</div>
  <div class="mdl-column-layout__child">Dill seeds</div>
  <div class="mdl-column-layout__child">Eggplant</div>
  <div class="mdl-column-layout__child">Figs</div>
  <div class="mdl-column-layout__child">Ginger root</div>
  <div class="mdl-column-layout__child">Horseradish</div>
  <div class="mdl-column-layout__child">Iceberg lettuce</div>
  <div class="mdl-column-layout__child">etc.</div>
</div>
```

The column-layout component is ready for use.

####Example

A list of NATO phonetic alphabet words in a column-layout div.

```html
<div class="mdl-column-layout">
  <div class="mdl-column-layout__child">Alpha</div>
  <div class="mdl-column-layout__child">Bravo</div>
  <div class="mdl-column-layout__child">Charlie</div>
  <div class="mdl-column-layout__child">Delta</div>
  <div class="mdl-column-layout__child">Echo</div>
  <div class="mdl-column-layout__child">Foxtrot</div>
  <div class="mdl-column-layout__child">Golf</div>
  <div class="mdl-column-layout__child">Hotel</div>
  <div class="mdl-column-layout__child">India</div>
  <div class="mdl-column-layout__child">Juliet</div>
  <div class="mdl-column-layout__child">Kilo</div>
  <div class="mdl-column-layout__child">Lima</div>
  <div class="mdl-column-layout__child">Mike</div>
  <div class="mdl-column-layout__child">November</div>
  <div class="mdl-column-layout__child">Oscar</div>
  <div class="mdl-column-layout__child">Papa</div>
  <div class="mdl-column-layout__child">Quebec</div>
  <div class="mdl-column-layout__child">Romeo</div>
  <div class="mdl-column-layout__child">Sierra</div>
  <div class="mdl-column-layout__child">Tango</div>
  <div class="mdl-column-layout__child">Uniform</div>
  <div class="mdl-column-layout__child">Victor</div>
  <div class="mdl-column-layout__child">Whiskey</div>
  <div class="mdl-column-layout__child">X-ray</div>
  <div class="mdl-column-layout__child">Yankee</div>
  <div class="mdl-column-layout__child">Zulu</div>
</div>
```

##Configuration options
The MDL CSS classes apply various predefined visual enhancements and behavioral effects to the column-layout. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-column-layout` | Defines a container as an MDL column-layout component | Required on "outer" div element|
| `mdl-column-layout__child` | Defines a container as a column-layout item | Required on "inner" div elements|

##More information
For working examples of the **column-layout** component, see the MDL [column-layout demo page](www.github.com/google/material-design-lite/src/column-layout/demo.html). For related information, also see the [layout component documentation](https://github.com/google/material-design-lite/blob/master/src/layout/README.md).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.

