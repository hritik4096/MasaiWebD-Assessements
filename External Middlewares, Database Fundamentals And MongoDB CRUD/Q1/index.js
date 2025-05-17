const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");

app.use(express.json());
app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
