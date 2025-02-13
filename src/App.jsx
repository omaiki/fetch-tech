import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navigation from "./components/Navigation/Navigation";
import DogFeed from "./components/DogFeed/DogFeed";
import FavoritesList from "./components/FavoritesList/FavoritesList";
import Authentication from "./components/Authentication/Authentication";


const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={user ? <DogFeed /> : <Authentication />} />
        <Route path="/favorites" element={user ? <FavoritesList /> : <Authentication />} />
      </Routes>
    </Router>
  );
};

export default App;
