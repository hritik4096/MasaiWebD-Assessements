const fs = require("fs");

const loggerMiddleware = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync("server.log", log);
  next();
};

module.exports = loggerMiddleware;
