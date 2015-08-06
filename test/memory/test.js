'use strict';

var drool = require('drool');
var path = require('path');
var humanize = require('humanize');
var assert = require('assert');
var webdriver = drool.webdriver;
var driver = drool.start({chromeOptions: 'no-sandbox'});

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
    console.log('Menu Component Toggle Test');
    console.log('node delta: ' + (after.nodes - initial.nodes));
    console.log('heap delta: ' + humanize.filesize(after.jsHeapSizeUsed - initial.jsHeapSizeUsed));
    console.log('event listener delta: ' + (after.jsEventListeners - initial.jsEventListeners));

    assert.equal(true, after.jsEventListeners <= initial.jsEventListeners);
  }
}, driver);

driver.quit();
