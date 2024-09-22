const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

router
  .get("/books", getAllBooks)
  .get("/books/:id", getBookById)
  .post("/books", createBook)
  .put("/books/:id", updateBook)
  .delete("/books/:id", deleteBook);

module.exports = router;
