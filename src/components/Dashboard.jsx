import { useAuth } from "../AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;