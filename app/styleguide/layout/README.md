# Layout module

The layout module allows you to build layouts easily, simply by adding a few CSS classes. Everybody loves CSS classes.

## Basic Example

```html
<div class="Layout">
  <div class="Layout-header">
    <!-- Title -->
    <span class="Layout-title">Web Starter Kit</span>
    <!-- Add spacer, to align navigation to the right -->
    <div class="Layout-spacer"></div>
    <!-- Navigation -->
    <nav class="Layout-navigation">
      <ul>
        <li><a href="">Hello</a></li>
        (...)
      </ul>
    </nav>
  </div>
  <div class="Layout-drawer">
    <span class="Layout-title">Web Starter Kit</span>
    <nav class="Layout-navigation">
      <ul>
        <li><a href="">Hello</a></li>
        (...)
      </ul>
    </nav>
  </div>
  <div class="Layout-content">
    <div class="demo-content"></div>
  </div>
</div>
```

## Layout

The container element.

### Options

- `Layout--fixedHeader`:
  By default, headers are only shown in larger screens. Using this option makes them visible in smaller screens as well.

- `Layout--fixedDrawer`:
  By default, drawers are only shown in smaller screens. Using this option makes them always visible and open in larger screens, effectively functioning as side navigation. They still open and close normally in smaller screens, to save screen real estate.

- `Layout--overlayDrawerButton`:
  By default, the drawer button pushes down the content, to avoid overlapping issues. You can use this option if you'd like to overlay the drawer button directly on top of the content.

### State

- `is-small-screen`:
  Utility class that gets added to the layout when in a small screen size.


## Layout-header

The header element (optional). By default, it's only shown in large screens.

### Options

- `Layout-header--transparent`:
  Makes the background transparent, instead of the default main palette color.

- `Layout-header--mediumTall`:
  Makes the header twice the height of a default header.

- `Layout-header--tall`:
  Makes the header three times the height of a default header.

- `Layout-header--multiRow`:
  Allows stacking of multiple rows inside the header (by default, it only has one). Example:
  ```html
  <div class="Layout-header Layout-header--multiRow Layout-header--tall">
  <!-- Top row -->
  <div class="Layout-header-row">
    <span>Upper row</span>
  </div>
  <div class="Layout-header-row">
    <span>Middle row</span>
  </div>
    <div class="Layout-header-row">
    <span>Bottom row</span>
  </div>
</div>
  ```

- `Layout-header--seamed`:
  By default, the header casts a shadow onto the content. This option removes the shadow altogether.

- `Layout-header--waterfall`:
  By default, the header casts a shadow onto the content. This option removes the shadow when the page is at the top of the content, and only shows the shadow if the user has scrolled down.

- `Layout-header--scroll`:
  By default, the header stays fixed at the top. This option makes it scroll with the content, so it's only visible at the top of the page.

### State

- `is-compact`:
  Utility class that gets added to the header when in waterfall mode the user has scrolled down, and thus the header has collapsed to a single row.


### Sub-elements

-  `Layout-header-row`:
  Used when stacking multiple rows inside the header (by default, it only has one). Example:

  ```html
  <div class="Layout-header Layout-header--multiRow Layout-header--tall">
    <div class="Layout-header-row">
      <span>Upper row</span>
    </div>
    <div class="Layout-header-row">
      <span>Middle row</span>
    </div>
    <div class="Layout-header-row">
      <span>Bottom row</span>
    </div>
  </div>
  ```

## Layout-drawer

The drawer element (optional). By default, it's only shown in small screens, as a collapsible panel.

### Options

None.

### State

- `is-visible`:
  This class is added to the drawer when it is currently visible.


## Layout-content

Your content goes here :)


## Other Elements

-  `Layout-spacer`:
  Used to align elements inside a header or drawer. `Layout-spacer` is a class set to flex grow, so you can use it to align elements to the right in a header, for example:
  ```html
  <div class="Layout-header">
    <span>Left-aligned text</span>
    <div class="Layout-spacer"></div>
    <span>Right-aligned text</span>
  </div>
  ```
  or to the center:
  ```html
  <div class="Layout-header">
    <div class="Layout-spacer"></div>
    <span>Center-aligned text</span>
    <div class="Layout-spacer"></div>
  </div>
  ```
  You can also use it to align to bottom in a drawer:
  ```html
  <div class="Layout-drawer">
    <span>Top-aligned text</span>
    <div class="Layout-spacer"></div>
    <span>Bottom-aligned text</span>
  </div>
  ```

-  `Layout-title`:
  Styles the text inside to look like a title (slightly different styling depending on container).
  ```html
  <div class="Layout-header">
    <div class="Layout-title">My Awesome Site</div>
  </div>
  ```
  ```html
  <div class="Layout-drawer">
    <div class="Layout-title">My Awesome Site</div>
  </div>
  ```
