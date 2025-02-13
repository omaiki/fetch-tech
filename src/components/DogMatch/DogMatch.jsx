import { useState } from "react";
import "./DogMatch.css";

const DogMatch = ({ favorites }) => {
  const [match, setMatch] = useState(null);

  // Pick rando dog from favorites - let's add some preference or geolocation logic here later 
  const findMatch = () => {
    if (favorites.length === 0) return;
    const randomIndex = Math.floor(Math.random() * favorites.length);
    setMatch(favorites[randomIndex]);
  };

  return (
    <div className="dog-match-container">
      <h3>Your Perfect Match</h3>
      {match ? (
        <div className="dog-card">
          <img src={match.img || "https://via.placeholder.com/150"} alt={match.name} />
          <h4>{match.name}</h4>
          <p><strong>Breed:</strong> {match.breed}</p>
          <p><strong>Age:</strong> {match.age} years</p>
          <p><strong>Zip Code:</strong> {match.zip_code}</p>
        </div>
      ) : (
        <p>Click below to find your match!</p>
      )}
      <button onClick={findMatch} className="match-btn">Find Match</button>
    </div>
  );
};

export default DogMatch;
