import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style/Search.css";
import axios from "axios";

export default function Search(props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Check for spelling mistake (for example, checking if the city name contains numbers)
    if (/^\d+$/.test(city)) {
      setError("City name should not contain numbers.");
    } else {
      setError(""); // Clear any previous error

      // Use the OpenWeatherMap API to check if the city exists
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${props.apiKey}&units=metric`;

      axios.get(apiUrl)
        .then((response) => {
          // City found, call the searchByCity function
          props.searchByCity(city);
        })
        .catch((error) => {
          // City not found, handle the error
          if (error.response && error.response.status === 404) {
            setError(`City "${city}" not found. Please enter a valid city name.`);
          } else {
            // Handle other errors if needed
            setError("An error occurred. Please try again.");
          }
        });
    }
  }

  function handleCityChange(event) {
    setCity(event.target.value);
    setError(""); // Clear the error when the user types a new city name
  }

  return (
    <div className="city-search">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search city here"
          className={`search-input ${error && "input-error"}`}
          onChange={handleCityChange}
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
