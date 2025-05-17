const Library = require("../models/library.model");

const validateData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ message: "Incomplete Data" });
  next();
};

const borrowLimitCheck = async (req, res, next) => {
  const { borrowerName } = req.body;
  const borrowed = await Library.find({ borrowerName, status: "borrowed" });
  if (borrowed.length >= 3) return res.status(409).json({ message: "Borrow limit exceeded (3 books max)" });
  next();
};

const overdueCheck = async (req, res, next) => {
  const book = await Library.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  req.book = book;
  next();
};

module.exports = { validateData, borrowLimitCheck, overdueCheck };
