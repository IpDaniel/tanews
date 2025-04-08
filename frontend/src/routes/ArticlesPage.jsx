import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import SideBar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/ArticlesPage.css";

const ArticlesPage = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log("Fetching article with ID:", id);
        const response = await fetch(`http://localhost:4000/api/articles/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch article');
        }

        if (!data.article) {
          throw new Error('Article data is missing');
        }

        setArticle(data.article);
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
      <div className="app-container">
        <TopNav />
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <p>Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <TopNav />
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <p className="error-message">Error: {error}</p>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <TopNav />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="article-page-container">
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
      </div>
      <Footer />
    </div>
  );
};

export default ArticlesPage;