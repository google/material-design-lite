var path = require('path');
var drool = require('drool');
var heapDiffPrinter = require('./utils.js').heapDiffPrinter;
var webdriver = drool.webdriver;

module.exports = function(stamps, i, driver) {
  drool.flow({
    setup: function() {
      driver.get('file://' + path.join(__dirname, '../../dist/components/pickers/demo.html'));
    },
    action: function() {
      driver.findElement(webdriver.By.css('#demo-picker')).click();
      driver.sleep(1000);
      driver.findElement(webdriver.By.css('#demo-picker')).click();
    },
    beforeAssert: function() {
      driver.sleep(1000);
    },
    assert: function(after, initial) {
      heapDiffPrinter(after, initial, i, 'datepicker');
      stamps.push([after.counts.jsEventListeners, initial.counts.jsEventListeners]);
    }
  }, driver);
};