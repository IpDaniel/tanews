// WeatherWidget.js
import React, { useState, useEffect } from 'react';
import "../styles/Weather.css";
import axios from 'axios';

const WeatherWidget = ({ city = 'Boston' }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = 'de989e92055b43629d101915250303'; // Replace with your WeatherAPI key

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeather();
  }, [city]);3

  return (
    <div className="weather-widget">
      {weather ? (
        <>
          <h3 className="weather">{weather.location.name}</h3>
          <p>{weather.current.temp_f}°F</p>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather icon" />
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
