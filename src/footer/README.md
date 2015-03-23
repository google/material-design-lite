#Footer

##Introduction
The Material Design Lite (MDL) **footer** component is a comprehensive container intended to present a substantial amount of related content in a visually attractive and logically intuitive area. Although it is called "footer", it may be placed at any appropriate location on a device screen, either before or after other content.

An MDL footer component takes two basic forms: *mega-footer* and *mini-footer*. As the names imply, mega-footers contain more (and more complex) content than mini-footers. A mega-footer presents multiple sections of content separated by horizontal rules, while a mini-footer presents a single section of content. Both footer forms have their own internal structures, including required and optional elements, and typically include both informational and clickable content, such as links.

Footers, as represented by this component, are a fairly new feature in user interfaces, and allow users to view discrete blocks of content in a coherent and consistently organized way. Their design and use is an important factor in the overall user experience. 

##Basic use
To use any MDL component, you must include the minified CSS and JavaScript files using standard relative-path references in the `<head>` section of the page. As always, this assumes that a copy of the MDL package folders resides in your project folder.

```html
<head>
<link rel="stylesheet" href="css/material.min.css">
<script src="js/material.min.js"></script>
...
</head>
```

###To include an MDL **mega-footer** component:

&nbsp;1a. Code a standard HTML5 `<footer>...</footer>` container. Inside the footer, include one `<div>...</div>` container for each content section, typically three: *top*, *middle*, and *bottom*.
```html
<footer>
  <div>
  ...
  </div>
  <div>
  ...
  </div>
  <div>
  ...
  </div>
</footer>
```
&nbsp;1b. Add the appropriate MDL-specific CSS classes to the footer and divs using the HTML `class` attribute.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
  ...
  </div>
  <div class="wsk-mega-footer--middle-section">
  ...
  </div>
  <div class="wsk-mega-footer--bottom-section">
  ...
  </div>
</footer>
```
&nbsp;2a. Inside the top section div, code two sibling "inner" divs for the *left* and *right* content sections.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div>
    ...
    </div>
    <div>
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
  ...
  </div>
  <div class="wsk-mega-footer--bottom-section">
  ...
  </div>
</footer>
```
&nbsp;2b. Add the appropriate MDL-specific CSS classes to the two "inner" left and right divs using the HTML `class` attribute.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div class="wsk-mega-footer--left-section">
    ...
    </div>
    <div class="wsk-mega-footer--right-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
  ...
  </div>
  <div class="wsk-mega-footer--bottom-section">
  ...
  </div>
</footer>
```
&nbsp;3a. Inside the middle section div, code one or more sibling "inner" divs for the *drop-down* content sections. That is, for two drop-down sections, you would code two divs.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div class="wsk-mega-footer--left-section">
    ...
    </div>
    <div class="wsk-mega-footer--right-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
    <div>
    ...
    </div>
    <div>
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--bottom-section">
  ...
  </div>
</footer>
```
&nbsp;3b. Add the appropriate MDL-specific CSS classes to the two "inner" drop-down divs using the HTML `class` attribute.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div class="wsk-mega-footer--left-section">
    ...
    </div>
    <div class="wsk-mega-footer--right-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
    <div class="wsk-mega-footer--drop-down-section">
    ...
    </div>
    <div class="wsk-mega-footer--drop-down-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--bottom-section">
  ...
  </div>
</footer>
```
&nbsp;4a. Inside the bottom section div, code an "inner" div for the section heading and a sibling unordered list for the bottom section links.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div class="wsk-mega-footer--left-section">
    ...
    </div>
    <div class="wsk-mega-footer--right-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
    <div class="wsk-mega-footer--drop-down-section">
    ...
    </div>
    <div class="wsk-mega-footer--drop-down-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--bottom-section">
    <div>
      ...
    </div>
    <ul>
      ...
    </ul>
  </div>
</footer>
```
&nbsp;4b. Add the appropriate MDL-specific CSS classes to the "inner" div heading and list using the HTML `class` attribute.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div class="wsk-mega-footer--left-section">
    ...
    </div>
    <div class="wsk-mega-footer--right-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
    <div class="wsk-mega-footer--drop-down-section">
    ...
    </div>
    <div class="wsk-mega-footer--drop-down-section">
    ...
    </div>
  </div>
  <div class="wsk-mega-footer--bottom-section">
    <div class="wsk-logo">
    </div>
    <ul class="wsk-mega-footer--link-list">
      ...
    </ul>
  </div>
