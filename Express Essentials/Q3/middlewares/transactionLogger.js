const fs = require("fs");

const transactionLogger = (action, readerName, bookTitle) => {
  const log = `[${new Date().toISOString()}] ${readerName} ${action} "${bookTitle}"\n`;
  fs.appendFileSync("transactions.log", log);
};

module.exports = transactionLogger;
