/**
 * greeting-pattern2.js
 *
 * Demonstrates: Exporting a single function
 * Use when your module has ONE main purpose
 */

module.exports = function greet(name) {
  return `Hello, ${name}! Welcome to Node.js 🚀`;
};

// You can also add properties to the function:
module.exports.version = "1.0.0";
