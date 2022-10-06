---
title: Navigation Drawer
description: Variations on Material Design navigation drawers.
link: https://m3.material.io/components/navigation-drawer
codepen: yLjxPEp
---

## Preview

<div class="preview">
  <div class="navigation-drawer">
    <div class="drawer-title">Drawer Header</div>
    <section>
      <label class="section-header">Mail</label>
      <div class="list-tile" data-selected>
        <i class="leading material-icons">inbox</i>
        <span class="title">Inbox</span>
        <div class="trailing">100+</div>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">send</i>
        <span class="title">Outbox</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">favorite</i>
        <span class="title">Favorites</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">delete</i>
        <span class="title">Trash</span>
      </div>
    </section>
    <div class="divider"></div>
    <section>
      <label class="section-header">Section 2</label>
      <div class="list-tile">
        <span class="title">Label 1</span>
      </div>
      <div class="list-tile">
        <span class="title">Label 2</span>
      </div>
    </section>
  </div>
</div>

## Installation

To import just the component styles, copy the following into your project's **styles.css** file:

```css
/* Core Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/core.css');
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
/* Roboto Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap');
/* Component Styles */;
@import url('https://rodydavis.github.io/material-design-lite/css/components/navigation-drawer/style.css');
@import url('https://rodydavis.github.io/material-design-lite/css/components/list-tile/style.css');
```

## Usage

Start with a **nav** or **div** element and add the **navigation-drawer** class name:

```html
<div class="navigation-drawer"></div>
```

### Navigation Header

<div class="preview">
   <div class="navigation-drawer">
    <div class="drawer-title">Drawer Header</div>
  </div>
</div>

To add a header to the navigation drawer, add a **div** element with the **drawer-title** class name:

```html
<div class="navigation-drawer">
  <div class="drawer-title">Drawer Header</div>
</div>
```

### Navigation Section

<div class="preview">
  <div class="navigation-drawer">
    <section class="drawer-section">
      <label class="section-header">Section Header</label>
      <div class="list-tile">
        <i class="leading material-icons">info</i>
        <span class="title">Label 1</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">info</i>
        <span class="title">Label 2</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">info</i>
        <span class="title">Label 3</span>
      </div>
    </section>
  </div>
</div>

To add a section to the navigation drawer, add a **section** element with the **section-header** class name:

```html
<div class="navigation-drawer">
  <section class="drawer-section">
    <label class="section-header">Section Header</label>
    <div class="list-tile">
      <i class="leading material-icons">info</i>
      <span class="title">Label 1</span>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">info</i>
      <span class="title">Label 2</span>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">info</i>
      <span class="title">Label 3</span>
    </div>
  </section>
</div>
```

The **drawer-section** class name is implicit when using the **section** element.

Multiple sections can be added to the navigation drawer.

### Navigation Divider

<div class="preview">
  <div class="navigation-drawer">
    <div class="divider"></div>
  </div>
</div>

To add a divider to the navigation drawer, add a **div** element with the **divider** class name:

```html
<div class="navigation-drawer">
  <div class="divider"></div>
</div>
```

### Navigation List Tile

<div class="preview">
  <div class="navigation-drawer">
    <div class="list-tile">
      <i class="leading material-icons">info</i>
      <span class="title">Label 1</span>
      <div class="trailing">Trailing</div>
    </div>
  </div>
</div>

To add a list tile to the navigation drawer, add a **div** element with the **list-tile** class name:

```html
<div class="navigation-drawer">
  <div class="list-tile">
    <i class="leading material-icons">info</i>
    <span class="title">Label 1</span>
    <div class="trailing">Trailing</div>
  </div>
</div>
```

The **trailing** element is optional.

## Variants

### Default

<div class="preview">
   <div class="navigation-drawer">
    <div class="drawer-title">Drawer Header</div>
    <section>
      <label class="section-header">Mail</label>
      <div class="list-tile" data-selected>
        <i class="leading material-icons">inbox</i>
        <span class="title">Inbox</span>
        <div class="trailing">100+</div>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">send</i>
        <span class="title">Outbox</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">favorite</i>
        <span class="title">Favorites</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">delete</i>
        <span class="title">Trash</span>
      </div>
    </section>
    <div class="divider"></div>
    <section>
      <label class="section-header">Section 2</label>
      <div class="list-tile">
        <span class="title">Label 1</span>
      </div>
      <div class="list-tile">
        <span class="title">Label 2</span>
      </div>
    </section>
  </div>
