import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import "../styles/App.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left Section - Branding */}
        <div className="footer-branding">
          <h2>TaNews</h2>
          <p>Developed by TAMID at Northeastern</p>
        </div>

        {/* Center Section - Quick Links , TODO implementation*/}
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy, terms of service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
