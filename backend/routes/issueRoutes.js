const express = require("express");
const router = express.Router();
const {
  issueBook,
  returnBook,
  getIssuedBooks
} = require("../controllers/issueController");

router.post("/", issueBook);
router.put("/return/:id", returnBook);
router.get("/", getIssuedBooks);

module.exports = router;