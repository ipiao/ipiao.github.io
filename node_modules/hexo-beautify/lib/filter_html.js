'use strict';
var beautifyHtml = require('js-beautify')
  .html;
var minimatch = require('minimatch');
var defaults = {
    types: ['html'],
    exclude: [],
    html: {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'brace_style': 'collapse',
      'indent_scripts': 'normal',
      'wrap_line_length': 80,
      'wrap_attributes': 'auto',
      'wrap_attributes_indent_size': 80,
      'preserve_newlines': true,
      'max_preserve_newlines': 1,
      'unformatted': [],
      'end_with_newline': true,
      'extra_liners': false
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

  if (options.types.indexOf('html') != -1) {
    result = beautifyHtml(str, options.html);
  } else {
    result = str;
  }

  return result;
};
