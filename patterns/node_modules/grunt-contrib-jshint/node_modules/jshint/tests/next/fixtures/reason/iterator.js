function RangeIterator(range) {
  this.range = range;
  this.current = this.range.low;
}

RangeIterator.prototype.next = function next() {
  if (this.current > this.range.high) {
    throw new Error();
  } else {
    return this.current++;
  }
};

function Range(low, high) {
  this.low = low;
  this.high = high;
}

Range.prototype.__iterator__ = function __iterator__() {
  return new RangeIterator(this);
};

// Nothing wrong with a function named __iterator__
function __iterator__() {
	return "I have a stupid name!";
}
