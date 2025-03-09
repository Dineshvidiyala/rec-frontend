import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="navbar" style={navbarStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/create-recipe" style={linkStyle}>Create Recipe</Link>
      <Link to="/saved-recipes" style={linkStyle}>Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/auth" style={linkStyle}>Login/Register</Link>
      ) : (
        <button onClick={logout} style={buttonStyle}>Logout</button>
      )}
    </div>
  );
};

// Inline CSS styles for the navbar
const navbarStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#2c3e50", // Dark blue background for a modern look
  padding: "15px 20px",
  position: "fixed", // Fixes the navbar to the top of the page
  top: 0,
  left: 0,
  width: "100%", // Full width
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
  zIndex: 1000, // Ensures navbar stays above other content
};

const linkStyle = {
  color: "#ecf0f1", // Light gray/white for text
  textDecoration: "none", // Remove underline from links
  fontSize: "16px",
  fontWeight: "500",
  padding: "8px 15px",
  borderRadius: "5px",
  transition: "background-color 0.3s, color 0.3s", // Smooth hover transition
};

// Add hover effect using a pseudo-class (we'll simulate this with onMouseOver later if needed)
const buttonStyle = {
  backgroundColor: "#e74c3c", // Red for logout button
  color: "#fff", // White text
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "500",
  transition: "background-color 0.3s",
};

// You can add hover effects using a CSS file or a library like styled-components
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

// export const Navbar = () => {
//   const [cookies, setCookies] = useCookies(["access_token"]);
//   const navigate = useNavigate();

//   const logout = () => {
//     setCookies("access_token", "");
//     window.localStorage.clear();
//     navigate("/auth");
//   };
//   return (
//     <div className="navbar">
//       <Link to="/">Home</Link>
//       <Link to="/create-recipe">Create Recipe</Link>
//       <Link to="/saved-recipes">Saved Recipes</Link>
//       {!cookies.access_token ? (
//         <Link to="/auth">Login/Register</Link>
//       ) : (
//         <button onClick={logout}> Logout </button>
//       )}
//     </div>
//   );
// };
