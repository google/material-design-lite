# Layout module

The layout module allows you to build layouts easily, simply by adding a few CSS classes. Everybody loves CSS classes.

## Basic Example

```html
<div class="mdl-layout">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">Material Design Lite</span>
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <!-- Navigation -->
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Hello</a>
        (...)
      </nav>
    </div>
  </header>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Material Design Lite</span>
    <nav class="mdl-navigation">
      <a class="mdl-navigation__link" href="">Hello</a>
      (...)
    </nav>
  </div>
  <main class="mdl-layout__content">
    <div class="demo-content"></div>
  </main>
</div>
```

## Layout

The container element.

### Options

- `mdl-layout--fixed-header`:
  By default, headers are only shown in larger screens. Using this option makes them visible in smaller screens as well.

- `mdl-layout--fixed-drawer`:
  By default, drawers are only shown in smaller screens. Using this option makes them always visible and open in larger screens, effectively functioning as side navigation. They still open and close normally in smaller screens, to save screen real estate.

- `mdl-layout--overlay-drawer-button`:
  By default, the drawer button pushes down the content, to avoid overlapping issues. You can use this option if you'd like to overlay the drawer button directly on top of the content.

### State

- `is-small-screen`:
  Utility class that gets added to the layout when in a small screen size.


## mdl-layout__header

The header element (optional). By default, it's only shown in large screens.

### Options

- `mdl-layout__header--transparent`:
  Makes the background transparent, instead of the default main palette color.

- `mdl-layout__header--seamed`:
  By default, the header casts a shadow onto the content. This option removes the shadow altogether.

- `mdl-layout__header--waterfall`:
  By default, the header casts a shadow onto the content. This option removes the shadow when the page is at the top of the content, and only shows the shadow if the user has scrolled down.

- `mdl-layout__header--scroll`:
  By default, the header stays fixed at the top. This option makes it scroll with the content, so it's only visible at the top of the page.

### State

- `is-compact`:
  Utility class that gets added to the header when in waterfall mode the user has scrolled down, and thus the header has collapsed to a single row.


### Sub-elements

-  `mdl-layout__header-row`:
  Used inside the header for adding a new row. Headers need at least one of these. Example:

  ```html
  <header class="mdl-layout__header mdl-layout__header--tall">
    <div class="mdl-layout__header-row">
      <span>Upper row</span>
    </div>
    <div class="mdl-layout__header-row">
      <span>Middle row</span>
    </div>
    <div class="mdl-layout__header-row">
      <span>Bottom row</span>
    </div>
  </header>
  ```

## mdl-layout__drawer

The drawer element (optional). By default, it's only shown in small screens, as a collapsible panel.

### Options

None.

### State

- `is-visible`:
  This class is added to the drawer when it is currently visible.


## mdl-layout__tab-bar

Tabs (optional). Used for tabbing the entire layout. Tabs live inside the header.

### Example

```html
  <div class="demo-container">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <!-- Icon -->
        <img class="mdl-layout-icon" src="images/app-icon.png"/>
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">Material Design Lite</span>
        </div>
        <!-- Tab bar -->
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
          <a href="#blue-panel" class="mdl-layout__tab is-active">Blue</a>
          <a href="#green-panel" class="mdl-layout__tab">Green</a>
          <a href="#red-panel" class="mdl-layout__tab">Red</a>
        </div>
      </header>
      <main class="mdl-layout__content">
        <!-- Panels -->
        <div class="mdl-layout__tab-panel is-active" id="blue-panel">
          (...)
        </div>
        <div class="mdl-layout__tab-panel" id="green-panel">
          (...)
        </div>
        <div class="mdl-layout__tab-panel" id="red-panel">
          (...)
        </div>
      </main>
    </div>
  </div>
```

### Options

- `mdl-layout--fixed-tabs`:
  Uses fixed tabs, rather than the default scrollable tabs.

### State

- `is-active`:
  Used in tabs and panels to indicate which are active (i.e., selected/displayed).


### Sub-elements

-  `mdl-layout__tab-bar`:
  Container element for the various tabs.

-  `mdl-layout__tab`:
  An individual tab. Should contain the tab title (or icon).

-  `mdl-layout__tab-panel`:
  An individual panel of tabbed content. Linked to the corresponding tab via its ID.


## mdl-layout__content

Your content goes here :)


## Other options

- `mdl-layout--large-screen-only`:
  Displays the element in large screens, and hides it in small screens. Example:
  ```html
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout--large-screen-only">
        Some long text that only fits in larger screens.
      </span>
      <span class="mdl-layout--small-screen-only">Short text</span>
    </div>
  </header>
  ```

- `mdl-layout--small-screen-only`:
  Displays the element in small screens, and hides it in large screens.


- `mdl-layout-spacer`:
  Used to align elements inside a header or drawer. This is a class set to flex
  grow, so you can use it to align elements to the right in a header, for
  example:
  ```html
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span>Left-aligned text</span>
      <div class="mdl-layout-spacer"></div>
      <span>Right-aligned text</span>
    </div>
  </header>
  ```
  or to the center:
  ```html
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <div class="mdl-layout-spacer"></div>
      <span>Center-aligned text</span>
      <div class="mdl-layout-spacer"></div>
    </div>
  </header>
  ```
  You can also use it to align to bottom in a drawer:
  ```html
  <div class="mdl-layout__drawer">
    <div class="mdl-layout__header-row">
      <span>Top-aligned text</span>
      <div class="mdl-layout-spacer"></div>
      <span>Bottom-aligned text</span>
    </div>
  </div>
  ```

- `mdl-layout-icon`:
  Styles an image to serve as the application icon.
  ```html
  <header class="mdl-layout__header">
    <img class="mdl-layout-icon" src="app-icon.svg">My Awesome Site</div>
    <div class="mdl-layout__header-row">...</div>
  </header>
  ```

- `mdl-layout-title`:
  Styles the text inside to look like a title (slightly different styling
  depending on container).
  ```html
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <div class="mdl-layout-title">My Awesome Site</div>
    </div>
  </header>
  ```
  ```html
  <div class="mdl-layout__drawer">
    <div class="mdl-layout-title">My Awesome Site</div>
  </div>
  ```

- `mdl-navigation` and `mdl-navigation__link`:
  Used to place a navigation section and navigation links, respectively. They're
  styled differently depending on whether they're placed in the header or the
  drawer.
  ```html
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Hello</a>
        (...)
      </nav>
    </div>
  </header>
  ```
  ```html
  <div class="mdl-layout__drawer">
    <nav class="mdl-navigation">
      <a class="mdl-navigation__link" href="">Hello</a>
      (...)
    </nav>
  </div>
  ```
