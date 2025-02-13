import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navigation from "./components/Navigation";
import DogFeed from "./components/DogFeed/DogFeed";
import FavoritesList from "./components/FavoritesList/FavoritesList";
import Login from "./components/Login";


const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={user ? <DogFeed /> : <Login />} />
        <Route path="/favorites" element={user ? <FavoritesList /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
