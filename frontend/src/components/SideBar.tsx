import React, { useState } from "react";
import "../styles/SideBar.css";


function SideBar(){
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Sidebar</h2>
        <ul>
          <li>Date</li>
          <li>Time</li>
          <li>Weather</li>
        </ul>
      </div>
      <div className="content">
        <h1>Main Content</h1>
        <p>This is the main area.</p>
      </div>
    </div>
  );
}

export default SideBar;