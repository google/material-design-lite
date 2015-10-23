var humanize = require('humanize');

module.exports = {
  heapDiffPrinter: function(after, initial, i, title) {
    console.log('**' + title + '** .. run: ' + (i + 1) + '\n');
    console.log('node delta | heap delta | event listener');
    console.log('--- | --- | --- |');
    console.log((after.nodes - initial.nodes) + '|' +
     humanize.filesize(after.jsHeapSizeUsed - initial.jsHeapSizeUsed) + '|' +
     (after.jsEventListeners - initial.jsEventListeners) + '\n');
  }
};
