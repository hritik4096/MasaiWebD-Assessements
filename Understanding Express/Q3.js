const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const getDishes = () => {
  const data = fs.readFileSync('db.json', 'utf-8');
  return JSON.parse(data).dishes;
};

const saveDishes = (dishes) => {
  fs.writeFileSync('db.json', JSON.stringify({ dishes }, null, 2));
};

app.post('/dishes', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const dishes = getDishes();
  const newDish = {
    id: dishes.length ? dishes[dishes.length - 1].id + 1 : 1,
    name,
    price,
    category
  };

  dishes.push(newDish);
  saveDishes(dishes);
  res.status(201).json(newDish);
});

app.get('/dishes', (req, res) => {
  const dishes = getDishes();
  res.status(200).json(dishes);
});

app.get('/dishes/:id', (req, res) => {
  const dishes = getDishes();
  const dish = dishes.find(d => d.id === parseInt(req.params.id));
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  res.status(200).json(dish);
});

app.put('/dishes/:id', (req, res) => {
  const dishes = getDishes();
  const index = dishes.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Dish not found' });

  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  dishes[index] = { id: dishes[index].id, name, price, category };
  saveDishes(dishes);
  res.status(200).json(dishes[index]);
});

app.delete('/dishes/:id', (req, res) => {
  let dishes = getDishes();
  const filtered = dishes.filter(d => d.id !== parseInt(req.params.id));
  if (filtered.length === dishes.length) {
    return res.status(404).json({ error: 'Dish not found' });
  }
  saveDishes(filtered);
  res.status(200).json({ message: 'Dish deleted successfully' });
});

app.get('/dishes/get', (req, res) => {
  const nameQuery = req.query.name;
  if (!nameQuery) return res.status(400).json({ error: 'Name query missing' });

  const dishes = getDishes();
  const results = dishes.filter(d => d.name.toLowerCase().includes(nameQuery.toLowerCase()));

  if (results.length === 0) {
    return res.status(404).json({ message: 'No dishes found' });
  }

  res.status(200).json(results);
});

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
