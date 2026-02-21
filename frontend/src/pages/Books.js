import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
function Books({onLogout}) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: ""
  });
  const [editingId, setEditingId] = useState(null);

  // 🔐 Set Token Automatically for All Requests
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  // 📚 Load Books (with search)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/books${
            search ? `?search=${search}` : ""
          }`
        );
        setBooks(res.data);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Fetch Books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
  // Add or Update Book
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // Delete Book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // Edit Book
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
    
    <div style={{ padding: "20px" }}>
      <Navbar onLogout={onLogout} />
      
      <h2>Library Books</h2>

      <input
        type="text"
        placeholder="Search by title, author, isbn..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {books.map((book) => (
        <div key={book._id}>
          <h4>{book.title}</h4>
          <p>Author: {book.author}</p>
          <p>Quantity: {book.quantity}</p>
          <p>ISBN: {book.isbn}</p>

          <button onClick={() => handleEdit(book)}>Edit</button>
          <button onClick={() => handleDelete(book._id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Books;