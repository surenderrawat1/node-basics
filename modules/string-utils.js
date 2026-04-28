/**
 * string-utils.js
 *
 * String utility functions
 */

module.exports = {
  reverse: function (str) {
    return str.split("").reverse().join("");
  },

  capitalize: function (str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  countChars: function (str) {
    return str.length;
  },

  countWords: function (str) {
    return str.trim().split(/\s+/).length;
  },

  toCamelCase: function (str) {
    return str
      .split(/[-_\s]+/)
      .map((word, i) => {
        if (i === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join("");
  },
};
