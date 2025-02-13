import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";

const Authentication = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      login(name, email);
      navigate("/"); // Redirect after login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
