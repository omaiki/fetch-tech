import { useState } from "react";
import PropTypes from "prop-types";
import "./PetFilter.css";

const PetFilter = ({ breeds, onFilterChange }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [sortField, setSortField] = useState("breed");
  const [sortOrder, setSortOrder] = useState("asc");
  const [size, setSize] = useState(25);

  const applyFilters = () => {
    const filters = {
      breeds: selectedBreed ? [selectedBreed] : [],
      zipCodes: zipCode ? [zipCode] : [],
      ageMin: ageMin ? parseInt(ageMin, 10) : undefined,
      ageMax: ageMax ? parseInt(ageMax, 10) : undefined,
      sort: `${sortField}:${sortOrder}`,
      size: parseInt(size, 10),
    };

    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSelectedBreed("");
    setZipCode("");
    setAgeMin("");
    setAgeMax("");
    setSortField("breed");
    setSortOrder("asc");
    setSize(25);

    onFilterChange({
      breeds: [],
      zipCodes: [],
      ageMin: undefined,
      ageMax: undefined,
      sort: "breed:asc",
      size: 25,
    });
  };

  return (
    <div className="pet-filter-container">
      <div className="filter-row">
        <div className="pet-filter-field">
          <label>Breed:</label>
          <select
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">Select a Breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className="pet-filter-field">
          <label>Zip Code:</label>
          <input
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <div className="pet-filter-field">
          <label>Age Min:</label>
          <input
            type="number"
            placeholder="Min Age"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
        </div>

        <div className="pet-filter-field">
          <label>Age Max:</label>
          <input
            type="number"
            placeholder="Max Age"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-buttons">
        <button className="pet-filter-button" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="clear-filter-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="sort-results-container">
        <div className="pet-filter-field">
          <label>Sort By:</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="breed">Breed</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
        </div>

        <div className="pet-filter-field">
          <label>Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="pet-filter-field">
          <label>Results Per Page:</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

PetFilter.propTypes = {
  breeds: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func.isRequired,
};

PetFilter.defaultProps = {
  breeds: [],
};

export default PetFilter;
