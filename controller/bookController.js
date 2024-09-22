const { Book } = require("../models/bookModel");

const syncDatabase = async () => {
  try {
    await Book.sync();
    console.log("Book table exists or created successfully.");
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
};

syncDatabase();

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(201).json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBook = async (req, res) => {
  const { title, author, publishedDate } = req.body;
  if (!title || !author || !publishedDate || isNaN(Date.parse(publishedDate))) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  try {
    const book = await Book.create({ title, author, publishedDate });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
  const { title, author, publishedDate } = req.body;
  if (!title && !author && !publishedDate) {
    return res.status(400).json({ error: "No fields to update provided" });
  }
  if (publishedDate && isNaN(Date.parse(publishedDate))) {
    return res.status(400).json({ error: "Invalid published date" });
  }
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (title) book.title = title;
    if (author) book.author = author;
    if (publishedDate) book.publishedDate = publishedDate;

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    await book.destroy();
    res.status(201).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
