import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div style={authStyle}>
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("https://rec-server-backend.onrender.com/auth/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={authContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Login</h2>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://rec-backend-2-h0ge.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={authContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Register</h2>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
};

// Inline styles
const authStyle = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  marginTop: "70px", // Push content below fixed navbar
  boxSizing: "border-box",
  width: "100%",
  padding: "2rem",
};

const authContainerStyle = {
  background: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  padding: "2rem",
  width: "50%", // Each takes half the width
  maxWidth: "500px", // Slightly wider for better spacing
  margin: "0 auto", // Center within its half
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const headingStyle = {
  textAlign: "center",
  color: "#2c3e50",
  marginBottom: "1.5rem",
  fontFamily: "'Arial', sans-serif",
  fontSize: "2rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const formGroupStyle = {
  marginBottom: "1.5rem",
};

const labelStyle = {
  display: "block",
  fontSize: "1rem",
  color: "#34495e",
  marginBottom: "0.5rem",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "2px solid #dcdcdc",
  borderRadius: "8px",
  fontSize: "1rem",
  color: "#333",
};

const buttonStyle = {
  width: "100%",
  padding: "0.9rem",
  background: "linear-gradient(to right, #3498db, #2980b9)",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontSize: "1.1rem",
  fontWeight: "bold",
  cursor: "pointer",
};
