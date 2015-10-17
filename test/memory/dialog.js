var path = require('path');
var drool = require('drool');
var heapDiffPrinter = require('./utils.js').heapDiffPrinter;

module.exports = function(stamps, i, driver) {
  drool.flow({
    setup: function() {
      driver.get('file://' + path.join(__dirname, '../../dist/components/dialog/demo.html'));
    },
    action: function() {
      driver.executeScript('document.querySelector("#dialog-example").MaterialDialog.showModal();');
      driver.sleep(400);
      driver.executeScript('document.querySelector("#dialog-example").MaterialDialog.close();');
    },
    beforeAssert: function() {
      driver.sleep(400);
    },
    assert: function(after, initial) {
      heapDiffPrinter(after, initial, i, 'dialog');
      stamps.push([after.jsEventListeners, initial.jsEventListeners]);
    }
  }, driver);
}
