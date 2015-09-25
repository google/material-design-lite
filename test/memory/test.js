'use strict';

var drool = require('drool');
var path = require('path');
var humanize = require('humanize');
var assert = require('assert');
var webdriver = drool.webdriver;
var controlFlow = webdriver.promise.controlFlow();
var driver = drool.start({chromeOptions: 'no-sandbox'});
var snackbarStamps = [];
var menuStamps = [];

function heapDiffPrinter(after, initial, i, title) {
  console.log(title + ' .. run: ' + (i + 1));
  console.log('node delta: ' + (after.nodes - initial.nodes));
  console.log('heap delta: ' + humanize.filesize(after.jsHeapSizeUsed - initial.jsHeapSizeUsed));
  console.log('event listener delta: ' + (after.jsEventListeners - initial.jsEventListeners));
}

function measureSnackbar(stamps, i) {
  drool.flow({
    setup: function() {
      driver.get('file://' + path.join(__dirname, '../../dist/components/snackbar/demo.html'));
    },
    action: function() {
      driver.executeScript('document.querySelector("#demo-snackbar-example").MaterialSnackbar.showSnackbar({message: "🐐", timeout: 700})');
      driver.sleep(1000);
    },
    beforeAssert: function() {
      driver.sleep(1000);
    },
    assert: function(after, initial) {
      heapDiffPrinter(after, initial, i, 'snackbar');
      stamps.push([after.jsEventListeners, initial.jsEventListeners]);
    }
  }, driver);
}

function measureMenuFlow(stamps, i) {
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
      stamps.push([after.jsEventListeners, initial.jsEventListeners]);
    }
  }, driver);
}

for (var i = 0; i < 5; ++i) {
  measureSnackbar(snackbarStamps, i);
}

for (var i = 0; i < 5; ++i) {
  measureMenuFlow(menuStamps, i);
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
