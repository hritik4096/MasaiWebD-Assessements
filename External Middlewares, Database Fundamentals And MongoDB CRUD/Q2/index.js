const express = require("express");
const app = express();
const orderRoutes = require("./routes/orders");

app.use(express.json());
app.use("/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