</footer>
```
&nbsp;5. Add content to the top (left and right), middle (drop-downs), and bottom (text and links) sections of the footer; include any appropriate MDL-specific CSS classes using the HTML `class` attribute.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div class="wsk-mega-footer--left-section">
      <button class="wsk-mega-footer--social-btn"></button>
      <button class="wsk-mega-footer--social-btn"></button>
      <button class="wsk-mega-footer--social-btn"></button>
    </div>
    <div class="wsk-mega-footer--right-section">
      <a href="">Link 1</a>
      <a href="">Link 2</a>
      <a href="">Link 3</a>
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
    <div class="wsk-mega-footer--drop-down-section">
      <h1 class="wsk-mega-footer--heading">Drop-down 1 Heading</h1>
      <ul class="wsk-mega-footer--link-list">
        <li><a href="">Link A</a></li>
        <li><a href="">Link B</a></li>
        <li><a href="">Link C</a></li>
        <li><a href="">Link D</a></li>
      </ul>
    </div>
    <div class="wsk-mega-footer--drop-down-section">
      <h1 class="wsk-mega-footer--heading">Drop-down 2 Heading</h1>
      <ul class="wsk-mega-footer--link-list">
        <li><a href="">Link A</a></li>
        <li><a href="">Link B</a></li>
        <li><a href="">Link C</a></li>
      </ul>
    </div>
  </div>
  <div class="wsk-mega-footer--bottom-section">
    <div class="wsk-logo">
    Mega-Footer Bottom Section Heading
    </div>
    <ul class="wsk-mega-footer--link-list">
      <li><a href="">Link A</a></li>
      <li><a href="">Link B</a></li>
    </ul>
  </div>
</footer>
```

The mega-footer component is ready for use.

####Examples

A mega-footer component with three sections and two drop-down sections in the middle section.
```html
<footer class="wsk-mega-footer">
  <div class="wsk-mega-footer--top-section">
    <div class="wsk-mega-footer--left-section">
      <button class="wsk-mega-footer--social-btn"></button>
      <button class="wsk-mega-footer--social-btn"></button>
      <button class="wsk-mega-footer--social-btn"></button>
    </div>
    <div class="wsk-mega-footer--right-section">
      <a href="#">Introduction</a>
      <a href="#">App Status Dashboard</a>
      <a href="#">Terms of Service</a>
    </div>
  </div>
  <div class="wsk-mega-footer--middle-section">
    <div class="wsk-mega-footer--drop-down-section">
      <h1 class="wsk-mega-footer--heading">Learning and Support</h1>
      <ul class="wsk-mega-footer--link-list">
        <li><a href="#">Resource Center</a></li>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Learn with Google</a></li>
        <li><a href="#">Small Business Community</a></li>
        <li><a href="#">Think Insights</a></li>
      </ul>
    </div>
    <div class="wsk-mega-footer--drop-down-section">
      <h1 class="wsk-mega-footer--heading">Just for Developers</h1>
      <ul class="wsk-mega-footer--link-list">
        <li><a href="#">Google Developers</a></li>
        <li><a href="#">AdWords API</a></li>
        <li><a href="#">AdWords Scipts</a></li>
        <li><a href="#">AdWords Remarketing Tag</a></li>
      </ul>
    </div>
  </div>
  <div class="wsk-mega-footer--bottom-section">
    <div class="wsk-logo">
      More Information
    </div>
    <ul class="wsk-mega-footer--link-list">
      <li><a href="#">Help</a></li>
      <li><a href="#">Privacy and Terms</a></li>
    </ul>
  </div>
</footer>
```

###To include an MDL **mini-footer** component:

