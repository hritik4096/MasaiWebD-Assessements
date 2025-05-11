const express = require('express');
const ticketRoutes = require('./routes/ticketRoutes');
const app = express();
const fs = require('fs');
const PORT = 3000;

app.use(express.json());
app.use('/tickets', ticketRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
