import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user && <Link to="/favorites">Favorites</Link>}

      {user ? (
        <div className="nav-dashboard">
          <span>Welcome, {user.name}!</span>
          <button onClick={() => {
            logout();
            navigate("/");
          }}>
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </nav>
  );
};

export default Navigation;
