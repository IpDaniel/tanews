import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import "../styles/Settings.css";

const Settings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAddArticle = () => {
    navigate("/authorized/add-article");
  };

  const handleEditArticles = () => {
    navigate("/authorized/edit-article/");
  };

  return (
    <div className="app-container">
      <TopNav />
      <div className="main-content">
        <div className="settings-container">
          <h2>Settings</h2>
          {error && <p className="error-message">{error}</p>}
          
          {isLoggedIn ? (
            <div className="settings-buttons">
              <button 
                className="settings-button primary" 
                onClick={handleAddArticle}
              >
                Add New Article
              </button>
              <button 
                className="settings-button secondary" 
                onClick={handleEditArticles}
              >
                Edit Articles
              </button>
            </div>
          ) : (
            <div className="not-logged-in">
              <p>Please log in to access these features</p>
              <button onClick={() => navigate('/login')} className="login-redirect-button">
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;