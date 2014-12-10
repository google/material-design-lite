# Layout module

The layout module allows you to build layouts easily, simply by adding a few CSS classes. Everybody loves CSS classes.

## Basic Example

```html
<div class="wsk-layout">
  <div class="wsk-layout__header">
    <!-- Title -->
    <span class="wsk-layout-title">Web Starter Kit</span>
    <!-- Add spacer, to align navigation to the right -->
    <div class="wsk-layout-spacer"></div>
    <!-- Navigation -->
    <nav class="wsk-layout-navigation">
      <a class="wsk-layout-navigation-link" href="">Hello</a>
      (...)
    </nav>
  </div>
  <div class="wsk-layout__drawer">
    <span class="wsk-layout-title">Web Starter Kit</span>
    <nav class="wsk-layout-navigation">
      <a class="wsk-layout-navigation-link" href="">Hello</a>
      (...)
    </nav>
  </div>
  <div class="wsk-layout__content">
    <div class="demo-content"></div>
  </div>
</div>
```

## Layout

The container element.

### Options

- `wsk-layout--fixed-header`:
  By default, headers are only shown in larger screens. Using this option makes them visible in smaller screens as well.

- `wsk-layout--fixed-drawer`:
  By default, drawers are only shown in smaller screens. Using this option makes them always visible and open in larger screens, effectively functioning as side navigation. They still open and close normally in smaller screens, to save screen real estate.

- `wsk-layout--overlay-drawer-button`:
  By default, the drawer button pushes down the content, to avoid overlapping issues. You can use this option if you'd like to overlay the drawer button directly on top of the content.

### State

- `is-small-screen`:
  Utility class that gets added to the layout when in a small screen size.


## wsk-layout__header

The header element (optional). By default, it's only shown in large screens.

### Options

- `wsk-layout__header--transparent`:
  Makes the background transparent, instead of the default main palette color.

- `wsk-layout__header--medium-tall`:
  Makes the header twice the height of a default header.

- `wsk-layout__header--tall`:
  Makes the header three times the height of a default header.

- `wsk-layout__header--multi-row`:
  Allows stacking of multiple rows inside the header (by default, it only has one). Example:
  ```html
  <div class="wsk-layout__header wsk-layout__header--multi-row wsk-layout__header--tall">
  <!-- Top row -->
  <div class="wsk-layout__header-row">
    <span>Upper row</span>
  </div>
  <div class="wsk-layout__header-row">
    <span>Middle row</span>
  </div>
    <div class="wsk-layout__header-row">
    <span>Bottom row</span>
  </div>
</div>
  ```

- `wsk-layout__header--seamed`:
  By default, the header casts a shadow onto the content. This option removes the shadow altogether.

- `wsk-layout__header--waterfall`:
  By default, the header casts a shadow onto the content. This option removes the shadow when the page is at the top of the content, and only shows the shadow if the user has scrolled down.

- `wsk-layout__header--scroll`:
  By default, the header stays fixed at the top. This option makes it scroll with the content, so it's only visible at the top of the page.

### State

- `is-compact`:
  Utility class that gets added to the header when in waterfall mode the user has scrolled down, and thus the header has collapsed to a single row.


### Sub-elements

-  `wsk-layout__header-row`:
  Used when stacking multiple rows inside the header (by default, it only has one). Example:

  ```html
  <div class="wsk-layout__header wsk-layout__header--multi-row wsk-layout__header--tall">
    <div class="wsk-layout__header-row">
      <span>Upper row</span>
    </div>
    <div class="wsk-layout__header-row">
      <span>Middle row</span>
    </div>
    <div class="wsk-layout__header-row">
      <span>Bottom row</span>
    </div>
  </div>
  ```

## wsk-layout__drawer

The drawer element (optional). By default, it's only shown in small screens, as a collapsible panel.

### Options

None.

### State

- `is-visible`:
  This class is added to the drawer when it is currently visible.


## wsk-layout__content

Your content goes here :)


## Other options

- `wsk-layout-spacer`:
  Used to align elements inside a header or drawer. This is a class set to flex
  grow, so you can use it to align elements to the right in a header, for
  example:
  ```html
  <div class="wsk-layout__header">
    <span>Left-aligned text</span>
    <div class="wsk-layout-spacer"></div>
    <span>Right-aligned text</span>
  </div>
  ```
  or to the center:
  ```html
  <div class="wsk-layout__header">
    <div class="wsk-layout-spacer"></div>
    <span>Center-aligned text</span>
    <div class="wsk-layout-spacer"></div>
  </div>
  ```
  You can also use it to align to bottom in a drawer:
  ```html
  <div class="wsk-layout__drawer">
    <span>Top-aligned text</span>
    <div class="wsk-layout-spacer"></div>
    <span>Bottom-aligned text</span>
  </div>
  ```

- `wsk-layout-title`:
  Styles the text inside to look like a title (slightly different styling
  depending on container).
  ```html
  <div class="wsk-layout__header">
    <div class="wsk-layout-title">My Awesome Site</div>
  </div>
  ```
  ```html
  <div class="wsk-layout__drawer">
    <div class="wsk-layout-title">My Awesome Site</div>
  </div>
  ```

- `wsk-layout-navigation` and `wsk-layout-navigation-link`:
  Used to place a navigation section and navigation links, respectively. They're
  styled differently depending on whether they're placed in the header or the
  drawer.
  ```html
  <div class="wsk-layout__header">
    <nav class="wsk-layout-navigation">
      <a class="wsk-layout-navigation-link" href="">Hello</a>
      (...)
    </nav>
  </div>
  ```
  ```html
  <div class="wsk-layout__drawer">
    <nav class="wsk-layout-navigation">
      <a class="wsk-layout-navigation-link" href="">Hello</a>
      (...)
    </nav>
  </div>
  ```
