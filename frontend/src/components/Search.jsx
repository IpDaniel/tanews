import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import "../styles/Search.css";
import filter_icon from "../../public/filter_icon.svg";

const Search = ({ articles }) => {
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

  return (
    <div className="search-container">
      <div className="search-box">
        <AutoComplete
          value={query}
          suggestions={filteredArticles}
          completeMethod={searchArticles}
          field="title"
          onChange={(e) => setQuery(e.value)}
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
