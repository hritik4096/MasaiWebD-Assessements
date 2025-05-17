const express = require("express");
const router = express.Router();
const controller = require("../controllers/library.controller");
const middleware = require("../middleware/library.middleware");

router.post("/books", middleware.validateData, controller.addBook);
router.get("/books", controller.getBooks);
router.patch("/borrow/:id", middleware.borrowLimitCheck, controller.borrowBook);
router.patch("/return/:id", middleware.overdueCheck, controller.returnBook);
router.delete("/books/:id", controller.deleteBook);

module.exports = router;