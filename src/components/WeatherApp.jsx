import React, { useState } from "react";
import "./WeatherApp.css";
import searchIcon from "../assets/search.gif";
import clearIcon from "../assets/clear.png";
import thunderIcon from "../assets/thunder.png";
import rainfallIcon from "../assets/rainfall.png";
import cloudyIcon from "../assets/cloudy.png";
import snowIcon from "../assets/snow.png";
import humidityIcon from "../assets/humidity1.png";
import windIcon from "../assets/wind.png";
const WeatherApp = () => {
  const [input, setInput] = useState("");
  const [temperature, setTemperature] = useState("33.97 \u00b0C");
  const [location, setLocation] = useState("Kolkata");
  const [relativeHumidity, setRelativeHumidity] = useState("66%");
  const [windSpeed, setWindSpeed] = useState("2.06 km/h");
  const [alert, setAlert] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(cloudyIcon);
  //
  let apiKey = "72ce6b8e96c77393a772cb2885a935e8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=${apiKey}`;
  const handleSearch = async () => {
    if (input.length === 0) {
      return;
    } else {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTemperature(`${data.main.temp} \u00b0C`);
          setLocation(data.name);
          setRelativeHumidity(`${data.main.humidity}%`);
          setWindSpeed(`${data.wind.speed} km/h`);
          if (
            data.weather[0].icon === "01d" ||
            data.weather[0].icon === "01n"
          ) {
            setWeatherIcon(clearIcon);
          } else if (
            data.weather[0].icon === "02d" ||
            data.weather[0].icon === "02n"
          ) {
            setWeatherIcon(cloudyIcon);
          } else if (
            data.weather[0].icon === "03d" ||
            data.weather[0].icon === "03n"
          ) {
            setWeatherIcon(thunderIcon);
          } else if (
            data.weather[0].icon === "04d" ||
            data.weather[0].icon === "04n"
          ) {
            setWeatherIcon(thunderIcon);
          } else if (
            data.weather[0].icon === "09d" ||
            data.weather[0].icon === "09n"
          ) {
            setWeatherIcon(rainfallIcon);
          } else if (
            data.weather[0].icon === "10d" ||
            data.weather[0].icon === "10n"
          ) {
            setWeatherIcon(rainfallIcon);
          } else if (
            data.weather[0].icon === "13d" ||
            data.weather[0].icon === "13n"
          ) {
            setWeatherIcon(snowIcon);
          } else {
            setWeatherIcon(clearIcon);
          }
        } else {
          //   console.error(`HTTP Error: ${response.status}`);
          setAlert(` error${response.status}: Invalid Input`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setTimeout(() => {
      setInput("");
      setAlert("");
    }, 2000);
  };

  return (
    <main className="weather">
      <h1 className="weather-title">Weather App</h1>
      <div className="weather-body">
        {/* contains the Input and the Search Icons */}
        <section className="header">
          <div className="weather_Search">
            <input
              type="text"
              placeholder="Search here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <img
              src={searchIcon}
              alt=""
              style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              onClick={handleSearch}
            />
          </div>
        </section>
        <p className="alert">{alert}</p>
        {/* contains the Weather_Icon, Temperature, Location */}
        <section className="body">
          <div className="weather_Info">
            <img src={weatherIcon} alt="" className="weatherIcon" />
            <span id="temperature">{temperature}</span>
            <h4 id="location">{location}</h4>
          </div>
        </section>
        {/* contains humidity and wind description */}
        <section className="footer">
          <div className="weather_Desc">
            <div className="humidity_Info">
              <img
                src={humidityIcon}
                alt=""
                style={{ width: "2rem", height: "2rem" }}
              />
              <div className="humidity_Desc">
                <span id="relativeHumidity">{relativeHumidity}</span>
                <h5 style={{ margin: "0", fontSize: ".85rem" }}>Humidity</h5>
              </div>
            </div>
            <div className="wind_Info">
              <img
                src={windIcon}
                alt=""
                style={{ width: "2rem", height: "2rem" }}
              />
              <div className="wind_Desc">
                <span id="windSpeed">{windSpeed}</span>
                <h5 style={{ margin: "0" }}>Wind Speed</h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WeatherApp;
