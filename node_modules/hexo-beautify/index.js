'use strict';

hexo.extend.filter.register('after_render:html', require('./lib/filter_html'));
hexo.extend.filter.register('after_render:css', require('./lib/filter_css'));
hexo.extend.filter.register('after_render:js', require('./lib/filter_js'));
