import React from "react";
import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <div style={{
      padding: "15px",
      background: "#222",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "20px" }}>
          Books
        </Link>

        <Link to="/issue" style={{ color: "white" }}>
          Issue
        </Link>
      </div>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Navbar;