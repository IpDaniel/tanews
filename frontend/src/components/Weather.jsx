// WeatherWidget.js
import React, { useState, useEffect } from 'react';
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
  }, [city]);

  return (
    <div className="weather-widget p-4 bg-gray-800 text-white rounded-lg">
      {weather ? (
        <>
          <h3 className="text-lg font-bold">{weather.location.name}</h3>
          <p>{weather.current.temp_c}°C</p>
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
