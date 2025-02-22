import React, { useState } from "react";
import "../styles/Sidebar.css";


function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li>Date</li>
          <li>Time</li>
          <li>Weather</li>
          <li>Stock</li>
        </ul>
      </div>

      {/* Toggle Button (Hanging on the right) */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "←" : "→"}
      </button>
    </div>
  );
}

export default SideBar;