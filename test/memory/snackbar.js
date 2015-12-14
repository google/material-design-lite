var path = require('path');
var drool = require('drool');
var heapDiffPrinter = require('./utils.js').heapDiffPrinter;

module.exports = function(stamps, i, driver) {
  drool.flow({
    setup: function() {
      driver.get('file://' + path.join(__dirname, '../../dist/components/snackbar/demo.html'));
    },
    action: function() {
      driver.executeScript('document.querySelector("#demo-snackbar-example").MaterialSnackbar.showSnackbar({message: "🐐", timeout: 300})');
      driver.sleep(400);
    },
    beforeAssert: function() {
      driver.sleep(400);
    },
    assert: function(after, initial) {
      heapDiffPrinter(after, initial, i, 'snackbar');
      stamps.push([after.counts.jsEventListeners, initial.counts.jsEventListeners]);
    }
  }, driver);
}
