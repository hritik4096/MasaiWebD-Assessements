const fs = require("fs");
const path = require("path");

const getBooks = () => {
  return JSON.parse(fs.readFileSync("db.json"));
};

const saveBooks = (books) => {
  fs.writeFileSync("db.json", JSON.stringify(books, null, 2));
};

module.exports = { getBooks, saveBooks };
