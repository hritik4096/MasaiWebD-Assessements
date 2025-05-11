const fs = require("fs");

const returnCheckMiddleware = (req, res, next) => {
  const { id } = req.params;
  const books = JSON.parse(fs.readFileSync("db.json"));
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (book.status === "borrowed" && new Date() - new Date(book.borrowedDate) < 3 * 24 * 60 * 60 * 1000) {
    return res.status(400).json({ error: "Book cannot be returned within 3 days of borrowing." });
  }

  next();
};

module.exports = returnCheckMiddleware;
