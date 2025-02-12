import { useAuth } from "../AuthContext";
import DogFeed from "./DogFeed";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
          <DogFeed />
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;