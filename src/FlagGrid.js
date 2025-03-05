import React from "react";
import FlagCard from "./FlagCard";
import "./FlagGrid.css";

const FlagGrid = ({ countries = [] }) => {
  if (!countries || countries.length === 0) {
    return <p>No countries available</p>;
  }

  return (
    <div className="countryCard">
      {countries.map((country, index) => (
        country && <FlagCard key={index} country={country} />
      ))}
    </div>
  );
};

export default FlagGrid;