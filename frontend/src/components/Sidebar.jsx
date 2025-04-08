import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import WeatherWidget from "./Weather";

const API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
const STOCK_SYMBOLS = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NVDA"];

// for time/date
const date = new Date();
const showDate = "3" + "/" + date.getDate() + "/" + date.getFullYear();

function SideBar({ isOpen, toggleSidebar }) {
  const [stockData, setStockData] = useState({});

  let now = new Date().toLocaleTimeString();
  let [time, updateTime] = useState(now);

  function clock() {
    const newTime = new Date().toLocaleTimeString();
    updateTime(newTime);
  }

  setInterval(clock, 1000);

  useEffect(() => {
    const fetchStockPrices = async () => {
      const prices = {};
      for (let symbol of STOCK_SYMBOLS) {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
          );
          const data = await response.json();
          const timeSeries = data["Time Series (5min)"];
          if (timeSeries) {
            const latestTime = Object.keys(timeSeries)[0];
            prices[symbol] = parseFloat(
              timeSeries[latestTime]["4. close"]
            ).toFixed(2);
          } else {
            prices[symbol] = "N/A";
          }
        } catch (error) {
          console.error("Error fetching stock data:", error);
          prices[symbol] = "Error";
        }
      }
      setStockData(prices);
    };

    fetchStockPrices();
  }, []);

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="clock-section">
            <div className="Date">
              <h2 align="center"> {showDate}</h2>
            </div>
            <div className="Time">
              <h2 align="center"> {time}</h2>
            </div>

            <div className="stock-section">
              <h3>Stock Prices</h3>
              <div className="stock-grid">
                {STOCK_SYMBOLS.map((symbol) => (
                  <div className="stock-card" key={symbol}>
                    <span className="stock-symbol">{symbol}</span>
                    <span className="stock-price">
                      
                        href={`https://finance.yahoo.com/quote/${symbol}`}
                        target="_blank"
                      >
                        ${stockData[symbol] || "Loading..."}
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="weather-section">
              <h2>Weather:</h2>
              <WeatherWidget city="Boston" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Toggle button outside of sidebar */}
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "←" : "→"}
      </button>
    </div>
  );
}

export default SideBar;