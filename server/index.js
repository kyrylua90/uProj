var http = require('http'),
  fileServer = require('./fileServer'),
  config = require('../config/config.json'),
  appRoot = require('app-root-path'),
  path = require('path'),
  serverPort = config.port,
  host = config.host,
  publicFolder = config.public;

http.createServer(function (request, response) {
  var root = path.normalize(appRoot.path),
      file = [root, publicFolder, request.url].join('/');

  if (/\/[^.]*$/.test(request.url)) {
      file = path.join(appRoot.path, publicFolder, 'index.html');
  }
  
  fileServer(file, request, response);

}).listen(serverPort, host);

console.log('\x1b[33m%s\x1b[0m', 'Server running at ' + config.port + ':' + host);
