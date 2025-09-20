const http = require('node:http');

const PORT = 8000;

const server = http.createServer(function (req, res) {
  console.log('I got an incoming request');

  res.writeHead(200);
  res.end('Thanks for visiting my server');
});

server.listen(PORT, function () {
  console.log(`HTTP server is up and running on port ${PORT}`);
});