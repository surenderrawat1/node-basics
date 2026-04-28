/**
 * calculator-pattern1.js
 *
 * Demonstrates: Exporting multiple related functions as an object
 */

module.exports = {
  power: function (base, exponent) {
    return Math.pow(base, exponent);
  },

  square: function (n) {
    return n * n;
  },

  cube: function (n) {
    return n * n * n;
  },

  sqrt: function (n) {
    if (n < 0) {
      throw new Error("Cannot calculate square root of negative number");
    }
    return Math.sqrt(n);
  },
};
