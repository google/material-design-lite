---
layout: styles
title: Styles
bodyclass: styles
include_prefix: ../
---

  <div class="styles__content">
    <p>
      Material Design Lite is a light-weight implementation of Material Design,
      specifically crafted for the web. For more detailed guidelines and
      specifications for other platforms please refer to the
      <a href="https://www.google.com/design/spec/material-design">
        Material Design site
      </a>
    </p>

    <h2 class="mdl-typography--subhead">Typography</h2>
    <dl class="typo-styles">
      <dt>h1</dt>
      <dd>
        <div class="typo-styles__demo mdl-typography--display-4">Light 112sp</div>
        <div class="typo-styles__desc">
          <span class="typo-styles__name">display-4</span>
          <span class="typo-styles__weight">font weight 300</span>
        </div>
      </dd>
      <dt>h2</dt>
      <dd>
        <div class="typo-styles__demo mdl-typography--display-3">Regular 56sp</div>
        <div class="typo-styles__desc">
          <span class="typo-styles__name">display-3</span>
          <span class="typo-styles__weight">font weight 400</span>
        </div>
      </dd>
      <dt>h3</dt>
      <dd>
        <div class="typo-styles__demo mdl-typography--display-2">Regular 45sp</div>
        <div class="typo-styles__desc">
          <span class="typo-styles__name">display-2</span>
          <span class="typo-styles__weight">font weight 400</span>
        </div>
      </dd>
      <dt>h4</dt>
      <dd>
        <div class="typo-styles__demo mdl-typography--display-1">Regular 34sp</div>
        <div class="typo-styles__desc">
          <span class="typo-styles__name">display-1</span>
          <span class="typo-styles__weight">font weight 400</span>
        </div>
      </dd>
      <dt>h5</dt>
      <dd>
        <div class="typo-styles__demo mdl-typography--headline">Regular 24sp</div>
        <div class="typo-styles__desc">
          <span class="typo-styles__name">headline</span>
          <span class="typo-styles__weight">font weight 400</span>
        </div>
      </dd>
      <dt>h6</dt>
      <dd>
        <div class="typo-styles__demo mdl-typography--title">Regular 20sp</div>
        <div class="typo-styles__desc">
          <span class="typo-styles__name">title</span>
          <span class="typo-styles__weight">font weight 500</span>
        </div>
      </dd>
    </dl>
    <div class="code-with-text">
      <strong>Note</strong>: This portion is only to demonstrate header and display styles for out CSS. For more typography guidelines, please refer to the <a href="https://www.google.com/design/spec/material-design">Material Design spec</a>.
    </div>
    <div class="styles__download">
      <a class="download-btn download-btn--font" href="http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B0J8hsRkk91LRjU4U1NSeXdjd1U/RobotoTTF.zip">
        <i class="material-icons">file_download</i>
        Download Roboto Font
      </a>
      <span class="download__size">1.21 MB (.zip)</span>
    </div>
    <div class="code-with-text">
      To embed Roboto into your web page, copy the code as the first element in the <code>&lt;head&gt;</code> of your HTML document.
      <pre class="language-markup"><code>&lt;link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css"&gt;</code></pre>
    </div>
  </div>

  <div class="styles__ribbon styles__ribbon--icons">
    <a href="http://google.github.io/material-design-icons/" class="ribbon__imagecontainer">
      <img src="../assets/icons.svg" class="ribbon__image">
      <div class="ribbon__caption ribbon__caption--split">
        Preview icons <i class="material-icons">arrow_forward</i>
      </div>
    </a>
  </div>

  <div class="styles__content mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-desktop left-col">
      <h3>Icons</h3>
      <p>Material Design Icons are the official open-source icons featured in the Google Material Design specification. What’s included:</p>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--7-col-desktop right-col">
      <ul>
        <li>SVG versions of all icons in both 24px and 48px flavours</li>
        <li>SVG and CSS sprites of all icons</li>
        <li>1x, 2x icons targeted at the Web (PNG)</li>
        <li>1x, 2x, 3x icons targeted at iOS (PNG)</li>
        <li>Hi-dpi version of all icons (hdpi, mdpi, xhdpi, xxhdpi, xxxhdpi) (PNG)</li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-desktop left-col">
      <h3>Getting Started</h3>
      <p>You have a few options for getting the icons.</p>
      <h3>Download the Zip</h3>
      <p>Grab the latest stable zip archive (~57MB) of all icons of the bleeding-edge version from master.</p>
      <div class="styles__download">
        <a class="download-btn download-btn--icons" href="https://github.com/google/material-design-icons/releases/download/2.0.0/material-design-icons-2.0.0.zip">
          <i class="material-icons">file_download</i>
          Download
        </a>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--7-col-desktop right-col">
      <h3>Bower</h3>
      <div class="code-with-text">
        Install the icons using the <strong>Bower</strong> package manager.
        <pre class="language-markup"><code>$ bower install material-design-icons --save</code></pre>
      </div>
      <h3>npm</h3>
      <div class="code-with-text">
        You can also find all the icons on <strong>npm</strong>.
        <pre class="language-markup"><code>$ npm install material-design-icons --save</code></pre>
      </div>
      <h3>Usage</h3>
      <p>Take a look at the included index.html file for a preview of all icons included in the set. You are free to use the icons in the way that makes most sense to your project.</p>
      <h3>Structure</h3>
      <p>In general, an icon category (e.g. action) will include the following directories, containing multiple resolutions of our icons.</p>
      <ul>
        <li>1x, 2x Web</li>
        <li>1x, 2x, 3x iOS</li>
        <li>drawable hdpi, mdpi, xhdpi, xxhdpi, xxxhdpi</li>
        <li>svg</li>
      </ul>
      <p>Decide on the icon resolution required for your project and copy, then reference the icons you wish to use.</p>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-desktop left-col">
      <h3>Spritesheets</h3>
      <p>Material Design icons come with SVG and CSS sprites for each category of icon we include. These can be found in the sprites directory, under svg-sprite and css-sprite.</p>
      <h3>Using CSS Sprites</h3>
      <p>To use a CSS spritesheet, reference the stylesheet for the icon category you wish to use, then include the icon definition in your markup. E.g. to use one of the play icons in css-sprite-av.</p>
      <p>That’s it! Don’t forget to publish the corresponding CSS and SVG/PNG files when deploying your project.</p>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--7-col-desktop right-col">
      <div class="code-with-text">
        Reference the stylesheet:
        <pre class="language-markup"><code>&lt;link href="css-sprite/sprite-av-black.css" rel="stylesheet"&gt;</code></pre>
      </div>
      <div class="code-with-text">
        Create an element which will use the icon as a background:
        <pre class="language-markup"><code>&lt;div&gt;&lt;/div&gt;</code></pre>
      </div>
      <div class="code-with-text">
        Add a class referencing the <code>icon</code> spritesheet and specific <code>icon icon-ic_play-circle_outline_black_24dp</code>, which you can get from the above stylesheet.
        <pre class="language-markup"><code>&lt;div class="icon icon-ic_play-circle_outline_black_24dp"&gt;&lt;/div&gt;</code></pre>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-desktop left-col">
      <h3>Using SVG Sprites</h3>
      <p>Similarly, to use an SVG spritesheet, reference the stylesheet for the icon category, then include the icon definition in your markup.</p>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--7-col-desktop right-col">
      <div class="code-with-text">
        E.g: to use one of the play icons in <code>svg-sprite-av</code>, reference the stylesheet:
        <pre class="language-markup"><code>&lt;link href="svg-sprite/svg-sprite-av.css" rel="stylesheet"&gt;</code></pre>
      </div>
      <div class="code-with-text">
        Create an element which will use the icon as a background:
        <pre class="language-markup"><code>&lt;div&gt;&lt;/div&gt;</code></pre>
      </div>
      <div class="code-with-text">
        Next, make sure to set a dimension for the icon. This can either be done inline or via a class. We’ll use a class for this example.
        <pre class="language-markup"><code>&lt;style&gt;
  .svg-ic_play_circle_outline_24px-dims { width: 24px; height: 24px; }
