var componentHandler = require('./mdlComponentHandler');
var exp = {
  ComponentHandler: componentHandler
};
var components = [
  // Base components
  require('./button/button.js'),
  require('./checkbox/checkbox.js'),
  require('./icon-toggle/icon-toggle.js'),
  require('./menu/menu.js'),
  require('./progress/progress.js'),
  require('./radio/radio.js'),
  require('./slider/slider.js'),
  require('./spinner/spinner.js'),
  require('./switch/switch.js'),
  require('./tabs/tabs.js'),
  require('./textfield/textfield.js'),
  require('./tooltip/tooltip.js'),
  // Complex components (which reuse base components)
  require('./layout/layout.js'),
  require('./data-table/data-table.js'),
  // And finally, the ripples
  require('./ripple/ripple.js')
];

for (var i = 0; i < components.length; i++) {
  exp[components[i].classAsString] = components[i];
  componentHandler.register(components[i]);
}

module.exports = exp;
