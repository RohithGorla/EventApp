import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "15px 40px",
        backgroundColor: "#222",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <h3 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Bellcorp Events
        </Link>
      </h3>

      {/* Right Side Links */}
      <div>
        {!token ? (
          <>
            <Link
              to="/login"
              style={{ color: "white", marginRight: "15px" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "white" }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* 👇 NEW: All Events Button */}
            <Link
              to="/"
              style={{ color: "white", marginRight: "15px" }}
            >
              All Events
            </Link>

            <Link
              to="/dashboard"
              style={{ color: "white", marginRight: "15px" }}
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "6px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}