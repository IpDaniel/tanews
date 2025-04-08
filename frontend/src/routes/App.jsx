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
        // Apply initial category filter if present in URL
        if (categoryFilter) {
          const filtered = data.articles.filter((article) => 
            article.category.includes(categoryFilter)
          );
          setFilteredArticles(filtered);
        } else {
          setFilteredArticles(data.articles);
        }
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, [categoryFilter]);

  // Toggle sidebar function to be passed to the Sidebar component
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle search and filter changes
  const handleSearchAndFilter = (query, filters = {}) => {
    let filtered = [...articles];
    
    // Apply category filter from URL if present
    if (categoryFilter) {
      filtered = filtered.filter((article) => 
        article.category.includes(categoryFilter)
      );
    }
    
    // Apply search query
    if (query && query.trim() !== "") {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply readTime filter
    if (filters.readTime) {
      const maxTime = parseInt(filters.readTime);
      filtered = filtered.filter((article) => 
        article.read_time <= maxTime
      );
    }
    
    // Apply author filter
    if (filters.author) {
      filtered = filtered.filter((article) => 
        article.author_names && article.author_names.includes(filters.author)
      );
    }
    
    // Apply category filter (from filter menu, not URL)
    if (!categoryFilter && filters.category) {
      filtered = filtered.filter((article) => 
        article.category.includes(filters.category)
      );
    }
    
    setFilteredArticles(filtered);
  };

  return (
    <div className="app-container">
      <TopNav />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="width-container">
          {categoryFilter && (
            <h2 className="category-heading">{categoryFilter}</h2>
          )}
          <SearchBar 
            articles={articles} 
            onQueryChange={handleSearchAndFilter} 
          />
        </div>
        <div className="article-peeks">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div key={index} className="width-container">
                <ArticlePeek article={article} />
              </div>
            ))
          ) : (
            <div className="width-container no-results">
              <p>No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;