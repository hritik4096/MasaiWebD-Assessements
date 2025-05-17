const Library = require("../models/library.model");

const addBook = async (req, res) => {
  try {
    const book = new Library({ ...req.body });
    await book.save();
    res.status(201).json({ message: "Book added", data: book });
  } catch {
    res.status(500).json({ message: "Failed to add book" });
  }
};

const getBooks = async (req, res) => {
  try {
    const { status, title } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (title) filter.title = new RegExp(title, "i");
    const books = await Library.find(filter);
    res.status(200).json(books);
  } catch {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

const borrowBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book || book.status !== "available") return res.status(409).json({ message: "Book not available" });

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    book.status = "borrowed";
    book.borrowerName = req.body.borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;
    await book.save();

    res.status(200).json({ message: "Book borrowed", data: book });
  } catch {
    res.status(500).json({ message: "Failed to borrow book" });
  }
};

const returnBook = async (req, res) => {
  try {
    const book = req.book;
    if (book.status !== "borrowed") return res.status(409).json({ message: "Book is not borrowed" });

    const returnDate = new Date();
    let overdueFees = 0;
    if (returnDate > book.dueDate) {
      const daysOverdue = Math.ceil((returnDate - book.dueDate) / (1000 * 60 * 60 * 24));
      overdueFees = daysOverdue * 10;
    }

    book.status = "available";
    book.returnDate = returnDate;
    book.overdueFees = overdueFees;
    await book.save();

    res.status(200).json({ message: "Book returned", overdueFees, data: book });
  } catch {
    res.status(500).json({ message: "Failed to return book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.status === "borrowed") return res.status(409).json({ message: "Cannot delete borrowed book" });

    await Library.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete book" });
  }
};

module.exports = { addBook, getBooks, borrowBook, returnBook, deleteBook };