import React from "react";
import "../styles/TopNav.css"; // Ensure this path is correct
import { Link } from "react-router-dom"; // Make sure you're using react-router-dom

const TopNav = () => {
  return (
    <>
      <div className="topnav-container">
        <div className="nav-left">
          <a
            href="https://www.nutamidtech.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/tamid.svg" alt="tamid-logo" className="logo" />
          </a>
        </div>
        <div className="nav-center">
          <a href="/">
            <img src="/tanews.svg" alt="tanews-logo" className="title-logo" />
          </a>
        </div>
        <div className="nav-right">
          <Link to="/settings">
            <img
              src="/settings_icon.svg"
              alt="settings-icon"
              className="icon"
            />
          </Link>
          <Link to="/profile">
            <img
              src="/profile_icon.svg"
              alt="profile icon"
              className="icon profile-icon"
            />
          </Link>
        </div>
      </div>
      <div className="nav-bottom">
        <Link to="/">TAMID</Link>
        <Link to="/">TOP NEWS</Link>
        <Link to="/">OPINION</Link>
        <Link to="/">TECH</Link>
        <Link to="/">STARTUPS</Link>
      </div>
    </>
  );
};

export default TopNav;
