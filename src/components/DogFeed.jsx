import { useAuth } from "../AuthContext";
import { useState, useEffect } from "react";

const DogFeed = () => {
  const { user } = useAuth(); // login check 
  const API_BASE_URL = "https://frontend-take-home-service.fetch.com";
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return; // only fetch breeds if user is logged in 

    const fetchBreeds = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch breeds: ${response.statusText}`);
        }

        const data = await response.json();
        setBreeds(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBreeds();
  }, [user]); // only when user is present 

  return (
    <div>
      <h2>Dog Feed</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {breeds.map((breed) => (
          <li key={breed}>{breed}</li>
        ))}
      </ul>
    </div>
  );
};

export default DogFeed;
