import react, { useEffect, useState } from "react";
import "../styles/App.css";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.
import Footer from "../components/Footer.jsx";
import SideBar from "../components/Sidebar.jsx";
import SearchBar from "../components/Search.jsx";
import ArticlePeek from "../components/ArticlePeek.jsx";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/articles/`) // no auth needed to access this page?
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []); // only make this call on page mount

  return (
    <div className="app-container">
      <TopNav />
      <SideBar />
      <SearchBar articles={articles} />
      <div className="article-peeks">
        {articles.map((article, index) => (
          <ArticlePeek key={index} article={article} />
        ))}
      </div>

      <div></div>
      <Footer />
    </div>
  );
}

export default App;
