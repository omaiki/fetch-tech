import { useState } from "react";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors
  
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get backend error response
        throw new Error(`Login failed: ${errorText}`);
      }
  
      login(name, email); // Store user info in context
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
