import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null); // Track hovered link

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <div style={navbarStyle}>
      <Link
        to="/"
        style={{
          ...logoStyle,
          ...(hoveredLink === "logo" ? logoHoverStyle : {}),
        }}
        onMouseEnter={() => setHoveredLink("logo")}
        onMouseLeave={() => setHoveredLink(null)}
      >
        ShareBite
      </Link>
      <div style={linksContainer}>
        <Link
          to="/"
          style={{
            ...linkStyle,
            ...(hoveredLink === "home" ? linkHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredLink("home")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Home
        </Link>
        <Link
          to="/create-recipe"
          style={{
            ...linkStyle,
            ...(hoveredLink === "create" ? linkHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredLink("create")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Create Recipe
        </Link>
        <Link
          to="/saved-recipes"
          style={{
            ...linkStyle,
            ...(hoveredLink === "saved" ? linkHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredLink("saved")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Saved Recipes
        </Link>
        {!cookies.access_token ? (
          <Link
            to="/auth"
            style={{
              ...linkStyle,
              ...(hoveredLink === "auth" ? linkHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredLink("auth")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Login/Register
          </Link>
        ) : (
          <button
            onClick={logout}
            style={{
              ...buttonStyle,
              ...(hoveredLink === "logout" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredLink("logout")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Logout
          </button>
        )}
      </div>
      <div style={searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            ...searchStyle,
            ...(hoveredLink === "search" ? searchHoverStyle : {}),
          }}
          onMouseEnter={() => setHoveredLink("search")}
          onMouseLeave={() => setHoveredLink(null)}
        />
      </div>
    </div>
  );
};

// Styles
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#2c3e50",
  padding: "10px 20px",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "60px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
};

const logoStyle = {
  color: "#fff",
  fontFamily: "'Pacifico', cursive", // Note: Add this font via Google Fonts in your index.html
  fontSize: "24px",
  textDecoration: "none",
  fontWeight: "bold",
  letterSpacing: "1px",
  transition: "all 0.3s ease",
};

const logoHoverStyle = {
  color: "#ecf0f1",
  transform: "translateY(-2px)",
};

const linksContainer = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const linkStyle = {
  color: "#ecf0f1",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  padding: "6px 12px",
  borderRadius: "4px",
  transition: "all 0.3s ease",
};

const linkHoverStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  transform: "translateY(-2px)",
};

const buttonStyle = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.3s ease",
};

const buttonHoverStyle = {
  backgroundColor: "#c0392b",
  transform: "translateY(-2px)",
};

const searchContainer = {
  display: "flex",
  alignItems: "center",
};

const searchStyle = {
  padding: "6px 12px",
  borderRadius: "20px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#34495e",
  color: "#ecf0f1",
  width: "200px",
  transition: "all 0.3s ease",
};

const searchHoverStyle = {
  boxShadow: "0 0 5px rgba(236, 240, 241, 0.5)",
};
