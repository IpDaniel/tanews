import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/App.css";

import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import SideBar from "../components/Sidebar.jsx";
import SearchBar from "../components/Search.jsx";
import ArticlePeek from "../components/ArticlePeek.jsx";

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    fetch(`http://localhost:4000/api/articles/`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        // Apply initial filtering if category is in URL
        if (categoryFilter) {
          filterArticlesByCategory(data.articles, categoryFilter);
        } else {
          setFilteredArticles(data.articles);
        }
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  // Watch for changes in the category filter URL parameter
  useEffect(() => {
    if (articles.length > 0) {
      if (categoryFilter) {
        filterArticlesByCategory(articles, categoryFilter);
      } else {
        setFilteredArticles(articles);
      }
    }
  }, [categoryFilter, articles]);

  const filterArticlesByCategory = (articlesArray, category) => {
    const filtered = articlesArray.filter((article) =>
      article.category.includes(category)
    );
    setFilteredArticles(filtered);
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle search query changes
  const handleSearch = (query) => {
    if (!query.trim()) {
      // If search is empty, show all articles or filter by category if present
      if (categoryFilter) {
        filterArticlesByCategory(articles, categoryFilter);
      } else {
        setFilteredArticles(articles);
      }
    } else {
      // Filter by search query AND category if present
      let filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      
      if (categoryFilter) {
        filtered = filtered.filter((article) =>
          article.category.includes(categoryFilter)
        );
      }
      
      setFilteredArticles(filtered);
    }
  };

  return (
    <div className="app-container">
      <TopNav />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="width-container">
          {categoryFilter && (
            <h1 className="category-title">{categoryFilter} Articles</h1>
          )}
          <SearchBar articles={articles} onQueryChange={handleSearch} />
        </div>
        <div className="article-peeks">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div key={index} className="width-container">
                <ArticlePeek article={article} />
              </div>
            ))
          ) : (
            <div className="width-container">
              <p className="no-articles">No articles found for {categoryFilter || "your search"}.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;