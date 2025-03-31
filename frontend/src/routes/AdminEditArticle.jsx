import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import "../styles/AdminEditArticle.css";
import { useNavigate, useParams } from "react-router";

const AdminEditArticle = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [readTime, setReadTime] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [categories, setCategories] = useState("");
  const [headURL, setURL] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { articleId } = useParams();

  // Helper function to format date from GMT to yyyy-MM-dd
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (err) {
      console.error("Error formatting date:", err);
      return "";
    }
  };

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

    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users/authors", {
          method: "GET",
        });
        const data = await response.json();

        if (response.ok) {
          setAuthors(data.authors || []);
        } else {
          setError("Failed to load authors.");
        }
      }
      catch (err) {
        setError(err.message);
      }
    }

    const fetchArticleData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/articles/${articleId}`, {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const articleData = data.article || data;
        
        setTitle(articleData.title || "");
        setHeadline(articleData.headline || "");
        setReadTime(articleData.read_time || "");
        setPublishDate(formatDate(articleData.publish_date));
        setCategories(articleData.category || "");
        setURL(articleData.head_url || "");
        setContent(articleData.text || "");
        
        // Set the selected author based on the article's user_id
        if (articleData.user_id && articleData.user_id !== -1) {
          setSelectedAuthors([articleData.user_id]);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    fetchAuthors();
    fetchArticleData();
  }, [navigate, articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      title,
      headline,
      read_time: readTime,
      publish_date: publishDate,
      authors: selectedAuthors.map(Number),
      category: categories,
      head_url: headURL,
      text: content,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/articles/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      navigate(`/article/${articleId}`);
    } catch (err) {
      console.error("Error updating article:", err);
      setError(err.message || "Failed to update article. Please try again later.");
    }
  };

  const handleAuthorChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedAuthors(selected);
  };

  if (isLoading) {
    return (
      <>
        <TopNav />
        <div className="add-article-container">
          <p>Loading article data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <div className="add-article-container">
        <h2>Edit Article</h2>
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

            <label>Read Time (minutes):</label>
            <input
              type="number"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              required
            />

            <label>Publish Date:</label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              required
            />

            <label>Authors:</label>
            <select multiple value={selectedAuthors} onChange={handleAuthorChange} required>
              {authors.map((author) => (
                <option key={author.user_id} value={author.user_id}>
                  {author.name}
                </option>
              ))}
            </select>

            <label>Categories:</label>
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
            />

            <label>Head URL:</label>
            <input
              type="text"
              value={headURL}
              onChange={(e) => setURL(e.target.value)}
              required
            />

            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <button type="submit">Update Article</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default AdminEditArticle;
