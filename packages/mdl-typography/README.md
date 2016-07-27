# mdl-typography

MDL typography is a CSS-only component that implements the
[Material Design typography guidelines](https://material.google.com/style/typography.html), and makes them available to
developers as CSS classes.

## Installation

> Note: Installation via the npm registry will be available after alpha.


## Usage

```html
<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
</head>
<body class="mdl-typography">
  <h1 class="mdl-typography--display4">Big header</h1>
</body>
```

Material Design typography uses the Roboto font, which we're loading from Google Fonts in the example above.

> Note: You can load more font weights and styles if you wish, but `mdl-typography` only uses 300, 400 and 500.

The `mdl-typography` class defines basic properties for text, such as the typeface and antialiasing settings.

### Formatting your text

#### Style

Simply add the corresponding style class to format your text:

```html
<body class="mdl-typography">
  <h1 class="mdl-typography--display4">Big header</h1>

  <p class="mdl-typography--body1">
    A paragraph with <span class="mdl-typography--body2">emphasis</span>.
  </p>
</body>
```

The full list of styles:

- `mdl-typography--display4`
- `mdl-typography--display3`
- `mdl-typography--display2`
- `mdl-typography--display1`
- `mdl-typography--headline`
- `mdl-typography--title`
- `mdl-typography--subheading`
- `mdl-typography--body2`
- `mdl-typography--body1`
- `mdl-typography--caption`

#### Margins and positioning

In order to minimize unexpected behavior, the style classes only specify font properties, such as size, weight and line
height.

This means that while text will be correctly styled, it may not be correctly positioned. If you include the
`mdl-typography--adjust-margin` class, though, positioning will be adjusted according to the style:

```html
<body class="mdl-typography">
  <h1 class="mdl-typography--display4 mdl-typography--adjust-margin">
    Big header
  </h1>

  <p class="mdl-typography--body1 mdl-typography--adjust-margin">
    A paragraph with
    <span class="mdl-typography--body2 mdl-typography--adjust-margin">
      emphasis
    </span>.
  </p>
</body>
```

> Note: as the name implies, `mdl-typography--adjust-margin` will change the margin properties of the element it's
applied to, in order to align text correctly. Because of this, it should only be used in a text context; using this
property on UI elements such as buttons may cause them to be positioned incorrectly.

#### Color

Most Material Design text is either black or white, but can have different opacity values depending on usage. The color
classes help you apply the right color depending on context:

```html
<body class="mdl-typography">
  <p class="mdl-typography--body1">
    <span class="mdl-typography--color-primary-dark">
      Some dark primary text.
    </span>
    <span class="mdl-typography--color-secondary-dark">
      Followed by some dark secondary text.
    </span>
  </p>

  <div class="mdl-typography--body1 mdl-typography--color-primary-light">
    This div has a dark background, so we use a light color for text.
  </div>
</body>
```

The full list of color classes:

| Class                             | Description                                    |
| --------------------------------- | ---------------------------------------------- |
| `mdl-typography--primary-dark`    | Primary text, in a dark color.                 |
| `mdl-typography--secondary-dark`  | Secondary text, in a dark color.               |
| `mdl-typography--hint-dark`       | Hint text, in a dark color.                    |
| `mdl-typography--disabled-dark`   | Disabled text, in a dark color.                |
| `mdl-typography--icon-dark`       | Icon, in a dark color (used with icon fonts).  |
| `mdl-typography--primary-light`   | Primary text, in a light color.                |
| `mdl-typography--secondary-light` | Secondary text, in a light color.              |
| `mdl-typography--hint-light`      | Hint text, in a light color.                   |
| `mdl-typography--disabled-light`  | Disabled text, in a light color.               |
| `mdl-typography--icon-light`      | Icon, in a light color (used with icon fonts). |
