import { useState, useEffect } from "react";
import PetFilter from "./PetFilter";
import "./DogFeed.css"; // Import styles

const DogFeed = () => {
  const API_BASE_URL = "https://frontend-take-home-service.fetch.com";
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]); // Holds full dog objects
  const [pagination, setPagination] = useState({ next: null, prev: null });
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: "",
    ageMax: "",
    sort: "breed:asc", // Default sorting
  });

  // Fetch all breeds on mount
  useEffect(() => {
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
  }, []);

  // Fetch dogs based on filters
  const fetchDogs = async (query = "") => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.breeds.length) queryParams.append("breeds", filters.breeds.join(","));
      if (filters.zipCodes.length) queryParams.append("zipCodes", filters.zipCodes.join(","));
      if (filters.ageMin) queryParams.append("ageMin", filters.ageMin);
      if (filters.ageMax) queryParams.append("ageMax", filters.ageMax);
      if (filters.sort) queryParams.append("sort", filters.sort);

      const response = await fetch(`${API_BASE_URL}/dogs/search?${queryParams.toString()}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dogs: ${response.statusText}`);
      }

      const data = await response.json();
      setPagination({ next: data.next, prev: data.prev });

      // Fetch full details using the dog IDs
      if (data.resultIds.length) {
        fetchDogDetails(data.resultIds);
      } else {
        setDogs([]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch full dog details using the IDs from /dogs/search
  const fetchDogDetails = async (dogIds) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dogIds),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dog details: ${response.statusText}`);
      }

      const data = await response.json();
      setDogs(data); // Store full dog objects
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle filter & sorting changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchDogs(); // Fetch updated dogs list
  };

  return (
    <div className="dog-feed-container">
      <h2>Dog Feed</h2>

      {error && <p className="error-message">{error}</p>}

      <PetFilter breeds={breeds} onFilterChange={handleFilterChange} />

      <h3>Results</h3>
      <div className="dog-grid">
        {dogs.map((dog) => (
          <div key={dog.id} className="dog-card">
            <img
              src={dog.img || "https://via.placeholder.com/150"}
              alt={dog.name}
            />
            <h4>{dog.name}</h4>
            <p><strong>Breed:</strong> {dog.breed}</p>
            <p><strong>Age:</strong> {dog.age} years</p>
            <p><strong>Zip Code:</strong> {dog.zip_code}</p>
          </div>
        ))}
      </div>

      <div className="pagination-buttons">
        {pagination.prev && <button onClick={() => fetchDogs(pagination.prev)}>Previous</button>}
        {pagination.next && <button onClick={() => fetchDogs(pagination.next)}>Next</button>}
      </div>
    </div>
  );
};

export default DogFeed;
