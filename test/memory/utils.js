var humanize = require('humanize');

module.exports = {
  heapDiffPrinter: function(after, initial, i, title) {
    console.log('**' + title + '** .. run: ' + (i + 1) + '\n');
    console.log('node delta | heap delta | event listener');
    console.log('--- | --- | --- |');
    console.log((after.counts.nodes - initial.counts.nodes) + '|' +
     humanize.filesize(after.counts.jsHeapSizeUsed - initial.counts.jsHeapSizeUsed) + '|' +
     (after.counts.jsEventListeners - initial.counts.jsEventListeners) + '\n');
  }
};
