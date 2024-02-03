import React from "react";
import "./style/CurrentWeather.css";
import WeatherTemperature from "./WeatherTemperature";
import WeatherIcon from "./WeatherIcon";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTemperatureLow } from "react-icons/fa";

export default function CurrentWeather(props) {



  if (props.weatherData.ready) {
    return (
      <div className="current-weather">
        <div className="body row">
          <div className="col-md-3 col-6 current-weather-info">
            <ul>
              <li>
                <WeatherTemperature celsius={props.weatherData.temperature} />
              </li>
              <li className="text-left text-capitalize ">
                <p>{props.weatherData.description}</p>
              </li>
              <li className="current-weather-icon">
                <WeatherIcon
                  code={props.weatherData.icon}
                  alt={props.weatherData.description}
                />
              </li>
            </ul>
          </div>
          <div className="col-md d-none d-md-block">&nbsp;</div>
          <div className="col-md-3 col-6 current-weather-description">
            <ul>
              <li>
                <WiHumidity /> {props.weatherData.humidity}%
              </li>
              <li>
                <FaWind /> {props.weatherData.wind} km/h
              </li>
              <li>
              <FaTemperatureHigh /> {props.weatherData.max} °C
              </li>
              <li>
              <FaTemperatureLow /> {props.weatherData.min} °C
              </li>

            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
