import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import "../styles/Search.css";
import filter_icon from "../../public/filter_icon.svg";

const Search = ({ articles, onQueryChange }) => {
  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

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
      onQueryChange(value);
    }
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
        <button className="filter-btn">
          <img src={filter_icon} alt="Filter" />
        </button>
      </div>
    </div>
  );
};

export default Search;