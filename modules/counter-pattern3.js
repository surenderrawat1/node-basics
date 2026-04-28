/**
 * counter-pattern3.js
 *
 * Demonstrates: Exporting a constructor/class
 * Use when your module needs to maintain state
 */

function Counter(initialValue = 0) {
  this.count = initialValue;
}

Counter.prototype.increment = function () {
  this.count++;
  return this.count;
};

Counter.prototype.decrement = function () {
  this.count--;
  return this.count;
};

Counter.prototype.reset = function () {
  this.count = 0;
};

Counter.prototype.getCount = function () {
  return this.count;
};

module.exports = Counter;
