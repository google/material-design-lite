---
title: Text field
description: Material text fields.
setup: |
  import Preview from "../../../components/Preview.astro";
  import Playground from "../../../components/Playground.astro";
---

<!-- <Playground>
<label class="text-field filled">
  <input placeholder=" " />
  <span>Textfield</span>
</label>
</Playground> -->

## Filled

<Preview>
<label class="text-field filled">
  <input placeholder=" ">
  <span>Textfield</span>
</label>
<label class="text-field filled">
  <textarea placeholder=" "></textarea>
  <span>Textfield</span>
</label>
</Preview>

```html
<label class="text-field filled">
  <input placeholder=" " />
  <span>Textfield</span>
</label>
<label class="text-field filled">
  <textarea placeholder=" "></textarea>
  <span>Textfield</span>
</label>
```

## Outlined

<Preview>
<label class="text-field outlined">
  <input placeholder=" ">
  <span>Textfield</span>
</label>
<label class="text-field outlined">
  <textarea placeholder=" "></textarea>
  <span>Textfield</span>
</label>
</Preview>

```html
<label class="text-field outlined">
  <input placeholder=" " />
  <span>Textfield</span>
</label>
<label class="text-field outlined">
  <textarea placeholder=" "></textarea>
  <span>Textfield</span>
</label>
```
