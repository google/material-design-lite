---
layout: page
title: Getting started
bodyclass: started
include_prefix: ../
---

<section id="toc">
  <h3>Contents</h3>
  <nav class="section-content">
    <ul>
      <li><a href="#include">Include the master CSS &amp; JavaScript</a></li>
      <li><a href="#use-components">Use the components</a></li>
      <li><a href="#general-rules">General rules and principles</a></li>
      <li><a href="#dynamic">Use MDL on dynamic websites</a></li>
      <li><a href="#whats-next">What's next?</a></li>
      <li><a href="#license">License</a></li>
    </ul>
  </nav>
</section>

<section id="include">
  <h3>Include the master CSS &amp; JavaScript</h3>
  <div class="section-content">
    <p>
      Include the Material Lite CSS and JavaScript files in each HTML page in your project. We recommend that you use the **files hosted on our CDN**. You can also **customize and download** them to host them yourself, **build** them from our source code or install them in your **npm**/**Bower** project.
    </p>
  
    <div class="mdl-tabs mdl-js-tabs">
      <div class="mdl-tabs__tab-bar">
        <a href="#tab1" class="mdl-tabs__tab is-active">CDN hosted libraries</a>
        <a href="#tab2" class="mdl-tabs__tab">Download</a>
        <a href="#tab3" class="mdl-tabs__tab">Build</a>
        <a href="#tab4" class="mdl-tabs__tab">Bower</a>
        <a href="#tab5" class="mdl-tabs__tab">npm</a>
      </div>
      <div class="mdl-tabs__panel is-active" id="tab1">
        <div class="code-with-text">
          Just add the following `<link>` and `<script>` elements into your HTML pages:
          <pre class="language-markup">
```
<link rel="stylesheet"
  href="https://storage.googleapis.com/materialdesignlite/$$version$$/material.indigo-pink.min.css">
<script
  src="https://storage.googleapis.com/materialdesignlite/$$version$$/material.min.js">
</script>
```</pre></div>
        <h4>Choose color scheme</h4>
        <p>
          [Color schemes used in Material Design](http://www.google.ch/design/spec/style/color.html) are based on a primary and an accent colors which you may want to personalize. These colors are specified in the CSS file name by following this pattern: `material.<primary>-<accent>.min.css` (e.g. `material.indigo-pink.min.css`). Our CDN hosts a number of color combinations based on common Material Design colors. To discover and preview available color combinations use our <a href="../customize">Customize and Preview tool</a>.
        </p>
      </div>
      <div class="mdl-tabs__panel" id="tab2">
        <p>
          Use the <a href="../customize">Customize and Preview tool</a> to select and preview primary and accent colors combinations for your site. Then download the Material Design Lite files using the button. The zip file downloaded should contain a CSS and a JS file. 
        </p>
        <div class="code-with-text">
         Refer to these files by adding a `<link>` and a `<script>` element into your HTML pages:
          <pre class="language-markup">
```
<link rel="stylesheet" href="./material.min.css">
<script src="./material.min.js"></script>
```</pre>
        </div>
      </div>
      <div class="mdl-tabs__panel" id="tab3">
        <p>
          Our source code is hosted [on GitHub](https://github.com/google/material-design-lite). You'll need to download the code and build it.
        </p>
        <div class="code-with-text">
          Run the following commands in a shell:
          <pre class="language-bash">
```
# Clone/copy the Material Design lite source code.
git clone https://github.com/google/material-design-lite.git
# Go into the newly created folder containing the source code.
cd material-design-lite
# Install necessary dependencies.
npm install && npm install -g gulp
# Build a production version of the components.
gulp
```</pre>
         </div>
         <p>You'll find the Material Design Lite library's file in the `dist` folder. Copy them to your project.
         </p>
         <div class="code-with-text">
           Refer to these files by adding a `<link>` and a `<script>` element into your HTML pages:
           <pre class="language-markup">
```
<link rel="stylesheet" href="./material.min.css">
<script src="./material.min.js"></script>
```</pre>
        </div>
        <div class="note">
          Using this method you will not be able to customize the color scheme of the MDL elements. If you'd like to customize the color scheme prefer the CDN hosted or downloadable libraries. In this case use our <a href="../customize">Customize and Preview tool</a>.
        </div>
      </div>
      <div class="mdl-tabs__panel" id="tab4">
        <p>
          Simply install Material Design Lite files in your [Bower](http://bower.io/) enabled project using:
        </p>
        <div class="code-with-text">
          Run the following command in a shell:
          <pre class="language-bash">
```
bower install material-design-lite --save
```</pre>
        </div>
        <p>
          This will install the Material Design Lite library files in your project's `node_modules` folder.
        </p>
        <div class="code-with-text">
          Refer to these files by adding a `<link>` and a `<script>` element into your HTML pages:
          <pre class="language-markup">
```
<link rel="stylesheet" href="/node_modules/material-design-lite/material.min.css">
<script src="/node_modules/material-design-lite/material.min.js"></script>
```</pre>
        </div>
        <div class="note">
          Using this method you will not be able to customize the color scheme of the MDL elements. If you'd like to customize the color scheme prefer the CDN hosted or downloadable libraries. In this case use our <a href="../customize">Customize and Preview tool</a>.
        </div>
      </div>
      <div class="mdl-tabs__panel" id="tab5">
        <p>
          Simply install Material Design Lite files in your [npm](https://www.npmjs.com/) enabled project using:
        </p>
        <div class="code-with-text">
          Run the following command in a shell:
          <pre class="language-bash">
```
npm install material-design-lite --save
```</pre>
        </div>
        <p>
          This will install the Material Design Lite library files in your project's `node_modules` folder.
        </p>
        <div class="code-with-text">
          Refer to these files by adding a `<link>` and a `<script>` element into your HTML pages:
        <pre class="language-markup">
```
<link rel="stylesheet" href="/node_modules/material-design-lite/material.min.css">
<script src="/node_modules/material-design-lite/material.min.js"></script>
```</pre>
        </div>
        <div class="note">
          Using this method you will not be able to customize the color scheme of the MDL elements. If you'd like to customize the color scheme prefer the CDN hosted or downloadable libraries. In this case use our <a href="../customize">Customize and Preview tool</a>.
        </div>
      </div>
    </div>
    <p>
      That's it! You are now ready to add MDL components on your site.
    </p>
  </div>
</section>

<section id="use-components">
  <h3>Use the components</h3>
  <div class="section-content">
  
    <p>
        You'll find below a couple of examples of MDL [Button](../components/#buttons-section) elements: a Button with ripples and a FAB Button. Just copy &amp; paste the corresponding source code in the `<body>` of an HTML page of your project and the elements will render as shown below.
    </p>
     <div class="mdl-tabs mdl-js-tabs components-demo">
          <div class="mdl-tabs__tab-bar">
            <a href="#tab6" class="mdl-tabs__tab is-active">
              <div class="component">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                  Button
                </button>
              </div>
              <i class="material-icons">content_copy</i> Button w/ Ripples
            </a>
            <a href="#tab7" class="mdl-tabs__tab">
              <div class="component">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                  <i class="material-icons">add</i>
                </button>
              </div>
              <i class="material-icons">content_copy</i> Colored FAB</a>
          </div>
          <div class="mdl-tabs__panel is-active" id="tab6">
            <pre class="language-markup">
```
<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
  Button
</button>```</pre>
          </div>
          <div class="mdl-tabs__panel" id="tab7">
            <pre class="language-markup">
```
<button class="mdl-button mdl-js-button mdl-button--fab">
  <i class="material-icons">add</i>
</button>```</pre>
          </div>
      </div>
    <p>
      MDL elements can be tweaked and configured by adding CSS classes. For example adding `mdl-js-ripple-effect` to an MDL [Button](../components/#buttons-section) will add a Ripple effect when the button is clicked and adding `mdl-button--fab` will change the style of the button to a FAB button.
    </p>
    <p>
      There are many other elements available such as [Card containers](../components/#cards-section), [Sliders](../components/#sliders-section), [Tables](../components/#tables-section), [Menus](../components/#menus-section)... For the complete set of MDL elements and options have a look at the [components](../components) page.
    </p>
    <p>
      We also recommend that you check out our [templates](../templates). These are ready to use website templates using MDL components. Feel free to have a look at them to get started quickly on your next project.
    </p>
  </div>
</section>

<section id="general-rules">
  <h3>General rules and principles</h3>
  <div class="section-content">
    <p>
      In general, follow these basic steps to use an MDL component in your HTML page:
    </p>
    <ol>
      <li>Start with a standard HTML element, such as `<button>`, `<div>`, or `<ul>`, depending on the MDL component you want to use. This establishes the element in the page and readies it for MDL modification.</li>
      
      <li>Add one or more MDL-specific CSS classes to the element, such as `mdl-button`,   `mdl-tabs__panel`, or `mdl-list--inline`, again depending on the component. The classes apply the MDL enhancements to the element and turn it into an MDL component.</li>
    </ol>
    
    <div class="caption">
      <h4>
        A note about HTML elements and MDL CSS classes
      </h4>
      Material Design Lite uses namespaced [BEM](https://en.bem.info/method/) classes—which can apply to almost any HTML element—to construct components. For some components you can use almost any element. The examples in [each component's documentation](../components) use elements that perform well as that component. If you must use elements other than those shown in the examples, we encourage you to experiment to find the best combination of HTML elements and MDL CSS classes for your application.
    </div>
  </div>
</section>

<section id="dynamic">
  <h3>Use MDL on dynamic websites</h3>
  <div class="section-content">
    <p>
      Material Design Lite will automatically register and render all elements marked with MDL classes upon page load.
      However in the case where you are creating DOM elements dynamically you need to register new elements using the `upgradeElement` function. Here is how you can dynamically create the same raised button with ripples shown in the section above:
    </p>
    <pre class="language-markup">
```
<div id="container"/>
<script>
  var button = document.createElement('button');
  var textNode = document.createTextNode("Click Me!");
  button.appendChild(textNode);
  button.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect";
  componentHandler.upgradeElement(button, 'MaterialButton');
  document.getElementById('container').appendChild(button);
</script>```</pre>
  </div>
</section>

<section id="whats-next">
  <h3>What's next?</h3>
  <div class="section-content">
    <p>
      Detailed instructions for using the components, including MDL classes and their effects, coding considerations, and configuration options, can be found in the [components](../components) page. Example of sites using MDL elements together can be found in the [templates](../templates) page.
    </p>
  </div>
</section>

<section id="license">
  <h3>License</h3>
  <div class="section-content">
    <p>
      Copyright Google, 2015. Licensed under an Apache-2 license.
    </p>
  </div>
</section>
