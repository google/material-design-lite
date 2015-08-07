'use strict';

var drool = require('drool');
var path = require('path');
var humanize = require('humanize');
var assert = require('assert');
var webdriver = drool.webdriver;
var controlFlow = webdriver.promise.controlFlow();
var driver = drool.start({chromeOptions: 'no-sandbox'});
var stamps = [];

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
      console.log('Menu Component Toggle Test .. run: ' + (i + 1));
      console.log('node delta: ' + (after.nodes - initial.nodes));
      console.log('heap delta: ' + humanize.filesize(after.jsHeapSizeUsed - initial.jsHeapSizeUsed));
      console.log('event listener delta: ' + (after.jsEventListeners - initial.jsEventListeners));

      stamps.push([after.jsEventListeners, initial.jsEventListeners]);
    }
  }, driver);
}

for (var i = 0; i < 5; ++i) {
  measureMenuFlow(stamps, i);
}

controlFlow.execute(function() {
  stamps.some(function(stamp) {
    assert.equal(true, stamp[0] <= stamp[1]);
    return true;
  });
});

driver.quit();
