# Material Design Lite

##Introduction
**Material Design Light (MDL)** is a library of developer components based on Google's **Material Design** philosophy: "A visual language for our users that synthesizes the classic principles of good design with the innovation and possibility of technology and science." Understanding the goals and principles of Material Design is critical to the proper use of the MDL components. If you have not yet read the [Material Design Introduction](http://www.google.com/design/spec/material-design/introduction.html), you should do so before attempting to use the components.

The MDL components are created with CSS, JavaScript, and HTML. You can use the components to construct web pages and web apps that are attractive, consistent, and functional, and that adhere to modern design principles like browser portability, device independence, and graceful degradation.

The MDL component library includes common user interface controls such as buttons, check boxes, and text fields &mdash; all adapted to follow Material Design concepts &mdash; as well as enhanced and specialized features like cards, column layouts, sliders, spinners, tabs, typography, and more.

MDL is free to download and use, and may be used with or without any build library or development environment (such as [Web Starter Kit](https://developers.google.com/web/starter-kit/)). It is a cross-browser, cross-OS web developer's toolkit that can be used by anyone who wants to write more productive, portable, and &mdash; most importantly &mdash; usable web pages.

## Getting started

###Get the components
To obtain the components, clone or download the [GitHub MDL repository](https://github.com/google/material-design-lite). Copy the entire package (the top-level folder and everything below it) to the project folder where you will write your HTML pages. This ensures that your project can access all of MDL's components and assets, and that you always have the original files for reference in case you break something. :-)

###Include the master CSS and JavaScript
In each HTML page in your project, include the minified (compressed) CSS and JavaScript files using standard relative-path references. This assumes that a copy of the MDL package folders resides in your project folder.

```html
<link rel="stylesheet" href="css/material.min.css">
<script src="js/material.min.js"></script>
```

That's it! You are now ready to use the MDL components. 

###Use the components
In general, follow these basic steps to use an MDL component in your HTML page.

1. Start with a standard HTML element, such as `<button>`, `<div>`, or `<ul>`, depending on the MDL component you want to use. This establishes the element in the page and readies it for MDL modification.<br/><br/>
2. Add one or more MDL-specific CSS classes to the component, such as `wsk-button`,   `wsk-tabs__panel`, or `wsk-list--inline`, again depending on the component. The classes apply the MDL enhancements to the element and effectively turn it into an MDL component.<br/><br/>
3. View the page, preferably in multiple browsers on multiple devices, to ensure that the component looks and behaves as expected.

##What's next?
Detailed instructions for using the components, including MDL classes and their effects, coding considerations, and configuration options, can be found in each component's `README.md` file. Working examples using various options are in each component's `demo.html` page.

## License

Copyright Google, 2015. Licensed under an Apache-2 license.
