import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => {
            logout();
            navigate("/");
          }}>
            Logout
          </button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
