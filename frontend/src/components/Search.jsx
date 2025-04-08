import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import "../styles/Search.css";
import filter_icon from "../../public/filter_icon.svg";

const Search = ({ articles, onQueryChange }) => {
  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    readTime: "",
    author: "",
    category: ""
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    // Extract unique authors and categories from articles
    if (articles && articles.length > 0) {
      const uniqueAuthors = new Set();
      const uniqueCategories = new Set();
      
      articles.forEach(article => {
        if (article.author_names) {
          article.author_names.split(', ').forEach(author => {
            uniqueAuthors.add(author);
          });
        }
        
        if (article.category) {
          article.category.split(', ').forEach(category => {
            uniqueCategories.add(category);
          });
        }
      });
      
      setAuthors(Array.from(uniqueAuthors));
      setCategories(Array.from(uniqueCategories));
    }
  }, [articles]);

  // Function to filter articles based on user input
  const searchArticles = (event) => {
    const value = event.query.toLowerCase();
    const results = articles.filter((article) =>
      article.title.toLowerCase().includes(value)
    );
    setFilteredArticles(results);
  };

  // Handle changes to the search input
  const handleInputChange = (e) => {
    const value = e.value;
    setQuery(value);
    // Notify parent component about the search query change if provided
    if (onQueryChange) {
      onQueryChange(value, filters);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    if (onQueryChange) {
      onQueryChange(query, newFilters);
    }
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <AutoComplete
          value={query}
          suggestions={[]} // Empty array to not show suggestions
          completeMethod={searchArticles}
          field="title"
          onChange={handleInputChange}
          placeholder="Search for articles..."
          className="search-input"
        />
        
        {/* Only show filter button if no category is selected in TopNav */}
        {!categoryFilter && (
          <button className="filter-btn" onClick={toggleFilters}>
            <img src={filter_icon} alt="Filter" />
          </button>
        )}
      </div>
      
      {/* Filter menu - only visible when showFilters is true and no category is selected */}
      {showFilters && !categoryFilter && (
        <div className="filter-menu">
          <div className="filter-group">
            <label>Read Time (minutes):</label>
            <select 
              name="readTime"
              value={filters.readTime}
              onChange={handleFilterChange}
            >
              <option value="">Any length</option>
              <option value="5">5 minutes or less</option>
              <option value="10">10 minutes or less</option>
              <option value="15">15 minutes or less</option>
              <option value="20">20 minutes or less</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Author:</label>
            <select 
              name="author"
              value={filters.author}
              onChange={handleFilterChange}
            >
              <option value="">All authors</option>
              {authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Category:</label>
            <select 
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setFilters({
                readTime: "",
                author: "",
                category: ""
              });
              onQueryChange(query, {
                readTime: "",
                author: "",
                category: ""
              });
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;