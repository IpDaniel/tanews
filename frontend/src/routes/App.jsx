import { useEffect, useState } from "react";
import "../styles/App.css";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.
import Footer from "../components/Footer.jsx";
import SideBar from "../components/Sidebar.jsx";
import SearchBar from "../components/Search.jsx";
import ArticlePeek from "../components/ArticlePeek.jsx";

import {
  sample_article_1,
  sample_article_2,
  sample_article_3,
  sample_article_4,
  sample_article_5,
  sample_article_6, 
} from "../sample.data.js";

function App() {
  const articles = [
    { id: 1, title: "AI in HR: The Future of Recruitment" },
    { id: 2, title: "Stock Market Insights for 2025" },
    { id: 3, title: "Tech Startups to Watch" },
  ];

  return (
    <div className="app-container">
      <TopNav />
      <SideBar />
      <SearchBar articles={articles} />
      <div className="article-peeks">
        <ArticlePeek article={sample_article_1} />
        <ArticlePeek article={sample_article_2} />
        <ArticlePeek article={sample_article_3} />
        <ArticlePeek article={sample_article_4} />
        <ArticlePeek article={sample_article_5} />
        <ArticlePeek article={sample_article_6} />
      </div>

      <div></div>
      <Footer />
    </div>
  );
}

export default App;
