import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Btn, Badge, FormGroup, Card } from "../components/UI";

function Books({ onLogout }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  // 🔐 Fetch Books
  const fetchBooks = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/books${search ? `?search=${search}` : ""
        }`
      );
      setBooks(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }, [search]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // 📝 Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ➕ Add / Update Book
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/books/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/books`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      setFormData({
        title: "",
        author: "",
        isbn: "",
        quantity: ""
      });

      setEditingId(null);
      setShowForm(false);
      fetchBooks();

    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchBooks();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      quantity: book.quantity
    });
    setEditingId(book._id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      title: "",
      author: "",
      isbn: "",
      quantity: ""
    });
  };

  const spineColors = [
    "#8b4513",
    "#2d5a8b",
    "#4a7c3f",
    "#7b3d8c",
    "#c46a20",
    "#2d6b6b"
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar onLogout={onLogout} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2>Library Books</h2>
            <p style={{ color: "var(--muted)" }}>
              {books.length} book{books.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Btn onClick={() => {
            if (showForm) {
              handleCancel();   // If already open → close it
            } else {
              setShowForm(true);  // If closed → open it
            }
          }}>
            {showForm ? "Cancel" : "+ Add Book"}
          </Btn>
        </div>

        {showForm && (
          <Card animate style={{ padding: 28, marginBottom: 28 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <FormGroup label="Title">
                  <input name="title" value={formData.title} onChange={handleChange} required />
                </FormGroup>

                <FormGroup label="Author">
                  <input name="author" value={formData.author} onChange={handleChange} required />
                </FormGroup>

                <FormGroup label="ISBN">
                  <input name="isbn" value={formData.isbn} onChange={handleChange} required />
                </FormGroup>

                <FormGroup label="Quantity">
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </FormGroup>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <Btn type="submit">
                  {editingId ? "Update Book" : "Add Book"}
                </Btn>

                <Btn variant="outline" type="button" onClick={handleCancel}>
                  Cancel
                </Btn>
              </div>
            </form>
          </Card>
        )}

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 24, maxWidth: 400 }}
        />

        <Card animate>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--primary)", color: "#fff" }}>
                <th style={{ padding: 12 }}></th>
                <th style={{ padding: 12 }}>Title</th>
                <th style={{ padding: 12 }}>Author</th>
                <th style={{ padding: 12 }}>ISBN</th>
                <th style={{ padding: 12 }}>Qty</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, i) => (
                <tr key={book._id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: 12 }}>
                    <div style={{
                      width: 30,
                      height: 45,
                      background: spineColors[i % spineColors.length],
                      borderRadius: 4
                    }} />
                  </td>

                  <td style={{ padding: 12 }}>{book.title}</td>
                  <td style={{ padding: 12 }}>{book.author}</td>
                  <td style={{ padding: 12 }}>{book.isbn}</td>
                  <td style={{ padding: 12 }}>{book.quantity}</td>

                  <td style={{ padding: 12 }}>
                    {book.quantity > 3 ? (
                      <Badge color="green">Available</Badge>
                    ) : book.quantity > 0 ? (
                      <Badge color="amber">Low</Badge>
                    ) : (
                      <Badge color="red">Out</Badge>
                    )}
                  </td>

                  <td style={{ padding: 12 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn variant="secondary" size="sm" onClick={() => handleEdit(book)}>
                        Edit
                      </Btn>

                      <Btn variant="danger" size="sm" onClick={() => handleDelete(book._id)}>
                        Delete
                      </Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default Books;