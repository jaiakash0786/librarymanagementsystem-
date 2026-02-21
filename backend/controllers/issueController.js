const Issue = require("../models/Issue");
const Book = require("../models/Book");

// Issue Book
exports.issueBook = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Create issue record
    const issue = await Issue.create({
      studentId,
      book: bookId
    });

    // Reduce book quantity
    book.quantity -= 1;
    await book.save();

    res.status(201).json(issue);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Return Book
exports.returnBook = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue record not found" });
    }

    if (issue.returned) {
      return res.status(400).json({ message: "Book already returned" });
    }

    // Mark returned
    issue.returned = true;
    await issue.save();

    // Increase book quantity
    const book = await Book.findById(issue.book);
    book.quantity += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all issued books
exports.getIssuedBooks = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};