</div>

```html
<div class="navigation-drawer">
  <div class="drawer-title">Drawer Header</div>
  <section>
    <label class="section-header">Mail</label>
    <div class="list-tile" data-selected>
      <i class="leading material-icons">inbox</i>
      <span class="title">Inbox</span>
      <div class="trailing">100+</div>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">send</i>
      <span class="title">Outbox</span>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">favorite</i>
      <span class="title">Favorites</span>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">delete</i>
      <span class="title">Trash</span>
    </div>
  </section>
  <div class="divider"></div>
  <section>
    <label class="section-header">Section 2</label>
    <div class="list-tile">
      <span class="title">Label 1</span>
    </div>
    <div class="list-tile">
      <span class="title">Label 2</span>
    </div>
  </section>
</div>
```

It is recommended to set the **data-selected** attribute on the default tab.

### Modal

<div class="preview">
 <dialog id="drawer-dialog" class="navigation-drawer modal">
    <div class="drawer-title">Drawer Header</div>
    <section>
      <label class="section-header">Mail</label>
      <div class="list-tile" selected>
        <i class="leading material-icons">inbox</i>
        <span class="title">Inbox</span>
        <div class="trailing">100+</div>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">send</i>
        <span class="title">Outbox</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">favorite</i>
        <span class="title">Favorites</span>
      </div>
      <div class="list-tile">
        <i class="leading material-icons">delete</i>
        <span class="title">Trash</span>
      </div>
    </section>
    <div class="divider"></div>
    <section>
      <label class="section-header">Section 2</label>
      <div class="list-tile">
        <span class="title">Label 1</span>
      </div>
      <div class="list-tile">
        <span class="title">Label 2</span>
      </div>
    </section>
    <div class="drawer-spacer"></div>
    <form method="dialog">
      <button class="text">
        <i class="material-icons">close</i>
        <label>Close Drawer</label>
      </button>
    </form>
  </dialog>
  <button id="drawer-dialog-btn">Open Drawer</button>
  <script>
    document
      .getElementById("drawer-dialog-btn")
      .addEventListener("click", (e) => {
        const btn = e.target;
        const dialog = document.getElementById("drawer-dialog");
        dialog.showModal();
        btn.disabled = true;
        dialog.addEventListener("close", () => {
          btn.disabled = false;
        });
      });
  </script>
</div>

To create a modal navigation drawer, add the **modal** class name to the **dialog** element:

```html
<dialog id="drawer-dialog" class="navigation-drawer modal">
  <div class="drawer-title">Drawer Header</div>
  <section>
    <label class="section-header">Mail</label>
    <div class="list-tile" selected>
      <i class="leading material-icons">inbox</i>
      <span class="title">Inbox</span>
      <div class="trailing">100+</div>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">send</i>
      <span class="title">Outbox</span>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">favorite</i>
      <span class="title">Favorites</span>
    </div>
    <div class="list-tile">
      <i class="leading material-icons">delete</i>
      <span class="title">Trash</span>
    </div>
  </section>
  <div class="divider"></div>
  <section>
    <label class="section-header">Section 2</label>
    <div class="list-tile">
      <span class="title">Label 1</span>
    </div>
    <div class="list-tile">
      <span class="title">Label 2</span>
    </div>
  </section>
  <div class="drawer-spacer"></div>
  <form method="dialog">
    <button class="text">
      <i class="material-icons">close</i>
      <label>Close Drawer</label>
    </button>
  </form>
</dialog>
<button id="drawer-dialog-btn">Open Drawer</button>
<script>
  document
    .getElementById("drawer-dialog-btn")
    .addEventListener("click", (e) => {
      const btn = e.target;
      const dialog = document.getElementById("drawer-dialog");
      dialog.showModal();
      btn.disabled = true;
      dialog.addEventListener("close", () => {
        btn.disabled = false;
      });
    });
</script>
```

The **drawer-spacer** element is used to push the button to the bottom of the drawer.

```html
<div class="drawer-spacer"></div>
```

To close the modal, call the **close()** method on the **dialog** element, hit the **esc** key.

```javascript
const dialog = document.getElementById("drawer-dialog");
dialog.close();
```

#### Scrolling

