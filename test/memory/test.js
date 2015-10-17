'use strict';

var drool = require('drool');
var assert = require('assert');
var webdriver = drool.webdriver;
var controlFlow = webdriver.promise.controlFlow();
var measureSnackbar = require('./snackbar');
var measureMenu = require('./menu');
var measureDialogModal = require('./dialog');
var driver = drool.start({chromeOptions: 'no-sandbox'});
var snackbarStamps = [];
var menuStamps = [];
var dialogModalStamps = [];

for (var i = 0; i < 3; ++i) {
  measureSnackbar(snackbarStamps, i, driver);
}

for (var i = 0; i < 3; ++i) {
  measureMenu(menuStamps, i, driver);
}

for (var i = 0; i < 3; ++i) {
  measureDialogModal(dialogModalStamps, i, driver);
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

  dialogModalStamps.some(function(stamp) {
    assert.equal(true, stamp[0] <= stamp[1]);
    return true;
  })
});

driver.quit();
