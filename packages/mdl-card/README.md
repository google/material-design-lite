# mdl-card

MDL card is a component that implements the
[Material Design card component](https://material.google.com/components/cards.html), and makes it available to
developers as a set of CSS classes.

## Installation

> Note: Installation via the npm registry will be available after alpha.


## Usage

```html
<div class="mdl-card">
  <section class="mdl-card__primary">
    <h1 class="mdl-card__title mdl-card__title--large">Title goes here</h1>
    <h2 class="mdl-card__subtitle">Subtitle here</h2>
  </section>
  <section class="mdl-card__supporting-text">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.
  </section>
  <section class="mdl-card__actions">
    <button class="mdl-button mdl-button--compact mdl-card__action">Action 1</button>
    <button class="mdl-button mdl-button--compact mdl-card__action">Action 2</button>
  </section>
</div>
```

Cards don't come with a predefined width or height. They expand horizontally to fill all available space, and vertically
to fit their contents.

If you'd like to maintain a consistent height and width across cards, you'll need to set it in your styles:

```css
.my-card-container .mdl-card {
  height: 350px;
  width: 350px;
}
```

Content will be bottom-aligned if it's smaller than the height of the card.


### Dark theme

Cards can use a dark theme by either having the `mdl-card--theme-dark` option directly applied to the card:

```html
<div class="mdl-card mdl-card--theme-dark">
  <section class="mdl-card__primary">
    <h1 class="mdl-card__title mdl-card__title--large">Title goes here</h1>
    <h2 class="mdl-card__subtitle">Subtitle here</h2>
  </section>
  <section class="mdl-card__actions">
    <button class="mdl-button mdl-button--compact mdl-card__action">Action 1</button>
    <button class="mdl-button mdl-button--compact mdl-card__action">Action 2</button>
  </section>
</div>
```

Or by using the `mdl-theme--dark` global modifier class that affects all children:

```html
<body class="mdl-theme--dark">
  <div class="mdl-card">
    <section class="mdl-card__primary">
      <h1 class="mdl-card__title mdl-card__title--large">Title goes here</h1>
      <h2 class="mdl-card__subtitle">Subtitle here</h2>
    </section>
    <section class="mdl-card__actions">
      <button class="mdl-button mdl-button--compact mdl-card__action">Action 1</button>
      <button class="mdl-button mdl-button--compact mdl-card__action">Action 2</button>
    </section>
  </div>
</body>
```



### Content blocks

Cards are composed of different content blocks, which are typically laid out in vertical succession.


#### Rich media

```css
#example .mdl-card__media {
  background-image: url("pretty.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 90px;
}
```

```html
<section class="mdl-card__media"></section>
```

This area is used for showing rich media in cards, and optionally as a container. Use the `mdl-card__media` CSS class.


#### Actions

```html
<section class="mdl-card__actions">
  <button class="mdl-button mdl-button--compact mdl-card__action">Action 1</button>
  <button class="mdl-button mdl-button--compact mdl-card__action">Action 2</button>
</section>
```

This area is used for showing different actions the user can take. It's typically used with buttons, as in the example
above, or with icon buttons, as below:

> TODO(sgomes): Add icon button support and example.

You can use the `mdl-card__actions--vertical` option to lay actions out vertically instead of horizontally:

```html
<section class="mdl-card__actions mdl-card__actions--vertical">
  <button class="mdl-button mdl-button--compact mdl-card__action">Action 1</button>
  <button class="mdl-button mdl-button--compact mdl-card__action">Action 2</button>
</section>
```

Be sure to include the `mdl-card__action` class on every action for correct positioning. Also, be sure to include the
`mdl-button--compact` class on buttons for correct alignment.


#### Primary title / text

```html
<section class="mdl-card__primary">
  <h1 class="mdl-card__title mdl-card__title--large">Title goes here</h1>
  <h2 class="mdl-card__subtitle">Subtitle here</h2>
</section>
```

This area is used for titles and subtitles:

| Class                    | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `mdl-card__primary`      | Defines the primary text / title content block. |
| `mdl-card__title`        | A title block.                                  |
| `mdl-card__title--large` | An option for the title, to make it larger.     |
| `mdl-card__subtitle`     | A subtitle block.                               |

Note that the title and subtitle classes can also be used outside of the primary title / text content block.


#### Supporting text

```html
<section class="mdl-card__supporting-text">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
  commodo consequat.
</section>
```

This area is used for displaying the bulk of the textual content of the card. Use the `mdl-card__supporting-text` CSS
class.


### Horizontal blocks

You can stack multiple card blocks horizontally instead of vertically, by placing them inside of a horizontal block:

```html
<div class="mdl-card__horizontal-block">
  <section class="mdl-card__primary">
    <h1 class="mdl-card__title mdl-card__title--large">Title here</h1>
    <h2 class="mdl-card__subtitle">Subtitle here</h2>
  </section>
  <section class="mdl-card__actions">
    <button class="mdl-button mdl-button--compact mdl-card__action">Action</button>
  </section>
</div>
```

#### Media items

Media items are designed to be used in horizontal blocks, taking up a fixed height, rather than stretching to the width
of the card.

> Note: Unlike media blocks, media items are not designed to be used as optional containers.

```html
<div class="mdl-card__horizontal-block">
  <section class="mdl-card__primary">
    <h1 class="mdl-card__title mdl-card__title--large">Title here</h1>
    <h2 class="mdl-card__subtitle">Subtitle here</h2>
  </section>
  <img class="mdl-card__media-item mdl-card__media-item--1x" src="image.jpg"></img>
</div>
```

There are several predefined media item sizes you can use:

| Class                           | Description                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| `mdl-card__media-item`          | Defines a media item and sets it to the default height of 80px.  |
| `mdl-card__media-item--1dot5x`  | Sets the media item height to 120px.                             |
| `mdl-card__media-item--2x`      | Sets the media item height to 160px.                             |
| `mdl-card__media-item--3x`      | Sets the media item height to 240px.                             |
