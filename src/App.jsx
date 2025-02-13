import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navigation";
import DogFeed from "./components/DogFeed";
import FavoritesList from "./components/FavoritesList";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? (
            <>
              <Dashboard />
              <DogFeed />
            </>
          ) : (
            <Login />
          )}
        />
        <Route path="/favorites" element={user ? <FavoritesList /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
