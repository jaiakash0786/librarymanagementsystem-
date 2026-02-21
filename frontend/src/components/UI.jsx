
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #f5f0e8;
      --surface:   #ffffff;
      --primary:   #2d2013;
      --secondary: #6b4c2a;
      --accent:    #c8861f;
      --accent-lt: #f2ddb0;
      --success:   #2d7a4f;
      --danger:    #b83232;
      --border:    #ddd4c0;
      --text:      #251c10;
      --muted:     #8c7d68;
      --sidebar-w: 240px;
      --nav-h:     64px;
      --r-sm: 8px;
      --r-md: 14px;
      --r-lg: 22px;
      --r-full: 9999px;
      --sh-sm: 0 1px 4px rgba(45,32,19,.08);
      --sh-md: 0 4px 20px rgba(45,32,19,.13);
      --sh-lg: 0 12px 48px rgba(45,32,19,.18);
      --t: all .22s cubic-bezier(.4,0,.2,1);
    }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }

    h1,h2,h3,h4 { font-family: 'Playfair Display', Georgia, serif; color: var(--primary); line-height: 1.25; }
    h1 { font-size: 2.1rem; }
    h2 { font-size: 1.6rem; }
    h3 { font-size: 1.2rem; }

    a { color: var(--accent); text-decoration: none; transition: var(--t); }
    a:hover { color: var(--secondary); }

    input, select, textarea {
      font-family: 'DM Sans', sans-serif;
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid var(--border);
      border-radius: var(--r-sm);
      background: var(--bg);
      font-size: .9rem;
      color: var(--text);
      outline: none;
      transition: var(--t);
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--accent);
      background: #fff;
      box-shadow: 0 0 0 3px rgba(200,134,31,.14);
    }
    input::placeholder { color: var(--muted); }

    button { font-family: 'DM Sans', sans-serif; cursor: pointer; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-7px); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
  `}</style>
);

// ─── SHARED BUTTON ────────────────────────────────────────────
const Btn = ({ children, variant = "primary", size = "md", style: s = {}, ...props }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    border: "none", borderRadius: "var(--r-sm)",
    fontWeight: 600, letterSpacing: ".02em", transition: "var(--t)",
    cursor: "pointer", whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { padding: "6px 12px", fontSize: ".78rem" },
    md: { padding: "10px 20px", fontSize: ".875rem" },
    lg: { padding: "13px 28px", fontSize: "1rem" },
  };
  const variants = {
    primary:   { background: "var(--accent)", color: "#fff" },
    secondary: { background: "var(--accent-lt)", color: "var(--secondary)" },
    danger:    { background: "var(--danger)", color: "#fff" },
    outline:   { background: "transparent", color: "var(--primary)", border: "1.5px solid var(--border)" },
    ghost:     { background: "transparent", color: "var(--muted)", border: "none" },
  };
  return (
    <button
      style={{ ...base, ...sizes[size], ...variants[variant], ...s }}
      onMouseEnter={e => {
        if (variant === "primary") { e.currentTarget.style.background = "#a96d10"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(200,134,31,.35)"; }
        if (variant === "danger")  { e.currentTarget.style.background = "#932828"; }
        if (variant === "outline") { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }
      }}
      onMouseLeave={e => {
        if (variant === "primary") { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }
        if (variant === "danger")  { e.currentTarget.style.background = "var(--danger)"; }
        if (variant === "outline") { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--primary)"; }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// ─── BADGE ────────────────────────────────────────────────────
const Badge = ({ children, color = "green" }) => {
  const colors = {
    green:  { bg: "#e6f4ec", text: "#2d7a4f" },
    red:    { bg: "#fdeaea", text: "#b83232" },
    amber:  { bg: "var(--accent-lt)", text: "var(--secondary)" },
    gray:   { bg: "#ede9e3", text: "var(--muted)" },
  };
  const c = colors[color];
  return (
    <span style={{
      background: c.bg, color: c.text,
      fontSize: ".68rem", fontWeight: 700, letterSpacing: ".07em",
      textTransform: "uppercase", padding: "3px 10px",
      borderRadius: "var(--r-full)", display: "inline-block",
    }}>
      {children}
    </span>
  );
};

// ─── FORM GROUP ───────────────────────────────────────────────
const FormGroup = ({ label, children, style: s = {} }) => (
  <div style={{ marginBottom: 18, ...s }}>
    {label && <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--primary)", marginBottom: 6, letterSpacing: ".02em" }}>{label}</label>}
    {children}
  </div>
);

// ─── CARD ─────────────────────────────────────────────────────
const Card = ({ children, style: s = {}, animate = false }) => (
  <div style={{
    background: "var(--surface)", borderRadius: "var(--r-md)",
    border: "1px solid var(--border)", boxShadow: "var(--sh-sm)",
    ...(animate ? { animation: "fadeUp .4s ease both" } : {}),
    ...s,
  }}>
    {children}
  </div>
);

// ─── DIVIDER ──────────────────────────────────────────────────
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "20px 0" }} />;
export {
  GlobalStyle,
  Btn,
  Badge,
  FormGroup,
  Card,
  Divider
};