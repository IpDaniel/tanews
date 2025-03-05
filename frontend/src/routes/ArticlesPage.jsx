import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav.jsx";
import "../styles/ArticlesPage.css";
import ArticlePeek from "../components/ArticlePeek.jsx";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/articles/`)
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []); // only make this call on page mount
  return (
    <>
      <TopNav />
      <div className="article-page-container">
        {articles.map((article) => (
          <ArticlePeek article={article} />
        ))}
      </div>
    </>
  );
};

export default ArticlesPage;
