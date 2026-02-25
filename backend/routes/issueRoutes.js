const express = require("express");
const router = express.Router();
const {
  issueBook,
  returnBook,
  getIssuedBooks
} = require("../controllers/issueController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, issueBook);
router.put("/return/:id", protect, returnBook);
router.get("/", getIssuedBooks);

module.exports = router;