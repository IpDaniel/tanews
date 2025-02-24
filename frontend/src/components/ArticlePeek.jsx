import React from "react";
import "../styles/ArticlePeek.css";

const ArticlePeek = ({ article }) => {
  if (!article) return null;
  return (
    <>
      <div className="article-peek-continer">
        <img
          src={article.head_image_url}
          alt={article.title}
          className="article-image"
        />
        <div className="article-content">
          <h3 className="article-title">{article.category.toUpperCase()}</h3>
          <h2 className="article-headline">{article.text.split(".")[0]}...</h2>
          <p className="article-preview">{article.text.substring(0, 120)}...</p>
          <p className="article-read-time">{article.read_time} min read</p>
        </div>
      </div>
    </>
  );
};

export default ArticlePeek;
