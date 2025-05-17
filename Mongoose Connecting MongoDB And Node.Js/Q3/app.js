const express = require("express");
const connectDB = require("./config/db");
const libraryRoutes = require("./routes/library.routes");

const app = express();
connectDB();

app.use(express.json());
app.use("/library", libraryRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
