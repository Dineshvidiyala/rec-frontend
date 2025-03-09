import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
      <style jsx>{`
        .auth {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          gap: 2rem;
          flex-wrap: wrap;
          padding: 2rem;
          margin-top: 70px; /* Added to push content below the navbar */
          box-sizing: border-box;
        }

        .auth-container {
          background: #ffffff;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .auth-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-family: 'Arial', sans-serif;
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          font-size: 1rem;
          color: #34495e;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #dcdcdc;
          border-radius: 8px;
          font-size: 1rem;
          color: #333;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        input:focus {
          border-color: #3498db;
          box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
          outline: none;
        }

        button {
          width: 100%;
          padding: 0.9rem;
          background: linear-gradient(to right, #3498db, #2980b9);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        button:hover {
          background: linear-gradient(to right, #2980b9, #2471a3);
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }
      `}</style>
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
      const result = await axios.post("https://mern-recipe-app1-server.onrender.com/auth/login", {
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
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
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
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};