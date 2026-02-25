import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Btn, Badge, FormGroup, Card } from "../components/UI";

const API = process.env.REACT_APP_API_URL;

function Issue({ onLogout }) {
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [issueError, setIssueError] = useState("");
  const [returnError, setReturnError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
    fetchIssues();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API}/api/books`);
      setBooks(res.data);
    } catch (error) {
      console.log("Failed to fetch books:", error.response?.data?.message);
    }
  };

  const fetchIssues = async () => {
    try {
      const res = await axios.get(`${API}/api/issues`);
      setIssues(res.data);
    } catch (error) {
      console.log("Failed to fetch issues:", error.response?.data?.message);
    }
  };

  const handleIssue = async (e) => {
    e.preventDefault();
    setIssueError("");

    try {
      await axios.post(
        `${API}/api/issues`,
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
    } catch (error) {
      setIssueError(
        error.response?.data?.message || "Failed to issue book. Please try again."
      );
    }
  };

  const handleReturn = async (id) => {
    setReturnError("");

    try {
      await axios.put(
        `${API}/api/issues/return/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchBooks();
      fetchIssues();
    } catch (error) {
      setReturnError(
        error.response?.data?.message || "Failed to return book. Please try again."
      );
    }
  };

  const filtered =
    activeTab === "all"
      ? issues
      : activeTab === "active"
        ? issues.filter((i) => !i.returned)
        : issues.filter((i) => i.returned);

  const activeCount = issues.filter((i) => !i.returned).length;

  const errorStyle = {
    background: "#fdeaea",
    border: "1px solid #f5c0c0",
    borderRadius: "var(--r-sm)",
    padding: "10px 14px",
    fontSize: ".85rem",
    color: "var(--danger)",
    marginBottom: 16
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar onLogout={onLogout} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "380px 1fr",
            gap: 28,
            alignItems: "start"
          }}
        >
          {/* LEFT SIDE FORM */}
          <div>
            <Card animate style={{ padding: 28 }}>
              <h3 style={{ marginBottom: 4 }}>📤 Issue a Book</h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: ".82rem",
                  marginBottom: 24
                }}
              >
                Fill in the details to issue a book
              </p>

              {issueError && (
                <div style={errorStyle}>⚠ {issueError}</div>
              )}

              <form onSubmit={handleIssue}>
                <FormGroup label="Student ID">
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup label="Select Book">
                  <select
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                  >
                    <option value="">Choose a book…</option>
                    {books.map((b) => (
                      <option
                        key={b._id}
                        value={b._id}
                        disabled={b.quantity === 0}
                      >
                        {b.title} (Qty: {b.quantity})
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <Btn
                  type="submit"
                  size="lg"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Issue Book
                </Btn>
              </form>
            </Card>

            {/* STATS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginTop: 16
              }}
            >
              <Card style={{ padding: 16 }}>
                <div>Total Issued</div>
                <h2>{issues.length}</h2>
              </Card>

              <Card style={{ padding: 16 }}>
                <div>Active Issues</div>
                <h2>{activeCount}</h2>
              </Card>
            </div>
          </div>

          {/* RIGHT SIDE TABLE */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20
              }}
            >
              <h2>Issued Books</h2>

              <div>
                {["all", "active", "returned"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      marginRight: 8,
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      background:
                        activeTab === tab
                          ? "var(--primary)"
                          : "var(--surface)",
                      color:
                        activeTab === tab
                          ? "#fff"
                          : "var(--muted)"
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {returnError && (
              <div style={errorStyle}>⚠ {returnError}</div>
            )}

            <Card animate>
              {filtered.length === 0 ? (
                <div style={{ padding: 40 }}>No records found</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--primary)", color: "#fff" }}>
                      <th style={{ padding: 12 }}>Student</th>
                      <th style={{ padding: 12 }}>Book</th>
                      <th style={{ padding: 12 }}>Date</th>
                      <th style={{ padding: 12 }}>Status</th>
                      <th style={{ padding: 12 }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((issue) => (
                      <tr
                        key={issue._id}
                        style={{
                          borderBottom: "1px solid var(--border)"
                        }}
                      >
                        <td style={{ padding: 12 }}>
                          {issue.studentId}
                        </td>

                        <td style={{ padding: 12 }}>
                          {issue.book?.title}
                        </td>

                        <td style={{ padding: 12 }}>
                          {new Date(issue.issueDate).toLocaleDateString()}
                        </td>

                        <td style={{ padding: 12 }}>
                          {issue.returned ? (
                            <Badge color="green">Returned</Badge>
                          ) : (
                            <Badge color="amber">Issued</Badge>
                          )}
                        </td>

                        <td style={{ padding: 12 }}>
                          {!issue.returned && (
                            <Btn
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                handleReturn(issue._id)
                              }
                            >
                              Return
                            </Btn>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Issue;