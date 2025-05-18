const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/', userRoutes);
app.use('/', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
