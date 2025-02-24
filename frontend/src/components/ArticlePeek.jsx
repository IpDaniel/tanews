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
        <p>{article.text}</p>
      </div>
    </>
  );
};

export default ArticlePeek;
