---
title: Cards
description: Variations on Material Design cards.
setup: |
  import Preview from "../../../components/Preview.astro";
  import Playground from "../../../components/Playground.astro";
---

<!-- <Playground height="300px">
 <div class="card filled">
    <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
        <button class="button filled">Get started</button>
    </div>
</div>
</Playground> -->

Use a card to display content and actions on a single topic.

Cards should be easy to scan for relevant and actionable information. Elements like text and images should be placed on cards in a way that clearly indicates hierarchy.

## Default

<Preview>
 <div class="card">
    <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
        <button class="button filled">Get started</button>
    </div>
</div>
</Preview>

## Filled

<Preview>
<div class="card filled">
    <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
        <button class="button filled">Get started</button>
    </div>
</div>
</Preview>

## Outlined

<Preview>
<div class="card outlined">
    <div class="title">Play relaxing songs</div>
    <div class="subtitle">From your recent favorites</div>
    <div class="actions">
        <button class="button filled">Get started</button>
    </div>
</div>
</Preview>

## Elevated

<Preview>
<div class="card elevated">
    <div class="title">Play relaxing songs</div>
    <div class="subtitle">From your recent favorites</div>
    <div class="actions">
        <button class="button filled">Get started</button>
    </div>
</div>
</Preview>

## Image

<Preview>
<div class="card elevated">
    <img src="/assets/demos/transparent.jpg">
    <div class="title">Play relaxing songs</div>
    <div class="subtitle">From your recent favorites</div>
    <div class="actions">
        <button class="button filled">Get started</button>
    </div>
</div>
</Preview>
