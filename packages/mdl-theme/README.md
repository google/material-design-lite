# mdl-theme

MDL theme is a foundational module that provides theming to MDL components, and also makes it available to
developers as Sass functions and mixins, as CSS custom properties, and as a set of CSS classes.

The colors in this module are derived from the three theme colors in MDL:
- Primary: the primary color used in your application. This applies to a number of UI elements, such as app bars.
- Accent: the accent color used in your application. This applies to UI elements such as FABs.
- Background: the background color for your application. This is the color on top of which your UI is drawn.

When using the theme colors as background, it becomes important to choose a text color with sufficient contrast.
In addition, it's important to consider the style of text:
- Primary, used for most text.
- Secondary, used for text which is lower in the visual hierarchy.
- Hint, used for text hints (such as those in text fields and labels).
- Disabled, used for text in disabled components and content.
- Icon, used for icons.

> Note: Don't confuse primary color with primary text. The former refers to the primary theme color, that is used
to establish a visual identity and color many parts of your application. The latter refers to the style of text
that is most prominent (low opacity, high contrast), and used to display most content.

The text contrast colors are automatically calculated at the Sass level and exposed as part of this module.

## Installation

> Note: Installation via the npm registry will be available after alpha.


## Usage

### Sass

#### Changing the theme colors

MDL Theme makes it quite easy to change the theme colors for your application, and have the changes apply to all MDL
components. Simply define the three theme color variables before importing `mdl-theme` or any MDL components that rely
on it:

```scss
$mdl-theme-primary: #9c27b0;
$mdl-theme-accent: #ffab40;
$mdl-theme-background: #fff;

@import "mdl-theme/mdl-theme";
```

The correct text colors will automatically be calculated based on the provided theme colors.


#### mdl-theme-prop mixin

MDL Theme exports an `mdl-theme-prop` mixin, which can be used to apply a theme color to a property. The mixin takes the
property name as the first parameter, and the desired color as the second one.

For example, if you wanted to set the background of `.foo` to the primary color, and the text color to suit primary text
on top of it:

```scss
@import "mdl-theme/mixins";

.foo {
  @include mdl-theme-prop(background-color, primary);
  @include mdl-theme-prop(color, text-primary-on-primary);
}
```

This generates the following CSS:

```css
.foo {
  background-color: #9c27b0;
  background-color: var(--mdl-theme-primary);
  color: #fff;
  color: var(--mdl-theme-text-primary-on-primary);
}
```

The generated code uses CSS custom properties for browsers that support it, with a fallback to a pre-processed static
color if they don't. This enables runtime theming if CSS properties are available, in addition to the static theming
described in the "Changing the theme colors" section.

Here is the full list of colors available to the mixin:

##### Theme colors

| Class        | Description                 |
| ------------ | --------------------------- |
| `primary`    | The theme primary color.    |
| `accent`     | The theme accent color.     |
| `background` | The theme background color. |

##### Text on a theme primary color background

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-primary`      | Primary text on top of a theme primary color background.   |
| `text-secondary-on-primary`    | Secondary text on top of a theme primary color background. |
| `text-hint-on-primary`         | Hint text on top of a theme primary color background.      |
| `text-disabled-on-primary`     | Disabled text on top of a theme primary color background.  |
| `text-icon-on-primary`         | Icons on top of a theme primary color background.          |

##### Text on a theme accent color background

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-accent`       | Primary text on top of a theme accent color background.    |
| `text-secondary-on-accent`     | Secondary text on top of a theme accent color background.  |
| `text-hint-on-accent`          | Hint text on top of a theme accent color background.       |
| `text-disabled-on-accent`      | Disabled text on top of a theme accent color background.   |
| `text-icon-on-accent`          | Icons on top of a theme accent color background.           |

##### Text on the theme background

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-background`   | Primary text on top of the theme background.               |
| `text-secondary-on-background` | Secondary text on top of the theme background.             |
| `text-hint-on-background`      | Hint text on top of the theme background.                  |
| `text-disabled-on-background`  | Disabled text on top of the theme background.              |
| `text-icon-on-background`      | Icons on top of the theme background.                      |

##### Text on a light-colored background (useful for custom backgrounds)

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-light`        | Primary text on top of a light-colored background.         |
| `text-secondary-on-light`      | Secondary text on top of a light-colored background.       |
| `text-hint-on-light`           | Hint text on top of a light-colored background.            |
| `text-disabled-on-light`       | Disabled text on top of a light-colored background.        |
| `text-icon-on-light`           | Icons on top of a light-colored background.                |

