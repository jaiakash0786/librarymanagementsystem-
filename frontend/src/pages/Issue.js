import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
function Issue({onLogout}) {
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
    fetchIssues();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const fetchIssues = async () => {
    const res = await axios.get("http://localhost:5000/api/issues");
    setIssues(res.data);
  };

  const handleIssue = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/issues",
      { studentId, bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setStudentId("");
    setBookId("");
    fetchBooks();
    fetchIssues();
  };

  const handleReturn = async (id) => {
    await axios.put(
      `http://localhost:5000/api/issues/return/${id}`
    );

    fetchBooks();
    fetchIssues();
  };

  return (
    <div style={{ padding: "40px" }}>
      <Navbar onLogout={onLogout} />
      <h2>Issue Book</h2>

      <form onSubmit={handleIssue}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />

        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title} (Qty: {book.quantity})
            </option>
          ))}
        </select>

        <button type="submit">Issue</button>
      </form>

      <hr />

      <h2>Issued Books</h2>

      {issues.map((issue) => (
        <div key={issue._id}>
          <p>
            Student: {issue.studentId} | Book: {issue.book?.title}
          </p>

          {!issue.returned && (
            <button onClick={() => handleReturn(issue._id)}>
              Return
            </button>
          )}

          {issue.returned && <span>Returned</span>}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Issue;