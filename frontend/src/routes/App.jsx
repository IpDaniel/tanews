import react, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch(`http://localhost:4000/api/articles/`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setFilteredArticles(data.articles); // Initialize filtered articles with all articles
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  // Toggle sidebar function to be passed to the Sidebar component
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle search query changes
  const handleSearch = (query) => {
    if (!query.trim()) {
      // If search is empty, show all articles
      setFilteredArticles(articles);
    } else {
      // Filter articles based on search query
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  return (
    <div className="app-container">
      <TopNav />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="width-container">
          <SearchBar articles={articles} onQueryChange={handleSearch} />
        </div>
        <div className="article-peeks">
          {filteredArticles.map((article, index) => (
            <div key={index} className="width-container">
              <ArticlePeek article={article} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;