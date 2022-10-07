---
title: Data Table
description: Variations on Material Design tables.
link: https://material.io/components/data-tables
codepen: JjvaaBG
---

## Preview

<div class="preview">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Honda</td>
        <td>Accord</td>
        <td>2009</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Toyota</td>
        <td>Camry</td>
        <td>2012</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Hyundai</td>
        <td>Elantra</td>
        <td>2010</td>
      </tr>
    </tbody>
  </table>
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
/* Component Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/components/table/style.css');
```

## Usage

Start with a **table** element and add the **table** class name:

```html
<table class="table"></table>
```

The **table** class name is implicit when used with the **table** element.

### Table Head

Add a **thead** element with the **table-head** class name:

```html
<table class="table">
  <thead class="table-head"></thead>
</table>
```

The **table-head** class name is implicit when used with the **thead** element.

#### Table Rows

Add a **tr** element with the **table-row** class name:

```html
<table class="table">
  <thead class="table-head">
    <tr class="table-row"></tr>
  </thead>
</table>

```

The **table-row** class name is implicit when used with the **tr** element.

##### Table Cells

Add a **th** element with the **table-cell** class name:

```html 
<table class="table">
  <thead class="table-head">
    <tr class="table-row">
      <th class="table-cell"></th>
    </tr>
  </thead>
</table>
```

The **table-cell** class name is implicit when used with the **th** element.

### Table Body

Add a **tbody** element with the **table-body** class name:

```html
<table class="table">
  <thead class="table-head">
    <tr class="table-row">
      <th class="table-cell"></th>
    </tr>
  </thead>
  <tbody class="table-body"></tbody>
</table>
```

The **table-body** class name is implicit when used with the **tbody** element.

#### Table Rows

Add a **tr** element with the **table-row** class name:

```html
<table class="table">
  <thead class="table-head">
    <tr class="table-row">
      <th class="table-cell"></th>
    </tr>
  </thead>
  <tbody class="table-body">
    <tr class="table-row"></tr>
  </tbody>
</table>
```

The **table-row** class name is implicit when used with the **tr** element.

##### Table Cells

Add a **td** element with the **table-cell** class name:

```html
<table class="table">
  <thead class="table-head">
    <tr class="table-row">
      <th class="table-cell"></th>
    </tr>
  </thead>
  <tbody class="table-body">
    <tr class="table-row">
      <td class="table-cell"></td>
    </tr>
  </tbody>
</table>
```

The **table-cell** class name is implicit when used with the **td** element.

## Variants

### Default

Default table styling.

<div class="preview">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Honda</td>
        <td>Accord</td>
        <td>2009</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Toyota</td>
        <td>Camry</td>
        <td>2012</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Hyundai</td>
        <td>Elantra</td>
        <td>2010</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<table>
    <thead>
      <tr>
        <th>#</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Honda</td>
        <td>Accord</td>
        <td>2009</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Toyota</td>
        <td>Camry</td>
        <td>2012</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Hyundai</td>
        <td>Elantra</td>
        <td>2010</td>
      </tr>
    </tbody>
  </table>
```

### Zebra

Zebra table styling.

<div class="preview">
  <table class="zebra">
    <thead>
      <tr>
        <th>#</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Honda</td>
        <td>Accord</td>
        <td>2009</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Toyota</td>
        <td>Camry</td>
        <td>2012</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Hyundai</td>
        <td>Elantra</td>
        <td>2010</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<table class="zebra">
  <thead>
    <tr>
      <th>#</th>
      <th>Make</th>
      <th>Model</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Honda</td>
      <td>Accord</td>
      <td>2009</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Toyota</td>
      <td>Camry</td>
      <td>2012</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Hyundai</td>
      <td>Elantra</td>
      <td>2010</td>
    </tr>
  </tbody>
</table>
```

### Activatable

To make a table row activatable, add the **activatable** class name to the **table** element.

<div class="preview">
  <table class="activatable">
    <thead>
      <tr>
        <th>#</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Honda</td>
        <td>Accord</td>
        <td>2009</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Toyota</td>
        <td>Camry</td>
        <td>2012</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Hyundai</td>
        <td>Elantra</td>
        <td>2010</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<table class="activatable">
  <thead>
    <tr>
      <th>#</th>
      <th>Make</th>
      <th>Model</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Honda</td>
      <td>Accord</td>
      <td>2009</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Toyota</td>
      <td>Camry</td>
      <td>2012</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Hyundai</td>
      <td>Elantra</td>
      <td>2010</td>
    </tr>
  </tbody>
</table>

## Design Tokens

| Token                                | Description                    | Default |
|--------------------------------------|--------------------------------|---------|
| `--md-sys-comp-table-border-color` | The outline color of the table | <div class="tooltip token-box color-outline-variant" data-tooltip="--md-sys-color-outline-variant"></div> |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
- [Material Design](https://material.io/components/data-tables)
