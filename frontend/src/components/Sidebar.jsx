import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";

const API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
const STOCK_SYMBOLS = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NVDA"];

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [stockData, setStockData] = useState({});

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
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <h2>Sidebar</h2>
        <div className="stock-section">
          <h3>Stock Prices</h3>
          <div className="stock-grid">
            {STOCK_SYMBOLS.map((symbol) => (
              <div className="stock-card" key={symbol}>
                <span className="stock-symbol">{symbol}</span>
                <span className="stock-price">
                  <a
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
      </div>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "←" : "→"}
      </button>
    </div>
  );
}

export default SideBar;
