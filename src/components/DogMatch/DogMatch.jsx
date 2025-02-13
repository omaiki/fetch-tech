import { useState } from "react";
import PropTypes from "prop-types";
import "./DogMatch.css";

const DogMatch = ({ favorites }) => {
  const [match, setMatch] = useState(null);

  // Pick rando dog from favorites - potentially add some preference or geolocation logic here in future 
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

DogMatch.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      zip_code: PropTypes.string.isRequired,
      img: PropTypes.string,
    })
  ),
};


DogMatch.defaultProps = {
  favorites: [],
};

export default DogMatch;