&nbsp;1a. Code a standard HTML5 `<footer>...</footer>` container. Inside the footer, code two `<div>...</div>` containers, one for the *left* section and one for the *right* section.
```html
<footer>
  <div>
  ...
  </div>
  <div>
  ...
  </div>
</footer>
```
&nbsp;1b. Add the appropriate MDL-specific CSS classes to the footer and divs using the HTML `class` attribute.
```html
<footer class="wsk-mini-footer">
  <div class="wsk-mini-footer--left-section">
  ...
  </div>
  <div class="wsk-mini-footer--right-section">
  ...
  </div>
</footer>
```
&nbsp;2a. Inside the left section div, code an "inner" div for the section heading and a sibling unordered list for the left section links.
```html
<footer class="wsk-mini-footer">
  <div class="wsk-mini-footer--left-section">
    <div>
      ...
    </div>
    <ul>
      ...
    </ul>
  </div>
  <div class="wsk-mini-footer--right-section">
  ...
  </div>
</footer>
```
&nbsp;2b. Add the appropriate MDL-specific CSS classes to the "inner" div and list using the HTML `class` attribute.
```html
<footer class="wsk-mini-footer">
  <div class="wsk-mini-footer--left-section">
    <div class="wsk-logo">
      ...
    </div>
    <ul class="wsk-mini-footer--link-list">
      ...
    </ul>
  </div>
  <div class="wsk-mini-footer--right-section">
  ...
  </div>
</footer>
```
&nbsp;3. Add content to the left (text and links) and right (text or decoration) sections of the footer; include any appropriate MDL-specific CSS classes using the HTML `class` attribute.
```html
<footer class="wsk-mini-footer">
  <div class="wsk-mini-footer--left-section">
    <div class="wsk-logo">
      Mini-footer Heading
    </div>
    <ul class="wsk-mini-footer--link-list">
      <li><a href="">Link 1</a></li>
      <li><a href="">Link 2</a></li>
      <li><a href="">Link 3</a></li>
    </ul>
  </div>
  <div class="wsk-mini-footer--right-section">
    <button class="wsk-mini-footer--social-btn"></button>
    <button class="wsk-mini-footer--social-btn"></button>
    <button class="wsk-mini-footer--social-btn"></button>
  </div>
</footer>
```

The mini-footer component is ready for use.

####Examples

A mini-footer with left and right sections.

```html
<footer class="wsk-mini-footer">
  <div class="wsk-mini-footer--left-section">
    <div class="wsk-logo">
      More Information
    </div>
    <ul class="wsk-mini-footer--link-list">
      <li><a href="#">Help</a></li>
      <li><a href="#">Privacy and Terms</a></li>
      <li><a href="#">User Agreement</a></li>
    </ul>
  </div>
  <div class="wsk-mini-footer--right-section">
    <button class="wsk-mini-footer--social-btn"></button>
    <button class="wsk-mini-footer--social-btn"></button>
    <button class="wsk-mini-footer--social-btn"></button>
  </div>
</footer>
```

##Configuration options
The MDL CSS classes apply various predefined visual enhancements to the footer. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `wsk-mega-footer` | Defines container as an MDL mega-footer component | Required on footer element |
| `wsk-mega-footer--top-section` | Defines container as a footer top section | Required on top section "outer" div element |
| `wsk-mega-footer--left-section` | Defines container as a left section | Required on left section "inner" div element |
| `wsk-mega-footer--social-btn` | Defines a decorative square within mega-footer | Required on button element (if used) |
| `wsk-mega-footer--right-section` | Defines container as a right section | Required on right section "inner" div element |
| `wsk-mega-footer--middle-section` | Defines container as a footer middle section | Required on middle section "outer" div element |
| `wsk-mega-footer--drop-down-section` | Defines container as a drop-down (vertical) content area | Required on drop-down "inner" div elements |
| `wsk-mega-footer--heading` | Defines a heading as a mega-footer heading | Required on h1 element inside drop-down section |
| `wsk-mega-footer--link-list` | Defines an unordered list as a drop-down (vertical) list | Required on ul element inside drop-down section |
| `wsk-mega-footer--bottom-section` | Defines container as a footer bottom section | Required on bottom section "outer" div element |
| `wsk-logo` | Defines a container as a styled section heading | Required on "inner" div element in mega-footer bottom-section or mini-footer left-section |
| `wsk-mini-footer` | Defines container as an MDL mini-footer component | Required on footer element |
| `wsk-mini-footer--left-section` | Defines container as a left section | Required on left section "inner" div element |
| `wsk-mini-footer--link-list` | Defines an unordered list as an inline (horizontal) list | Required on ul element sibling to "wsk-logo" div element |
| `wsk-mini-footer--right-section` | Defines container as a right section | Required on right section "inner" div element |
| `wsk-mini-footer--social-btn` | Defines a decorative square within mini-footer | Required on button element (if used) |

##More information
For working examples of the **footer** component, see the MDL [footer demo page](www.github.com/google/material-design-lite/src/lists/footer.html).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.

