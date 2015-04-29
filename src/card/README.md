#Card

##Introduction
The Material Design Lite (MDL) **card** component is a user interface element representing a virtual piece of paper that contains related data &mdash; such as a photo, some text, and a link &mdash; that are all about a single subject.

Cards are a convenient means of coherently displaying related content that is composed of different types of objects. They are also well-suited for presenting similar objects whose size or supported actions can vary considerably, like photos with captions of variable length. Cards have a constant width and a variable height, depending on their content.

Cards are a fairly new feature in user interfaces, and allow users an access point to more complex and detailed information. Their design and use is an important factor in the overall user experience. See the card component's [Material Design specifications page](http://www.google.com/design/spec/components/cards.html) for details.

##Basic use
To use any MDL component, you must include the minified CSS and JavaScript files using standard relative-path references in the `<head>` section of the page, as described in the MDL Introduction.

###To include an MDL **card** component:

&nbsp;1. Code a `<div>` element; this is the "outer" container, intended to hold all of the card's content.
```html
<div>
</div>
```
&nbsp;2. Inside the div, code one or more "inner" divs, one for each desired content block. A card containing a title, an image, some text, and an action bar would contain four "inner" divs, all siblings.
```html
<div>
  <div>
  ...
  </div>
  <div>
  ...
  </div>
  <div>
  ...
  </div>
  <div>
  ...
  </div>
</div>
```
&nbsp;3. Add one or more MDL classes, separated by spaces, to the "outer" div and the "inner" divs (depending on their intended use) using the `class` attribute.
```html
<div class="mdl-card">
  <div class="mdl-card__heading">
  ...
  </div>
  <div class="mdl-card__img-container">
  ...
  </div>
  <div class="mdl-card__lower">
  ...
  </div>
  <div class="mdl-card__bottom">
  ...
  </div>
</div>
```
&nbsp;4. Add content to each "inner" div, again depending on its intended use, using standard HTML elements and, optionally, additional MDL classes.
```html
<div class="mdl-card">
  <div class="mdl-card__heading">
    <h2 class="mdl-card__heading-text">Heading Text Goes Here</h2>
  </div>
  <div class="mdl-card__img-container">
    <img src="photo.jpg" width="220" height="140" border="0" alt="" style="padding:20px;">
  </div>
  <div class="mdl-card__lower">
    This text might describe the photo and provide further information, such as where and when it was taken.
  </div>
  <div class="mdl-card__bottom">
    <a href="(URL or function)">Related Action</a>
  </div>
</div>
```

The card component is ready for use.

####Examples

A card (no shadow) with a heading, image, text, and action.

```html
<div class="mdl-card">
  <div class="mdl-card__heading">
     <h2 class="mdl-card__heading-text">Auckland Sky Tower<br/>Auckland, New Zealand</h2>
  </div>
  <div class="mdl-card__img-container"><img src="skytower.jpg" width="173" height="157" border="0" alt="" style="padding:10px;">
  </div>
  <div class="mdl-card__lower">
  The Sky Tower is an observation and telecommunications tower located in Auckland, New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure in the Southern Hemisphere.
  </div>
  <div class="mdl-card__bottom">
     <a href="http://en.wikipedia.org/wiki/Sky_Tower_%28Auckland%29">Wikipedia entry</a>
  </div>
</div>
```

Card (level-3 shadow) with an image, caption, and text:

```html
<div class="mdl-card mdl-shadow--4dp">
  <div class="mdl-card__img-container"><img src="skytower.jpg" width="173" height="157" border="0" alt="" style="padding:10px;">
  </div>
  <div class="mdl-card__caption">
    Auckland Sky Tower, taken March 24th, 2014
  </div>
  <div class="mdl-card__lower">
  The Sky Tower is an observation and telecommunications tower located in Auckland, New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure in the Southern Hemisphere.
  </div>
</div>
```

##Configuration options
The MDL CSS classes apply various predefined visual and behavioral enhancements to the card. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-card` | Defines div element as an MDL card container | Required on "outer" div |
| `mdl-shadow--2dp through mdl-shadow--8dp` | Assigns variable shadow depths (1-5) to card | Optional, goes on "outer" div; if omitted, no shadow is present |
| `mdl-card__heading` | Defines div as a card heading container(1) | Required on "inner" heading div |
| `mdl-card__heading-text` | Assigns appropriate text characteristics to card heading | Required on head tag (H1 - H6) inside heading div |
| `mdl-card__img-container` | Defines div as a card image container | Required on "inner" image div |
| `mdl-card__lower` | Defines div as a card body text container(1) and assigns appropriate text characteristics to body text | Required on "inner" body text div; text goes directly inside the div with no intervening containers |
| `mdl-card__caption` | Defines div as a card caption container and assigns appropriate text characteristics to caption text | Required on "inner" caption div; text goes directly inside the div with no intervening containers |
| `mdl-card__bottom` | Defines div as a card bottom text container(1) (typically an action bar) and assigns appropriate text characteristics to bottom text | Required on "inner" bottom div; content goes directly inside the div with no intervening containers |
| `mdl-card__bottom--top-border` | Modifies the bottom card area to have a top-border. | Optional on bottom element. |

(1) Although some class names imply positioning, they really just semantically define the styling of the content. The actual positions of the "inner" divs within the card are determined by order of appearance (i.e., top-down). You may use them in any order, so long as they maintain their relationships as siblings and as direct children of the "outer" container div.

##More information
For working examples of the **card** component, see the MDL [card demo page](www.github.com/google/material-design-lite/src/card/demo.html).

## License

Copyright Google, 2015. Licensed under an Apache-2 license.
