import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import "../styles/ArticlesPage.css";
import ArticlePeek from "../components/ArticlePeek.jsx";

const ArticlesPage = () => {
  const [article, setArticle] = useState(null);

  const { id } = useParams();

  // ujse effect hook to fetch the specific article from backend.

  return (
    <>
      <TopNav />
      <div className="article-page-container">
        <p>rishi: implement logic for viewing individual articles</p>
        <p>{id}</p>
      </div>
    </>
  );
};

export default ArticlesPage;
