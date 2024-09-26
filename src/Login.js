import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text();

      if (data === "authenticated") {
        navigate("/contribute", { state: { username } });  // Navigating to '/contribute' page with username as state
      } else {
        setError("Invalid username or password");
      }
    } catch (e) {
      console.error(e);
      setError("Login failed");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
