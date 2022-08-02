---
title: Color
description: Material color system based on HCT.
layout: ../layouts/MainLayout.astro
setup: |
  import TonalPalette from "../components/TonalPalette.astro";
  import ColorFamily from "../components/ColorFamily.astro";
---

## Schemes

<ColorFamily group="primary" />

<ColorFamily group="secondary" />

<ColorFamily group="tertiary" />

<ColorFamily group="error" />

## Palettes

### Primary

<TonalPalette group="primary" />

### Secondary

<TonalPalette group="secondary" />

### Tertiary

<TonalPalette group="tertiary" />

### Neutral

<TonalPalette group="neutral" />

### Neutral Variant

<TonalPalette group="neutral-variant" />

### Error

<TonalPalette group="error" />
