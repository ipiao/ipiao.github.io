'use strict';
var beautifyCss = require('js-beautify')
  .css;
var minimatch = require('minimatch');
var defaults = {
  types: ['css'],
  exclude: [],
  css: {
    'indent_size': 2,
    'indent_char': ' ',
    'selector_separator_newline': false,
    'newline_between_rules': true
  }
};

module.exports = function (str, data) {
  var options = this.config.beautify ? this.config.beautify : defaults;
  var result;
  var path = data.path;
  var exclude = options.exclude;

  if (exclude && !Array.isArray(exclude)) exclude = [exclude];

  if (path && exclude && exclude.length) {
    for (var i = 0, len = exclude.length; i < len; i++) {
      if (minimatch(path, exclude[i])) return str;
    }
  }

  if (options.types.indexOf('css') != -1) {
    result = beautifyCss(str, options.css);
  } else {
    result = str;
  }

  return result;
};