&lt;/style&gt;</code></pre>
      </div>
      <div class="code-with-text">
        Finally, set the dimension and specific ifcon <code>svg-ic_play_circle_outline_24px</code>, which you can get from the above stylesheet.
        <pre class="language-markup"><code>&lt;div class="svg-ic_play_circle_outline_24px svg-ic_play_circle_outline_24px-dims"&gt; &lt;/div&gt;</code></pre>
       </div>
      <h3>Polymer Icons</h3>
      <p>If you wish to use the icon set with Polymer, we recommend consuming them via the <strong>&lt;iron-icons&gt;-element</strong>.
      <h3>License</h3>
      <p>All icons are released under <strong>Attribution 4.0 International license</strong>.</p>
    </div>
  </div>
  <div class="styles__ribbon styles__ribbon--colors">
    <a class="ribbon__imagecontainer">
      <img src="../assets/colors.svg" class="ribbon__image">
      <div class="ribbon__caption">
        Color palette
      </div>
    </a>
  </div>
  <div class="styles__content mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-desktop left-col">
      <h3>Color palette</h3>
      <p>If you’re using the extended color palette, use the first color as the primary color in your app and the other colors as accents.</p>
      <p><strong>See all colors and their accessibility ratios</strong>. This resource includes info on the appropriate contrast ratios and alpha values when using white or black text on a colored background.</p>
      <div class="styles__download">
        <a class="download-btn download-btn--swatches" href="http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B0J8hsRkk91LSGx6b0w3WWpMQ1k/color_swatches.zip">
          <i class="material-icons">file_download</i>
          Download color swatches
        </a>
        <span class="download__size">0.02 MB (.zip)</span>
      </div>
      <div class="styles__download">
        <a class="download-btn download-btn--customizer" href="../customize/index.html">
          <i class="material-icons">arrow_forward</i>
          Try the custom CSS Theme Builder
        </a>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--8-col mdl-cell--7-col-desktop right-col">
      <a href="../customize/index.html"><img class="customizer" src="../assets/customizer.png"></a>
    </div>
  </div>
