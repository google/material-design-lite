# Grid component

The grid component helps you lay out your content for multiple screen sizes.

## Basic Example

```html
<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">Content</div>
  <div class="mdl-cell mdl-cell--4-col">goes</div>
  <div class="mdl-cell mdl-cell--4-col">here</div>
</div>
```

## Grid

The container element.

A grid has 12 columns in desktop screen sizes, 8 in tablet, and 4 in phone, with predefined margins and gutters baked in.

Cells are laid out sequentially in a row, in the order they're defined, with some rules:
- If a cell doesn't fit in the row in one of the screen sizes, it reflows into the following line.
- If a cell has a specified column size equal to or larger than the number of columns for the current screen size, it takes up the entirety of its row.

You can have a maximum grid width (after which the grid stays centered, with padding on either size) by setting is `max-width` CSS property.

### Options

- `mdl-grid--no-spacing`:
  Creates a grid without any margins or gutters.


## mdl-cell

A cell inside the grid, with a given column size. The default is 4.

### Options

- `mdl-cell--N-col` (where N is a number between 1 and 12):
  Set the column size for the cell to N. The default is 4.

- `mdl-cell--stretch`:
  Makes the cell stretch vertically to fill the parent. This is the default.

- `mdl-cell--top`:
  Aligns the cell to the top of the parent.

- `mdl-cell--middle`:
  Aligns the cell to the middle of the parent.

- `mdl-cell--bottom`:
  Aligns the cell to the bottom of the parent.
