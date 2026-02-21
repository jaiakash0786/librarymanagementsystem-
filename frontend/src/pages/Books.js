import React, { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Load Books
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const res = await axios.get(
        `http://localhost:5000/api/books${search ? `?search=${search}` : ""
        }`
      );
      setBooks(res.data);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add / Update Book
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/books/${editingId}`,
        formData
      );
      setEditingId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/books",
        formData
      );
    }

    setFormData({
      title: "",
      author: "",
      isbn: "",
      quantity: ""
    });

    fetchBooks();
  };

  // Delete Book
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  // Edit Book
  const handleEdit = (book) => {
    setFormData(book);
    setEditingId(book._id);
  };

  return (
    <div>
      <h2>Library Books</h2>
      <input
        type="text"
        placeholder="Search by title, author, isbn..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
        <input name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {books.map((book) => (
        <div key={book._id}>
          <h4>{book.title}</h4>
          <p>{book.author}</p>
          <p>{book.quantity}</p>
          <p>{book.isbn}</p>
          <button onClick={() => handleEdit(book)}>Edit</button>
          <button onClick={() => handleDelete(book._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Books;