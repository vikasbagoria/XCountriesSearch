import React from "react";
import "./FlagCard.css";

const FlagCard = ({ country }) => {
  return (
    <div className="countryCard">
      <img src={country.png} alt={country.common ? `${country.common} flag` : "Country flag"} className="flag-image" />
      <p className="country-name">{country.common || "Unknown Country"}</p>
    </div>
  );
};

export default FlagCard;