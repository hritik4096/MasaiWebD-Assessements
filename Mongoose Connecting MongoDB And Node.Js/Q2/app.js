const express = require('express');
const app = express();
const taskRoutes = require('./routes/task.routes');

app.use(express.json());
app.use('/', taskRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
