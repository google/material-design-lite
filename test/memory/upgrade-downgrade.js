var path = require('path');
var drool = require('drool');
var heapDiffPrinter = require('./utils.js').heapDiffPrinter;
var webdriver = drool.webdriver;


function upgradeDowngrade(el, name) {
  componentHandler.upgradeElement(el, name);
  componentHandler.downgradeElements(el);
}

module.exports = function(stamps, i, driver, component) {
  var componentName = component.name ? component.name : component;

  drool.flow({
    setup: function() {
      driver.get('file://' + path.join(__dirname, 'blank.html'));
    },
    action: function() {
      var creator = component.creator || function(document) { return document.createElement('div'); };
      driver.executeScript('(' + upgradeDowngrade.toString() + ")((" + creator.toString() + ")(document), '" + componentName + "')");
    },
    assert: function(after, initial) {
      heapDiffPrinter(after, initial, i, componentName);
    }
  }, driver);
};
