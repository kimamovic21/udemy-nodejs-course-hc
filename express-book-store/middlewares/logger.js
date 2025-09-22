const fs = require('node:fs');

function loggerMiddleware(req, res, next) {
  const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFileSync('logs.txt', log, 'utf-8');
  next();
};

module.exports = loggerMiddleware;