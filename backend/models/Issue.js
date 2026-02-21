const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    returned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);