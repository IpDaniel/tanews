import React from "react";
import "../styles/ArticlePeek.css"; // Using the same CSS file as ArticlePeek
import { Link } from "react-router-dom";

const EditPeek = ({ article }) => {
  if (!article) return null;
  return (
    <Link to={`/authorized/edit/${article.article_id}`}>
      <div className="article-peek-continer">
        <img
          src={article.head_url}
          alt={article.title}
          className="article-image"
        />
        <div className="article-content">
          <div className="article-header">
            <h2 className="article-headline">
              {article.title}
            </h2>
            <span className="article-category">
              {article.category}
            </span>
          </div>
          <p className="article-preview">
            {article.text.substring(0, 120)}...
          </p>
          <p className="article-read-time">{article.read_time} min read</p>
        </div>
      </div>
    </Link>
  );
};

export default EditPeek;