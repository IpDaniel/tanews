import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import SideBar from "../components/Sidebar";
import "../styles/EditArticle.css";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [readTime, setReadTime] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [category, setCategory] = useState("");
  const [headURL, setHeadURL] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/isadmin",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          navigate("/dashboard");
        }
      } catch (err) {
        setError(err.message);
        navigate("/dashboard");
      }
    };

    // Fetch article data
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/articles/${id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch article");
        }

        const article = data.article;
        setTitle(article.title);
        setReadTime(article.read_time);
        setPublishDate(article.publish_date.split("T")[0]); // Format date for input
        setCategory(article.category);
        setHeadURL(article.head_url);
        setContent(article.text);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/articles/categories"
        );
        const data = await response.json();

        if (response.ok) {
          setCategories(data.categories);
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    checkAdmin();
    fetchArticle();
    fetchCategories();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const articleData = {
      title,
      read_time: readTime,
      publish_date: publishDate,
      category,
      head_url: headURL,
      text: content,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Article updated successfully!");
        navigate("/authorized/edit-article");
      } else {
        setError(data.error || "Failed to update article");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <>
        <TopNav />
        <SideBar />
        <div className="edit-article-container">
          <p>Loading article...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <SideBar />
      <div className="edit-article-container">
        <h2>Edit Article</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="readTime">Read Time (minutes)</label>
            <input
              type="number"
              id="readTime"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="publishDate">Publish Date</label>
            <input
              type="date"
              id="publishDate"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="headURL">Header Image URL</label>
            <input
              type="url"
              id="headURL"
              value={headURL}
              onChange={(e) => setHeadURL(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Article Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="15"
              required
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/authorized/edit-article")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticle;
