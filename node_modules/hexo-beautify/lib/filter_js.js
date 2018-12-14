'use strict';
var beautifyJs = require('js-beautify');
var minimatch = require('minimatch');
var defaults = {
    types: ['js'],
    exclude: [],
    js: {
      'indent_size': 2,
      'indent_char': ' ',
      'eol': '\n',
      'indent_level': 0,
      'indent_with_tabs': false,
      'preserve_newlines': true,
      'max_preserve_newlines': 1,
      'jslint_happy': true,
      'space_after_anon_function': true,
      'brace_style': 'collapse',
      'keep_array_indentation': true,
      'keep_function_indentation': false,
      'space_before_conditional': true,
      'break_chained_methods': false,
      'eval_code': false,
      'unescape_strings': false,
      'wrap_line_length': 80,
      'wrap_attributes': 'auto',
      'wrap_attributes_indent_size': 2,
      'end_with_newline': true
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

  if (options.types.indexOf('js') != -1) {
    result = beautifyJs(str, options.js);
  } else {
    result = str;
  }

  return result;
};
