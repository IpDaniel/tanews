import React from "react";
import "../styles/ArticlePeek.css";
import { Link } from "react-router-dom";

const ArticlePeek = ({ article }) => {
  if (!article) return null;
  return (
    <>
      <Link to={`/article/${article.article_id}`}>
        <div className="article-peek-continer">
          <img
            src={article.head_url}
            alt={article.title}
            className="article-image"
          />
          <div className="article-content">
            <h3 className="article-title">
              {article.category}
            </h3>
            <h2 className="article-headline">
              {article.title.split(".")[0]}...
            </h2>
            <p className="article-preview">
              {article.text.substring(0, 120)}...
            </p>
            <p className="article-read-time">{article.read_time} min read</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArticlePeek;

// {
//     "article_id": 1,
//     "publish_date": "Fri, 15 Mar 2024 00:00:00 GMT",
//     "read_time": 5,
//     "text": "The Bethesda Community Center is set to undergo a transformative renovation after being awarded a $2 million grant...",
//     "title": "Bethesda Community Center Receives $2M Grant for Renovations",
//     "update_date": "Wed, 05 Mar 2025 22:54:10 GMT"
//   },

// {
//   "article_id": 1,
//   "author_name": "Naman Rusia",
//   "category": "Politics",
//   "head_url": "https://www.greaterbethesdachamber.org/uploads/1/1/8/4/118438767/bethesda-metro-plaza_2_orig.jpg",
//   "publish_date": "Fri, 15 Mar 2024 00:00:00 GMT",
//   "read_time": 5,
//   "text": "The Bethesda Community Center is set to undergo a transformative renovation after being awarded a $2 million grant...",
//   "title": "Bethesda Community Center Receives $2M Grant for Renovations",
//   "user_id": 1
// }
