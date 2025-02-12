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
    sort: "breed:asc",
    size: 25, // Default page size
  });
  const [totalResults, setTotalResults] = useState(0); // Total number of dogs
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page

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

  // Fetch dogs when filters change (reset to first page)
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
    fetchDogs();
  }, [filters]);

  // Fetch dogs when clicking Next/Previous
  const fetchDogs = async (pageUrl = null) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.breeds.length) queryParams.append("breeds", filters.breeds.join(","));
      if (filters.zipCodes.length) queryParams.append("zipCodes", filters.zipCodes.join(","));
      if (filters.ageMin) queryParams.append("ageMin", filters.ageMin);
      if (filters.ageMax) queryParams.append("ageMax", filters.ageMax);
      if (filters.sort) queryParams.append("sort", filters.sort);
      if (filters.size) queryParams.append("size", filters.size);

      // If pageUrl is provided, use it for next/prev navigation, otherwise get first page
      const url = pageUrl ? `${API_BASE_URL}${pageUrl}` : `${API_BASE_URL}/dogs/search?${queryParams.toString()}`;

      console.log("Fetching dogs from:", url); // Debugging

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dogs: ${response.statusText}`);
      }

      const data = await response.json();
      setPagination({ next: data.next, prev: data.prev });
      setTotalResults(data.total); // Store total results from API

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
    if (!dogIds || dogIds.length === 0) {
      console.error("No dog IDs to fetch.");
      return;
    }

    try {
      console.log("Fetching dog details for IDs:", dogIds); // Debugging

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

  // Handle filter & sorting changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination({ next: null, prev: null }); // Reset pagination when filters change
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / filters.size) || 1;

  return (
    <div className="dog-feed-container">
      <h2>Dog Feed</h2>
      {error && <p className="error-message">{error}</p>}

      <PetFilter breeds={breeds} onFilterChange={handleFilterChange} />

   
      <div className="pagination-buttons">
        {pagination.prev && (
          <button onClick={() => {
            fetchDogs(pagination.prev);
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }}>
            Previous
          </button>
        )}
        <span>Page {currentPage} of {totalPages}</span>
        {pagination.next && (
          <button onClick={() => {
            fetchDogs(pagination.next);
            setCurrentPage((prev) => prev + 1);
          }}>
            Next
          </button>
        )}
      </div>

     
      <div className="dog-grid">
        {dogs.length > 0 ? (
          dogs.map((dog) => (
            <div key={dog.id} className="dog-card">
              <img src={dog.img || "https://via.placeholder.com/150"} alt={dog.name} />
              <h4>{dog.name}</h4>
              <p><strong>Breed:</strong> {dog.breed}</p>
              <p><strong>Age:</strong> {dog.age} years</p>
              <p><strong>Zip Code:</strong> {dog.zip_code}</p>
            </div>
          ))
        ) : (
          <p>No dogs found.</p>
        )}
      </div>

      <div className="pagination-buttons">
        {pagination.prev && (
          <button onClick={() => {
            fetchDogs(pagination.prev);
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }}>
            Previous
          </button>
        )}
        <span>Page {currentPage} of {totalPages}</span>
        {pagination.next && (
          <button onClick={() => {
            fetchDogs(pagination.next);
            setCurrentPage((prev) => prev + 1);
          }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DogFeed;
