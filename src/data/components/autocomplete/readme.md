---
title: Autocomplete
description: Material autocomplete text field.
setup: |
  import Preview from "../../../components/Preview.astro";
  import Playground from "../../../components/Playground.astro";
---

<Playground id="text-field-filled" >
<label class="text-field filled">
  <input placeholder=" " list="browsers" />
  <span>Textfield</span>
</label>
<datalist id="browsers">
  <option value="Edge"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
</Playground>

## Default

<Preview>
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
</Preview>

```html
<label class="text-field filled">
  <input placeholder=" " list="browsers" />
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
