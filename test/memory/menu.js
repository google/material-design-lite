var path = require('path');
var drool = require('drool');
var heapDiffPrinter = require('./utils.js').heapDiffPrinter;
var webdriver = drool.webdriver;

module.exports = function(stamps, i, driver) {
  drool.flow({
    setup: function() {
      driver.get('file://' + path.join(__dirname, '../../dist/components/menu/demo.html'));
    },
    action: function() {
      driver.findElement(webdriver.By.css('#demo-menu-lower-left')).click();
      driver.sleep(1000);
      driver.findElement(webdriver.By.css('#demo-menu-lower-left')).click();
    },
    beforeAssert: function() {
      driver.sleep(1000);
    },
    assert: function(after, initial) {
      heapDiffPrinter(after, initial, i, 'menu');
      stamps.push([after.counts.jsEventListeners, initial.counts.jsEventListeners]);
    }
  }, driver);
};
