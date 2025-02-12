import { useState } from "react";

const PetFilter = ({ breeds, onFilterChange }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [sortField, setSortField] = useState("breed"); // Default sort by breed
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
  const [size, setSize] = useState(25); // Default size

  // Apply filters
  const applyFilters = () => {
    const filters = {
      breeds: selectedBreed ? [selectedBreed] : [],
      zipCodes: zipCode ? [zipCode] : [],
      ageMin: ageMin ? parseInt(ageMin, 10) : undefined,
      ageMax: ageMax ? parseInt(ageMax, 10) : undefined,
      sort: `${sortField}:${sortOrder}`, // Sort query format
      size: parseInt(size, 10), // Number of results per page
    };

    onFilterChange(filters);
  };

  return (
    <div>
      <h3>Filter Dogs</h3>


      <div>
        <h4>Breed</h4>
        <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
          <option value="">Select a Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Zip Code</h4>
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>

      <div>
        <h4>Age Range</h4>
        <input
          type="number"
          placeholder="Min Age"
          value={ageMin}
          onChange={(e) => setAgeMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Age"
          value={ageMax}
          onChange={(e) => setAgeMax(e.target.value)}
        />
      </div>

    
      <div>
        <h4>Sort By</h4>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="breed">Breed</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

  
      <div>
        <h4>Results Per Page</h4>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default PetFilter;
