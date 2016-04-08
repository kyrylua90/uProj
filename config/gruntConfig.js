(function () {
  'use strict';
  
  var config = require('./gruntConfig.json'),
      handler = require('./tools/resolveThis');
  
  config = handler(config);
  
  module.exports = config;
})();