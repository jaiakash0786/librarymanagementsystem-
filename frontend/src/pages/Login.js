import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Btn, FormGroup } from "../components/UI";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // Pass token to App.js
      onLogin(res.data.token);

    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>

      {/* LEFT PANEL */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(145deg, var(--primary) 0%, var(--secondary) 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Illustration (public folder) */}
        <img
          src="/library-illustration.svg"
          alt="Library"
          style={{
            width: 280,
            marginBottom: 32,
            filter: "drop-shadow(0 16px 32px rgba(0,0,0,.25))",
            animation: "float 4s ease-in-out infinite"
          }}
        />

        <h2
          style={{
            color: "#fff",
            fontSize: "1.7rem",
            textAlign: "center",
            marginBottom: 12
          }}
        >
          Welcome to LibraryMS
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,.65)",
            textAlign: "center",
            fontSize: ".95rem",
            lineHeight: 1.7,
            maxWidth: 300
          }}
        >
          Your complete library management solution.
        </p>
      </div>

      {/* RIGHT FORM PANEL */}
      <div
        style={{
          width: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 48px"
        }}
      >
        <div style={{ width: "100%", maxWidth: 360 }}>

          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 36
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                background: "var(--primary)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem"
              }}
            >
              📚
            </div>

            <span
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--primary)"
              }}
            >
              LibraryMS
            </span>
          </div>

          <h2 style={{ fontSize: "1.7rem", marginBottom: 6 }}>
            Librarian Login
          </h2>

          <p
            style={{
              color: "var(--muted)",
              fontSize: ".875rem",
              marginBottom: 32
            }}
          >
            Sign in to manage your library
          </p>

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

          <form onSubmit={handleLogin}>
            <FormGroup label="Email Address">
              <input
                type="email"
                placeholder="librarian@library.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup label="Password">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In →"}
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
            Don't have an account?{" "}
            <Link to="/register" style={{ fontWeight: 600 }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;