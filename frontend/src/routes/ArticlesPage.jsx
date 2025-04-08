import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import SideBar from "../components/Sidebar.jsx";
import "../styles/ArticlesPage.css";

const ArticlesPage = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/api/users/isadmin", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setIsAdmin(response.ok);
      } catch (err) {
        console.error("Error checking admin status:", err);
      }
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log("Fetching article with ID:", id);
        const response = await fetch(`http://localhost:4000/api/articles/${id}`);
        const data = await response.json();
        console.log("Full article data:", data);  // Debug log to see full response

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch article');
        }

        if (!data.article) {
          throw new Error('Article data is missing');
        }

        setArticle(data.article);
        console.log("Article text length:", data.article.text.length); // Debug log text length
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <TopNav />
        <div className={`article-page-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <p>Loading article...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <TopNav />
        <div className={`article-page-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <p className="error-message">Error: {error}</p>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </>
    );
  }

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <TopNav />
      <div className={`article-page-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {article && (
          <article className="article-content">
            {article.head_url && (
              <img 
                src={article.head_url} 
                alt={article.title} 
                className="article-header-image"
              />
            )}
            <div className="article-metadata">
              <span className="article-category">{article.category}</span>
              <span className="article-read-time">{article.read_time} min read</span>
              <span className="article-date">
                {new Date(article.publish_date).toLocaleDateString()}
              </span>
            </div>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-author">
              <span>By {article.author_names}</span>
            </div>
            <div className="article-text">
              {article.text.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        )}
      </div>
    </>
  );
};

export default ArticlesPage;