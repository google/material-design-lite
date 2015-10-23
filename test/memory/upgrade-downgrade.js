var path = require('path');
var drool = require('drool');
var heapDiffPrinter = require('./utils.js').heapDiffPrinter;
var webdriver = drool.webdriver;

module.exports = function(stamps, i, driver, component) {
  drool.flow({
    setup: function() {
      driver.get('file://' + path.join(__dirname, 'blank.html'));
    },
    action: function() {
      driver.executeScript("(function() { var e = document.createElement('div');" +
         "componentHandler.upgradeElement(e, '"+ component + "');" +
         "componentHandler.downgradeElements(e);})()");
    },
    assert: function(after, initial) {
      heapDiffPrinter(after, initial, i, component);
    }
  }, driver);
};
