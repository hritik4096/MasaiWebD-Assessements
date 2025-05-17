const express = require("express");
const app = express();
const recipeRoutes = require("./routes/recipes");

app.use(express.json());
app.use("/recipes", recipeRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
