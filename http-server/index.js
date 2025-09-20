const http = require('node:http');

const PORT = 8000;

const server = http.createServer(function (req, res) {
  console.log(`Incoming request at: [${Date.now()}]`);
  console.log('Request url: ', req.url);

  switch (req.url) {
    case '/':
      res.writeHead(200);
      return res.end(`Homepage`);

    case '/contact-us':
      res.writeHead(200);
      return res.end(`Contact me at: kimamovic21@email.com`);

    case '/about':
      res.writeHead(200);
      return res.end(`I am a developer`);

    default:
      res.writeHead(404);
      res.end(`You are lost...`);
  };
});

server.listen(PORT, function () {
  console.log(`HTTP server is up and running on port ${PORT}`);
});