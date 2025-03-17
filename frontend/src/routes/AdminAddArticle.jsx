import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import "../styles/AdminAddArticle.css";
import { useNavigate } from "react-router";

const AdminAddArticle = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [headURL, setHeadURL] = useState("");
  const [minutesRead, setMinutesRead] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => navigate("/login"), 0);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users/isadmin", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.message);
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = { title, category, headURL, minutesRead, content };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        alert("Article added successfully!");
        setTitle("");
        setHeadURL("");
        setCategory("");
        setMinutesRead("");
        setContent("");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to add article.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <TopNav />
      <div className="add-article-container">
        {error && <p className="error-message-admin">{error}</p>}
        {user ? (
          <form className="add-article-form" onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <label>Head URL:</label>
            <input
              type="text"
              value={headURL}
              onChange={(e) => setHeadURL(e.target.value)}
              required
            />

            <label>Minutes Read:</label>
            <input
              type="number"
              value={minutesRead}
              onChange={(e) => setMinutesRead(e.target.value)}
              required
            />

            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <button type="submit">Add Article</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default AdminAddArticle;
