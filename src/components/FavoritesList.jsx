import { useState, useEffect } from "react";
import "./FavoritesList.css"; // Import styles

const FavoritesList = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  return (
    <div className="favorites-container">
      <h2>Favorited Dogs</h2>
      {favorites.length === 0 ? (
        <p>No Favorites yet</p>
      ) : (
        <div className="dog-grid">
          {favorites.map((dog) => (
            <div key={dog.id} className="dog-card">
              <img src={dog.img || "https://via.placeholder.com/150"} alt={dog.name} />
              <h4>{dog.name}</h4>
              <p><strong>Breed:</strong> {dog.breed}</p>
              <p><strong>Age:</strong> {dog.age} years</p>
              <p><strong>Zip Code:</strong> {dog.zip_code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
