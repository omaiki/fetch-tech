import { useState } from "react";

const PetFilter = ({ breeds, onFilterChange }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");

  // Apply filters
  const applyFilters = () => {
    const filters = {
      breeds: selectedBreed ? [selectedBreed] : [], // Convert to array
      zipCodes: zipCode ? [zipCode] : [],
      ageMin: ageMin ? parseInt(ageMin, 10) : undefined,
      ageMax: ageMax ? parseInt(ageMax, 10) : undefined,
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

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default PetFilter;
