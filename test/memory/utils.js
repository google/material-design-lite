var humanize = require('humanize');

module.exports = {
  heapDiffPrinter: function(after, initial, i, title) {
    console.log(title + ' .. run: ' + (i + 1));
    console.log('node delta: ' + (after.nodes - initial.nodes));
    console.log('heap delta: ' + humanize.filesize(after.jsHeapSizeUsed - initial.jsHeapSizeUsed));
    console.log('event listener delta: ' + (after.jsEventListeners - initial.jsEventListeners));
  }
};
