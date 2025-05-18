const express = require('express');
const connectDB = require('./db');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/', bookRoutes);
app.use('/', memberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
