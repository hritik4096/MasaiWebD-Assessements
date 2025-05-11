const { getBooks, saveBooks } = require("../models/bookModel");
const transactionLogger = require("../middlewares/transactionLogger");

const getAvailableBooks = (req, res) => {
  const books = getBooks();
  const availableBooks = books.filter((b) => b.status === "available");
  res.json(availableBooks);
};

const borrowBook = (req, res) => {
  const { id } = req.params;
  const { readerName } = req.body;
  const books = getBooks();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (book.status === "borrowed") {
    return res.status(400).json({ error: "Book is already borrowed" });
  }

  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString();

  saveBooks(books);
  transactionLogger("borrowed", readerName, book.title);

  res.json(book);
};

const returnBook = (req, res) => {
  const { id } = req.params;
  const books = getBooks();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  book.status = "available";
  book.borrowedBy = null;
  book.borrowedDate = null;

  saveBooks(books);
  transactionLogger("returned", book.borrowedBy, book.title);

  res.json(book);
};

module.exports = { getAvailableBooks, borrowBook, returnBook };
