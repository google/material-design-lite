##Introduction
The Material Design Lite (MDL) **list** component is an enhanced version of the standard HTML `<ul>` (unordered list) element. A list consists of a series of related items presented either vertically or horizontally.

An MDL-enhanced list takes two basic forms: *inline* and *styled-view*. An inline list presents the list items horizontally, which saves screen space and facilitates viewing and selecting; a style-view list presents the list items vertically, with accompanying images that help identify or clarify the items, and horizontal rules that separate the items.

Lists are a common feature in user interfaces, and allow users to view (and sometimes choose) an item from the series. Their design and use is an important factor in the overall user experience. See the list component's [Material Design specifications page](http://www.google.com/design/spec/components/lists.html) for details.

##Basic use
To use any MDL component, you must include the minified CSS and JavaScript files using standard relative-path references in the `<head>` section of the page, as described in the MDL Introduction.

###To include an MDL **inline list** component:

&nbsp;1. Code a `<ul>` element. Inside the unordered list, include one `<li>` element for each list item to be presented horizontally. That is, for four list items, you would code four `<li>`s.
```html
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```
&nbsp;2. Inside the list item elements, place whatever content you want, in the order you want it to appear. Typically, this will be short text strings, but might include small images, links, or other valid HTML content. Remember that the items will be presented inline (horizontally), without bullets or other intervening marks.
```html
<ul>
  <li>Item1</li>
  <li>Item2</li>
  <li>Item3</li>
  <li>Item4</li>
</ul>
```
&nbsp;3. Add the MDL class to the list using the `class` attribute.
```html
<ul class="mdl-list--inline">
  <li>Item1</li>
  <li>Item2</li>
  <li>Item3</li>
  <li>Item4</li>
</ul>
```

The inline list component is ready for use.

####Examples

A simple inline list.

```html
<ul class="mdl-list--inline">
  <li>Aardvarks</li>
  <li>Butterflies</li>
  <li>Canaries</li>
  <li>Deer</li>
</ul>
```

An inline list with links.

```html
    <p>Australian animals that might kill you include:</p>
    <ul class="mdl-list--inline">
      <li><a href="http://www.australiananimals.com/jellies">Box jellyfish</a></li>
      <li><a href="http://www.australiananimals.com/spiders">Spiders</a></li>
      <li><a href="http://www.australiananimals.com/snakes">Snakes</a></li>
      <li><a href="http://www.australiananimals.com/salties">Saltwater crocodiles</a></li>
    </ul>
```

###To include an MDL **styled-view list** component:

&nbsp;1. Code a `<div>` element; this will hold the styled list. Inside the div, code a `<ul>` element; inside this unordered list, include one `<li>` element for each styled list item to be presented. That is, for four list items, you would code four `<li>`s.
```html
<div>
  <ul>
    <li>
    ...
    </li>
    <li>
    ...
    </li>
    <li>
    ...
    </li>
    <li>
    ...
    </li>
  </ul>
</div>
```
&nbsp;2. Inside each list item, code two `<span>` elements. The first span should have no content (although it can &mdash; see **Examples** below), and the second should contain whatever content you want to display. Typically, this will be short text strings.
```html
<div>
  <ul>
    <li>
      <span></span>
      <span>Item1</span>
    </li>
    <li>
      <span></span>
      <span>Item2</span>
    </li>
    <li>
      <span></span>
      <span>Item3</span>
    </li>
    <li>
      <span></span>
      <span>Item4</span>
    </li>
  </ul>
</div>
```
&nbsp;3. Add MDL classes to the div and the spans using the `class` attribute.
```html
<div class="mdl-list--styled-view">
  <ul>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Item1</span>
    </li>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Item2</span>
    </li>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Item3</span>
    </li>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Item4</span>
    </li>
  </ul>
</div>
```

The styled-view list component is ready for use.

####Examples

A styled-view list of people's names, with default "avatar" images.

```html
<div class="mdl-list--styled-view">
  <ul>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Allen Anderson</span>
    </li>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Barbara Barnes</span>
    </li>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Charlie Connors</span>
    </li>
    <li>
      <span class="mdl-list-view--avatar"></span>
      <span class="mdl-list-view--name">Darlene Davis</span>
    </li>
  </ul>
</div>
```

A styled-view list with custom images.

```html
<div class="mdl-list--styled-view">
  <p>Australian animals that can kill you include:</p>  
  <ul>
    <li>
      <span><img src="jellies.png" style="height:50px; width:50px; margin:10px 15px;" /></span>
      <span class="mdl-list-view--name">Box jellyfish</span>
    </li>
    <li>
      <span><img src="spiders.png" style="height:50px; width:50px; margin:10px 15px;" /></span>
      <span class="mdl-list-view--name">Spiders</span>
    </li>
    <li>
      <span><img src="snakes.png" style="height:50px; width:50px; margin:10px 15px;" /></span>
      <span class="mdl-list-view--name">Snakes</span>
    </li>
    <li>
      <span><img src="salties.png" style="height:50px; width:50px; margin:10px 15px;" /></span>
      <span class="mdl-list-view--name">Saltwater crocodiles</span>
    </li>
  </ul>
</div>
```

##Configuration options
The MDL CSS classes apply various predefined visual enhancements to the list. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-list--inline` | Defines list as an MDL inline list | Required on ul element |
| `mdl-list--styled-view` | Defines div as an MDL styled-view list container | Required on div element|
| `mdl-list-view--avatar` | Defines span as an MDL *avatar* image | Required on the first of two span elements for default styled-view list; omit if using custom images |
| `mdl-list-view--name` | Defines span as an MDL styled-list text item | Required on the second of two span elements |

##More information
For working examples of the **list** component, see the MDL [list demo page](www.github.com/google/material-design-lite/src/lists/demo.html).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.
