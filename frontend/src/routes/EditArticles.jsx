import react, { useEffect, useState } from "react";
import "../styles/EditArticles.css";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.
import Footer from "../components/Footer.jsx";
import SideBar from "../components/Sidebar.jsx";
import EditPeek from "../components/EditPeek.jsx";
import { useNavigate, useNavigation } from "react-router";

const EditArticles = () => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => navigate("/login"), 10);
      return;
    }
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/articles/`) // no auth needed to access this page?
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []); // only make this call on page mount
  return (
    <>
      <TopNav />
      <SideBar />
      <div>Admin page for editing articles. </div>
      <div className="article-peeks">
        {articles.map((article, index) => (
          <EditPeek key={index} article={article} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default EditArticles;
