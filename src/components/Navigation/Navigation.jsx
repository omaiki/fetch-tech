import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css"; // Import styles

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        {user && <Link to="/favorites">Favorites</Link>}
      </div>

      <div className="nav-right">
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.name}!</span>
            <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
