const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, addBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);
router.get("/", getBooks);


module.exports = router;
