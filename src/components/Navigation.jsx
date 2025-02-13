import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user && <Link to="/favorites">Favorites</Link>}
    </nav>
  );
};

export default Navigation;