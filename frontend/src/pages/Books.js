import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await axios.put(
        `http://localhost:5000/api/books/${editingId}`,
        formData
      );
      setEditingId(null);
    } else {
      // ADD
      await axios.post("http://localhost:5000/api/books", formData);
    }

    setFormData({
      title: "",
      author: "",
      isbn: "",
      quantity: ""
    });

    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      quantity: book.quantity
    });
    setEditingId(book._id);
  };

  return (
    <div>
      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </form>

      <div className="books-container">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Quantity:</strong> {book.quantity}</p>

            <div className="btn-group">
              <button
                className="edit-btn"
                onClick={() => handleEdit(book)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;