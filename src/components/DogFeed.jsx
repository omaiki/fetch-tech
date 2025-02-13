import { useState, useEffect } from "react";
import PetFilter from "./PetFilter";
import "./DogFeed.css";

const DogFeed = () => {
  const API_BASE_URL = "https://frontend-take-home-service.fetch.com";
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]); // Holds full dog objects
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [pagination, setPagination] = useState({ next: null, prev: null });
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: "",
    ageMax: "",
    sort: "breed:asc",
    size: 25, // Default page size
  });
  const [totalResults, setTotalResults] = useState(0); // Total number of dogs
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page

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

  useEffect(() => {
    setCurrentPage(1);
    fetchDogs();
  }, [filters]);

  const fetchDogs = async (pageUrl = null) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.breeds.length)
        queryParams.append("breeds", filters.breeds.join(","));
      if (filters.zipCodes.length)
        queryParams.append("zipCodes", filters.zipCodes.join(","));
      if (filters.ageMin) queryParams.append("ageMin", filters.ageMin);
      if (filters.ageMax) queryParams.append("ageMax", filters.ageMax);
      if (filters.sort) queryParams.append("sort", filters.sort);
      if (filters.size) queryParams.append("size", filters.size);

      const url = pageUrl
        ? `${API_BASE_URL}${pageUrl}`
        : `${API_BASE_URL}/dogs/search?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dogs: ${response.statusText}`);
      }

      const data = await response.json();
      setPagination({ next: data.next, prev: data.prev });
      setTotalResults(data.total);

      if (data.resultIds.length) {
        fetchDogDetails(data.resultIds);
      } else {
        setDogs([]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchDogDetails = async (dogIds) => {
    if (!dogIds || dogIds.length === 0) return;

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
      setDogs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleFavorite = (dog) => {
    let updatedFavorites = favorites.some((fav) => fav.id === dog.id)
      ? favorites.filter((fav) => fav.id !== dog.id)
      : [...favorites, dog];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const totalPages = Math.ceil(totalResults / filters.size) || 1;

  return (
    <div className="dog-feed-container">
      <h2>Dog Feed</h2>
      {error && <p className="error-message">{error}</p>}

      <PetFilter breeds={breeds} onFilterChange={setFilters} />

      <div className="pagination-buttons">
        {pagination.prev && (
          <button
            onClick={() => {
              fetchDogs(pagination.prev);
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
          >
            Previous
          </button>
        )}
        <span>
          Page {currentPage} of {totalPages} ({totalResults} results)
        </span>
        {pagination.next && (
          <button
            onClick={() => {
              fetchDogs(pagination.next);
              setCurrentPage((prev) => prev + 1);
            }}
          >
            Next
          </button>
        )}
      </div>

      <div className="dog-grid">
        {dogs.map((dog) => (
          <div key={dog.id} className="dog-card">
            <img
              src={dog.img || "https://via.placeholder.com/150"}
              alt={dog.name}
            />
            <h4>{dog.name}</h4>
            <p>
              <strong>Breed:</strong> {dog.breed}
            </p>
            <p>
              <strong>Age:</strong> {dog.age} years
            </p>
            <p>
              <strong>Zip Code:</strong> {dog.zip_code}
            </p>
            <button
              className={`favorite-btn ${
                favorites.some((fav) => fav.id === dog.id) ? "favorited" : ""
              }`}
              onClick={() => toggleFavorite(dog)}
            >
              <span className="heart-icon"></span>
              {favorites.some((fav) => fav.id === dog.id)
                ? "Unfavorite"
                : "Favorite"}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination-buttons">
        {pagination.prev && (
          <button
            onClick={() => {
              fetchDogs(pagination.prev);
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
          >
            Previous
          </button>
        )}
        <span>
          Page {currentPage} of {totalPages} ({totalResults} results)
        </span>
        {pagination.next && (
          <button
            onClick={() => {
              fetchDogs(pagination.next);
              setCurrentPage((prev) => prev + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DogFeed;
