const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const returnCheckMiddleware = require("./middlewares/returnCheckMiddleware");
const transactionLogger = require("./middlewares/transactionLogger");

app.use(loggerMiddleware);

const adminRoutes = require("./routes/adminRoutes");
const readerRoutes = require("./routes/readerRoutes");

app.use("/admin", adminRoutes);
app.use("/reader", readerRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