##### Text on a dark-colored background (useful for custom backgrounds)

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-dark`         | Primary text on top of a dark-colored background.          |
| `text-secondary-on-dark`       | Secondary text on top of a dark-colored background.        |
| `text-hint-on-dark`            | Hint text on top of a dark-colored background.             |
| `text-disabled-on-dark`        | Disabled text on top of a dark-colored background.         |
| `text-icon-on-dark`            | Icons on top of a dark-colored background.                 |


#### mdl-theme-dark mixin

This mixin is mostly used for MDL component development, and provides a standard way of applying dark themes to
components. It creates a suitable selector for a component, and applies the provided content inside of it:

```scss
.mdl-foo {
  color: black;

  @include mdl-theme-dark {
    color: white;
  }

  &__bar {
    background: black;

    @include mdl-theme-dark(".mdl-foo") {
      background: white;
    }
  }
}
```

> Note: If using the mixin on anything other than the base selector, you need to specify the base selector as a
parameter. This ensures that the `--theme-dark` option is appended to the right class.

The above generates the following CSS:

```css
.mdl-foo {
  color: black;
}
.mdl-foo--theme-dark, .mdl-theme--dark .mdl-foo {
  color: white;
}
.mdl-foo__bar {
  background: black;
}
.mdl-foo--theme-dark .mdl-foo__bar, .mdl-theme--dark .mdl-foo__bar {
  background: white;
}
```

A user could thus apply a dark theme to a component by either targeting it specifically:

```html
<div class="mdl-foo mdl-foo--theme-dark"></div>
```

Or instead apply it to everything under a parent element, by using the `mdl-theme--dark` global modifier class:

```html
<body class="mdl-theme--dark">
  <div class="mdl-foo"></div>
