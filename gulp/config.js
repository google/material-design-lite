export const BANNER = `
/**
 * <%= pkg.name %> - <%= pkg.description %>
 * @version v<%= pkg.version %>
 * @license <%= pkg.license %>
 * @copyright 2015 Google, Inc.
 * @link https://github.com/google/material-design-lite
 */
`;


export const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

export const SOURCES = [
  // Component handler
  'src/mdlComponentHandler.js',
  // Polyfills/dependencies
  'src/third_party/**/*.js',
  // Base components
  'src/button/button.js',
  'src/checkbox/checkbox.js',
  'src/icon-toggle/icon-toggle.js',
  'src/menu/menu.js',
  'src/progress/progress.js',
  'src/radio/radio.js',
  'src/slider/slider.js',
  'src/snackbar/snackbar.js',
  'src/spinner/spinner.js',
  'src/switch/switch.js',
  'src/tabs/tabs.js',
  'src/textfield/textfield.js',
  'src/tooltip/tooltip.js',
  // Complex components (which reuse base components)
  'src/layout/layout.js',
  'src/data-table/data-table.js',
  // And finally, the ripples
  'src/ripple/ripple.js'
];
