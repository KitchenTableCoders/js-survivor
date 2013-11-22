var s          = require('node-static'),
    fileServer = new(s.Server)('.'),
    path       = require('path'),
    url        = require('url'),
    fs         = require('fs'),
    net        = require('net');

function handleRequest(req, res){
  var pathname   = url.parse(req.url).pathname,
      components = pathname.split('/');
  
  if(pathname == '/') {
    fileServer.serveFile('/index.html', 200, {'Content-Type':'text/html'}, req, res);
  } else {
    fileServer.serve(req, res);
  }
}

var http = require('http');
http.createServer(handleRequest).listen(3000, "localhost");
console.log('Server running at 3000');
