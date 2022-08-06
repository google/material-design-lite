---
title: Autocomplete
description: Material autocomplete text field.
setup: |
  import Playground from "../../../components/Playground.astro";
---

## Default

<!-- <Playground>
<label class="text-field filled">
  <input placeholder=" " list="browsers">
  <span>Textfield</span>
</label>
<datalist id="browsers">
   <option value="Edge"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
</Playground> -->

```html
<label class="text-field filled">
  <input placeholder=" " list="browsers">
  <span>Textfield</span>
</label>
<datalist id="browsers">
   <option value="Edge"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
```