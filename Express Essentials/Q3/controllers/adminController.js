const { getBooks, saveBooks } = require("../models/bookModel");

const addBook = (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const books = getBooks();
  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    publishedYear,
    status: "available",
    borrowedBy: null,
    borrowedDate: null,
  };

  books.push(newBook);
  saveBooks(books);

  res.status(201).json(newBook);
};

const getAllBooks = (req, res) => {
  const books = getBooks();
  res.json(books);
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publishedYear } = req.body;
  const books = getBooks();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  book.title = title || book.title;
  book.author = author || book.author;
  book.genre = genre || book.genre;
  book.publishedYear = publishedYear || book.publishedYear;

  saveBooks(books);

  res.json(book);
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  const books = getBooks();
  const bookIndex = books.findIndex((b) => b.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);
  saveBooks(books);

  res.status(204).send();
};

module.exports = { addBook, getAllBooks, updateBook, deleteBook };
