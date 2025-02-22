import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
  fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
  return <div className="sidebar-container">sidebar component</div>;
};

export default Sidebar;
