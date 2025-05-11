const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const getBooks = () => {
  const data = fs.readFileSync('db.json', 'utf-8');
  return JSON.parse(data).books;
};

const saveBooks = (books) => {
  fs.writeFileSync('db.json', JSON.stringify({ books }, null, 2));
};

app.post('/books', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const books = getBooks();
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    year
  };

  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
});

app.get('/books', (req, res) => {
  const books = getBooks();
  res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  const books = getBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.status(200).json(book);
});

app.put('/books/:id', (req, res) => {
  const books = getBooks();
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  books[index] = { id: books[index].id, title, author, year };
  saveBooks(books);
  res.status(200).json(books[index]);
});

app.delete('/books/:id', (req, res) => {
  let books = getBooks();
  const filtered = books.filter(b => b.id !== parseInt(req.params.id));
  if (filtered.length === books.length) {
    return res.status(404).json({ error: 'Book not found' });
  }

  saveBooks(filtered);
  res.status(200).json({ message: 'Book deleted successfully' });
});

app.get('/books/search', (req, res) => {
  const { author, title } = req.query;
  const books = getBooks();

  let filtered = books;

  if (author) {
    filtered = filtered.filter(b =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    filtered = filtered.filter(b =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    return res.status(404).json({ message: 'No books found' });
  }

  res.status(200).json(filtered);
});

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
