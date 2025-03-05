import React, { useState, useEffect } from "react";
import axios from "axios";
import FlagGrid from "./FlagGrid";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
        
        if (Array.isArray(response.data)) {
          setCountries(response.data);
          setFilteredCountries(response.data); // Initially show all countries
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message || err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function handleChange(e) {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredCountries(countries); // Reset to all countries
    } else {
      const updatedCountries = countries.filter(country => 
        country.common && country.common.toLowerCase().includes(searchValue)
      );
      setFilteredCountries(updatedCountries);
    }
  }

  return (
    <div className="app-container">
      <h1>Country Flags</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <FlagGrid countries={filteredCountries} />}
    </div>
  );
};

export default App;
