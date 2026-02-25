import { Link, useLocation, useNavigate } from "react-router-dom";
import { Btn } from "./UI";

function Navbar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activePage =
    location.pathname === "/issue" ? "issue" : "books";

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "var(--nav-h)",
        background: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 16px rgba(0,0,0,.25)"
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 34,
              height: 34,
              background: "var(--accent)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem"
            }}
          >
            📚
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              color: "#fff",
              fontWeight: 700
            }}
          >
            LibraryMS
          </span>
        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: 16 }}>
          <Link
            to="/"
            style={{
              color:
                activePage === "books"
                  ? "var(--accent)"
                  : "rgba(255,255,255,.7)",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            📖 Books
          </Link>

          <Link
            to="/issue"
            style={{
              color:
                activePage === "issue"
                  ? "var(--accent)"
                  : "rgba(255,255,255,.7)",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            🔄 Issue & Return
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "var(--accent)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: ".8rem",
            fontWeight: 700
          }}
        >
          LB
        </div>

        <Btn
          variant="outline"
          size="sm"
          style={{
            color: "rgba(255,255,255,.85)",
            borderColor: "rgba(255,255,255,.25)"
          }}
          onClick={handleLogout}
        >
          ⎋ Logout
        </Btn>
      </div>
    </nav>
  );
}

export default Navbar;