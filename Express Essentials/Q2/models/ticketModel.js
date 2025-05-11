const fs = require('fs');
const path = './db.json';

function readData() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, '[]');
  return JSON.parse(fs.readFileSync(path));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };