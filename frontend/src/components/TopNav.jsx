import React, { useState, useEffect } from "react";
import "../styles/TopNav.css";
import { Link, useNavigate } from "react-router-dom";

const TopNav = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the API
    fetch("http://localhost:4000/api/articles/categories")
      .then(response => response.json())
      .then(data => {
        if (data.categories) {
          setCategories(data.categories);
        }
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      <div className="topnav-container">
        <div className="nav-left">
          {/* Fixed anchor tag for the logo link */}
          <a
            href="https://www.nutamidtech.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/tamid.svg" alt="tamid-logo" className="logo" />
          </a>
        </div>
        <div className="nav-center">
          <Link to="/">
            <img src="/tanews.svg" alt="tanews-logo" className="title-logo" />
          </Link>
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
        <Link to="/">ALL</Link>
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            to={`/?category=${cat.name}`}
          >
            {cat.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </>
  );
};

export default TopNav;