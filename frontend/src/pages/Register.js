import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Btn, FormGroup } from "../components/UI";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Client-side password validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData
      );

      setSuccess("Account created successfully! Redirecting to login…");

      setTimeout(() => {
        navigate("/login");
      }, 1800);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: 24
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          boxShadow: "var(--sh-lg)",
          animation: "fadeUp .5s ease both"
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            flex: 1,
            background:
              "linear-gradient(160deg, var(--primary) 0%, #4a3420 100%)",
            padding: "52px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <img
            src="/register-illustration.svg"
            alt="Register"
            style={{
              width: 220,
              marginBottom: 28,
              animation: "float 4s ease-in-out infinite"
            }}
          />

          <h2
            style={{
              color: "#fff",
              fontSize: "1.6rem",
              marginBottom: 12
            }}
          >
            Join Our Library
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: ".9rem",
              lineHeight: 1.75
            }}
          >
            Create your librarian account to start managing books,
            issuing records, and maintaining your collection with ease.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div
          style={{
            width: 420,
            background: "#fff",
            padding: "52px 40px"
          }}
        >
          <h2 style={{ marginBottom: 6, fontSize: "1.7rem" }}>
            Create Account
          </h2>

          <p
            style={{
              color: "var(--muted)",
              fontSize: ".875rem",
              marginBottom: 32
            }}
          >
            Fill in your details to get started
          </p>

          {/* Error Message */}
          {error && (
            <div
              style={{
                background: "#fdeaea",
                border: "1px solid #f5c0c0",
                borderRadius: "var(--r-sm)",
                padding: "10px 14px",
                fontSize: ".85rem",
                color: "var(--danger)",
                marginBottom: 20
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              style={{
                background: "#e6f4ec",
                border: "1px solid #a8d5b7",
                borderRadius: "var(--r-sm)",
                padding: "10px 14px",
                fontSize: ".85rem",
                color: "var(--success)",
                marginBottom: 20
              }}
            >
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <FormGroup label="Full Name">
              <input
                type="text"
                name="name"
                placeholder="John Smith"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup label="Email Address">
              <input
                type="email"
                name="email"
                placeholder="john@library.com"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup label="Password">
              <input
                type="password"
                name="password"
                placeholder="Min. 8 characters"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Btn
              type="submit"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 8
              }}
              size="lg"
              disabled={loading || !!success}
            >
              {loading ? "Creating account…" : "Create Account →"}
            </Btn>
          </form>

          <p
            style={{
              marginTop: 24,
              textAlign: "center",
              fontSize: ".875rem",
              color: "var(--muted)"
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;