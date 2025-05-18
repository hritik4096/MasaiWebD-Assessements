const Book = require('../models/Book');
const Member = require('../models/Member');

exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, status: 'available' });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { bookId, memberId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);
    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });
    if (book.status !== 'available') return res.status(400).json({ error: 'Book not available' });

    book.status = 'borrowed';
    if (!book.borrowers.includes(memberId)) book.borrowers.push(memberId);
    if (!member.borrowedBooks.includes(bookId)) member.borrowedBooks.push(bookId);

    await book.save();
    await member.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { bookId, memberId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);
    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });

    book.borrowers = book.borrowers.filter(b => b.toString() !== memberId);
    member.borrowedBooks = member.borrowedBooks.filter(b => b.toString() !== bookId);

    if (book.borrowers.length === 0) book.status = 'available';

    await book.save();
    await member.save();

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await Member.updateMany(
      { borrowedBooks: book._id },
      { $pull: { borrowedBooks: book._id } }
    );

    res.json({ message: 'Book deleted and removed from all members' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookBorrowers = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('borrowers');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