</body>
```


#### Color functions

MDL Theme defines several functions, used in the process of determining the correct contrast color for a given
background.

##### mdl-theme-luminance

Calculates the luminance value (0 - 1) of a given color.

```scss
@debug mdl-theme-luminance(#9c27b0); // 0.11654
```

##### mdl-theme-contrast

Calculates the contrast ratio between two colors.

```scss
@debug mdl-theme-contrast(#9c27b0, #000); // 3.33071
```

##### mdl-theme-light-or-dark

Determines whether to use light or dark text on top of a given color.

```scss
@debug mdl-theme-light-or-dark(#9c27b0); // light
```

### CSS Classes

```html
<span class="mdl-theme--primary">
  Some text in the primary color.
</span>

<span class="mdl-theme--accent-bg mdl-theme--text-primary-on-accent">
  Some text on an accent color background.
</span>
```

There are a number of CSS classes available for taking advantage of theming.

#### Theme color classes

These classes set either the text color or the background color to one of the theme colors.

| Class                   | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `mdl-theme--primary`    | Sets the text color to the theme primary color.             |
| `mdl-theme--accent`     | Sets the text color to the theme accent color.              |
| `mdl-theme--background` | Sets the background color to the theme background color.    |
| `mdl-theme--primary-bg` | Sets the background color to the theme primary color.       |
| `mdl-theme--accent-bg`  | Sets the background color to the theme accent color.        |

#### Text colors for contrast

These classes set the text color to a suitable color to be used on top of a given background. The color to be used
depends on two criteria: the background color (namely, whether it's light or dark) and the text style.

##### Text on a theme primary color background

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `mdl-theme--text-primary-on-primary`      | Set text to suitable color for primary text on top of a theme primary color background.   |
| `mdl-theme--text-secondary-on-primary`    | Set text to suitable color for secondary text on top of a theme primary color background. |
| `mdl-theme--text-hint-on-primary`         | Set text to suitable color for hint text on top of a theme primary color background.      |
| `mdl-theme--text-disabled-on-primary`     | Set text to suitable color for disabled text on top of a theme primary color background.  |
| `mdl-theme--text-icon-on-primary`         | Set text to suitable color for icons on top of a theme primary color background.          |

##### Text on a theme accent color background

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `mdl-theme--text-primary-on-accent`       | Set text to suitable color for primary text on top of a theme accent color background.    |
| `mdl-theme--text-secondary-on-accent`     | Set text to suitable color for secondary text on top of a theme accent color background.  |
| `mdl-theme--text-hint-on-accent`          | Set text to suitable color for hint text on top of a theme accent color background.       |
| `mdl-theme--text-disabled-on-accent`      | Set text to suitable color for disabled text on top of a theme accent color background.   |
| `mdl-theme--text-icon-on-accent`          | Set text to suitable color for icons on top of a theme accent color background.           |

##### Text on the theme background

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `mdl-theme--text-primary-on-background`   | Set text to suitable color for primary text on top of the theme background.               |
| `mdl-theme--text-secondary-on-background` | Set text to suitable color for secondary text on top of the theme background.             |
| `mdl-theme--text-hint-on-background`      | Set text to suitable color for hint text on top of the theme background.                  |
| `mdl-theme--text-disabled-on-background`  | Set text to suitable color for disabled text on top of the theme background.              |
| `mdl-theme--text-icon-on-background`      | Set text to suitable color for icons on top of the theme background.                      |

##### Text on a light-colored background (useful for custom backgrounds)

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `mdl-theme--text-primary-on-light`        | Set text to suitable color for primary text on top of a light-colored background.         |
| `mdl-theme--text-secondary-on-light`      | Set text to suitable color for secondary text on top of a light-colored background.       |
| `mdl-theme--text-hint-on-light`           | Set text to suitable color for hint text on top of a light-colored background.            |
| `mdl-theme--text-disabled-on-light`       | Set text to suitable color for disabled text on top of a light-colored background.        |
| `mdl-theme--text-icon-on-light`           | Set text to suitable color for icons on top of a light-colored background.                |

##### Text on a dark-colored background (useful for custom backgrounds)

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `mdl-theme--text-primary-on-dark`         | Set text to suitable color for primary text on top of a dark-colored background.          |
| `mdl-theme--text-secondary-on-dark`       | Set text to suitable color for secondary text on top of a dark-colored background.        |
| `mdl-theme--text-hint-on-dark`            | Set text to suitable color for hint text on top of a dark-colored background.             |
| `mdl-theme--text-disabled-on-dark`        | Set text to suitable color for disabled text on top of a dark-colored background.         |
| `mdl-theme--text-icon-on-dark`            | Set text to suitable color for icons on top of a dark-colored background.                 |


### CSS Custom properties

MDL Theme defines a number of custom properties to make theming in pure CSS possible, if you have access to CSS custom
properties in your system.

> Note: Unfortunately, due to the limitations of custom CSS properties, it's not currently possible to automatically
calculate the correct text colors to use, based on the chosen theme colors. These will all need to be set manually.

#### Theme colors

| Class                    | Description                 |
| ------------------------ | --------------------------- |
| `--mdl-theme-primary`    | The theme primary color.    |
| `--mdl-theme-accent`     | The theme accent color.     |
| `--mdl-theme-background` | The theme background color. |

#### Text on a theme primary color background

| Class                                      | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| `--mdl-theme-text-primary-on-primary`      | Primary text on top of a theme primary color background.   |
| `--mdl-theme-text-secondary-on-primary`    | Secondary text on top of a theme primary color background. |
| `--mdl-theme-text-hint-on-primary`         | Hint text on top of a theme primary color background.      |
| `--mdl-theme-text-disabled-on-primary`     | Disabled text on top of a theme primary color background.  |
| `--mdl-theme-text-icon-on-primary`         | Icons on top of a theme primary color background.          |

#### Text on a theme accent color background

| Class                                      | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| `--mdl-theme-text-primary-on-accent`       | Primary text on top of a theme accent color background.    |
| `--mdl-theme-text-secondary-on-accent`     | Secondary text on top of a theme accent color background.  |
| `--mdl-theme-text-hint-on-accent`          | Hint text on top of a theme accent color background.       |
| `--mdl-theme-text-disabled-on-accent`      | Disabled text on top of a theme accent color background.   |
| `--mdl-theme-text-icon-on-accent`          | Icons on top of a theme accent color background.           |

#### Text on the theme background

| Class                                      | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| `--mdl-theme-text-primary-on-background`   | Primary text on top of the theme background.               |
| `--mdl-theme-text-secondary-on-background` | Secondary text on top of the theme background.             |
| `--mdl-theme-text-hint-on-background`      | Hint text on top of the theme background.                  |
| `--mdl-theme-text-disabled-on-background`  | Disabled text on top of the theme background.              |
| `--mdl-theme-text-icon-on-background`      | Icons on top of the theme background.                      |

#### Text on a light-colored background (useful for custom backgrounds)

| Class                                      | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| `--mdl-theme-text-primary-on-light`        | Primary text on top of a light-colored background.         |
| `--mdl-theme-text-secondary-on-light`      | Secondary text on top of a light-colored background.       |
| `--mdl-theme-text-hint-on-light`           | Hint text on top of a light-colored background.            |
| `--mdl-theme-text-disabled-on-light`       | Disabled text on top of a light-colored background.        |
| `--mdl-theme-text-icon-on-light`           | Icons on top of a light-colored background.                |

#### Text on a dark-colored background (useful for custom backgrounds)

| Class                                      | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| `--mdl-theme-text-primary-on-dark`         | Primary text on top of a dark-colored background.          |
| `--mdl-theme-text-secondary-on-dark`       | Secondary text on top of a dark-colored background.        |
| `--mdl-theme-text-hint-on-dark`            | Hint text on top of a dark-colored background.             |
| `--mdl-theme-text-disabled-on-dark`        | Disabled text on top of a dark-colored background.         |
| `--mdl-theme-text-icon-on-dark`            | Icons on top of a dark-colored background.                 |
