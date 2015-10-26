'use strict';

var drool = require('drool');
var assert = require('assert');
var webdriver = drool.webdriver;
var controlFlow = webdriver.promise.controlFlow();
var measureSnackbar = require('./snackbar');
var measureMenu = require('./menu');
var measureUpgradeDowngrade = require('./upgrade-downgrade');
var driver = drool.start({chromeOptions: 'no-sandbox'});
var snackbarStamps = [];
var menuStamps = [];
var creator = require('../unit/creator');

// commented out tests require special DOM to bootstrap
['MaterialButton',
 'MaterialSpinner',
 'MaterialTooltip',
 {name: 'MaterialCheckbox', creator: creator.checkbox},
 {name: 'MaterialIconToggle', creator: creator.iconToggle},
 'MaterialDataTable',
 {name: 'MaterialLayout', creator: creator.layout},
 {name: 'MaterialMenu', creator: creator.menu},
 'MaterialProgress',
 {name: 'MaterialRadio', creator: creator.radio},
 'MaterialRipple',
 {name: 'MaterialSlider', creator: creator.slider},
 'MaterialSnackbar',
 {name: 'MaterialSwitch', creator: creator.switch},
 'MaterialTabs',
 {name: 'MaterialTextfield', creator: creator.textField},
].forEach(function(v) {
  measureUpgradeDowngrade([], 0, driver, v);
});

for (var i = 0; i < 3; ++i) {
  measureSnackbar(snackbarStamps, i, driver);
}

for (var i = 0; i < 3; ++i) {
  measureMenu(menuStamps, i, driver);
}

controlFlow.execute(function() {
  snackbarStamps.some(function(stamp) {
    assert.equal(true, stamp[0] <= stamp[1]);
    return true;
  });

  menuStamps.some(function(stamp) {
    assert.equal(true, stamp[0] <= stamp[1]);
    return true;
  });
});

driver.quit();
