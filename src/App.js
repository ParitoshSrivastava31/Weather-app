import React, { useState } from "react";
import CurrentWeather from "./CurrentWeather";
import Search from "./Search";
import FormattedDate from "./FormattedDate";
import WeatherForecast from "./WeatherForecast";
import "bootstrap/dist/css/bootstrap.css";
import "./style/App.css"
import axios from "axios";



// ... (other imports)

export default function App() {
  const [weatherData, setWeatherData] = useState({ ready: false });

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: Math.round(response.data.main.temp),
      max: Math.round(response.data.main.temp_max),
      min: Math.round(response.data.main.temp_min),
      wind: response.data.wind.speed,
      date: new Date(response.data.dt * 1000),
      city: response.data.name,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  const apiKey = `12c25d4da1e8f408aaa7046e75e2ce6c`;

  const searchByCity = (city) => {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  };

  if (weatherData.ready === false) {
    searchByCity("Bangalore");
    return <div className="App">Loading...</div>;
  } else {
    return (
      <div className="App">
        <div className="container">
          <div className="outerdiv">
            <div className={"weatherapp"}>
              <div className="background-image-area">
                <div className="header row location-date">
                  <div className="col-12 col-md-5">
                    <h1>
                      {weatherData.ready ? weatherData.city : "Loading..."}
                    </h1>
                    <FormattedDate date={weatherData.date} />
                  </div>
                  <div className="col-12 col-md-7 d-flex flex-row justify-content-end">
                    {/* Pass apiKey as a prop to the Search component */}
                    <Search searchByCity={searchByCity} apiKey={apiKey} />
                  </div>
                </div>
                <CurrentWeather weatherData={weatherData} />
              </div>
              <WeatherForecast coordinates={weatherData.coordinates} />
            </div>
            <div className="footer row"> </div>
          </div>
          <p className="name">By Paritosh Srivastava</p>
        </div>
      </div>
    );
  }
}