<div class="preview">
 <dialog id="drawer-dialog-scroll" class="navigation-drawer modal">
    <div class="drawer-title">Really long drawer</div>
    <div class="drawer-scrollable">
      <section>
        <label class="section-header">Mail</label>
        <div class="list-tile" selected>
          <i class="leading material-icons">inbox</i>
          <span class="title">Inbox</span>
          <div class="trailing">100+</div>
        </div>
        <div class="list-tile">
          <i class="leading material-icons">send</i>
          <span class="title">Outbox</span>
        </div>
        <div class="list-tile">
          <i class="leading material-icons">favorite</i>
          <span class="title">Favorites</span>
        </div>
        <div class="list-tile">
          <i class="leading material-icons">delete</i>
          <span class="title">Trash</span>
        </div>
      </section>
      <div class="divider"></div>
      <section>
        <label class="section-header">Section 2</label>
        <div class="list-tile">
          <span class="title">Label 1</span>
        </div>
        <div class="list-tile">
          <span class="title">Label 2</span>
        </div>
      </section>
      <div class="divider"></div>
      <section>
        <label class="section-header">Section 2</label>
        <div class="list-tile">
          <span class="title">Label 1</span>
        </div>
        <div class="list-tile">
          <span class="title">Label 2</span>
        </div>
      </section>
      <div class="divider"></div>
      <section>
        <label class="section-header">Section 2</label>
        <div class="list-tile">
          <span class="title">Label 1</span>
        </div>
        <div class="list-tile">
          <span class="title">Label 2</span>
        </div>
      </section>
      <div class="divider"></div>
      <section>
        <label class="section-header">Section 2</label>
        <div class="list-tile">
          <span class="title">Label 1</span>
        </div>
        <div class="list-tile">
          <span class="title">Label 2</span>
        </div>
      </section>
      <div class="divider"></div>
      <section>
        <label class="section-header">Section 2</label>
        <div class="list-tile">
          <span class="title">Label 1</span>
        </div>
        <div class="list-tile">
          <span class="title">Label 2</span>
        </div>
      </section>
      <div class="divider"></div>
      <section>
        <label class="section-header">Section 2</label>
        <div class="list-tile">
          <span class="title">Label 1</span>
        </div>
        <div class="list-tile">
          <span class="title">Label 2</span>
        </div>
      </section>
      <div class="divider"></div>
      <section>
        <label class="section-header">Section 2</label>
        <div class="list-tile">
          <span class="title">Label 1</span>
        </div>
        <div class="list-tile">
          <span class="title">Label 2</span>
        </div>
      </section>
    </div>
    <form method="dialog">
      <button class="text">
        <i class="material-icons">close</i>
        <label>Close Drawer</label>
      </button>
    </form>
  </dialog>
  <button id="drawer-dialog-scroll-btn">Open Drawer</button>
  <script>
    document
      .getElementById("drawer-dialog-scroll-btn")
      .addEventListener("click", (e) => {
        const btn = e.target;
        const dialog = document.getElementById("drawer-dialog-scroll");
        dialog.showModal();
        btn.disabled = true;
        dialog.addEventListener("close", () => {
          btn.disabled = false;
        });
      });
  </script>
</div>


If the modal drawer is too large to fit on the screen, it will scroll. To make the modal scrollable, add a **drawer-scrollable** class name to the content inside the **dialog** element:

```html
<dialog id="drawer-dialog-scroll" class="navigation-drawer modal">
  <div class="drawer-title">Drawer title</div>
  <div class="drawer-scrollable">
    <!-- content -->
  </div>
  <form method="dialog">
    <button class="text">
      <i class="material-icons">close</i>
      <label>Close Drawer</label>
    </button>
  </form>
</dialog>
```

## Design Tokens

| Token                                              | Description                        | Default                                                                                                         |
|----------------------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `--md-sys-comp-navigation-drawer-background-color` | The foreground color of the drawer | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div>                       |
| `--md-sys-comp-navigation-drawer-color`            | The foreground color of the drawer | <div class="tooltip token-box color-on-surface-variant" data-tooltip="--md-sys-color-on-surface-variant"></div> |
| `--md-comp-navigation-drawer-container-width`      | The width of the container         | `360px`                                                                                                         |
| `--md-comp-navigation-drawer-container-height`     | The height of the container        | `100%`                                                                                                          |

## Resources

- [ARIA Resources](https://static.corp.google.com/ariablueprints/dialog/dialog-modal-1.0.html)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [Material Design](https://m3.material.io/components/navigation-drawer)
