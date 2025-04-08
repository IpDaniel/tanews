import React, { useEffect, useState } from "react";
import "../styles/EditArticles.css";

import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import SideBar from "../components/Sidebar.jsx";
import EditPeek from "../components/EditPeek.jsx";
import { useNavigate } from "react-router";

const EditArticles = () => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => navigate("/login"), 10);
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/articles/`) // no auth needed to access this page?
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []); // only make this call on page mount
  
  return (
    <>
      <TopNav />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div>Admin page for editing articles.</div>
        <div className="article-peeks">
          {articles.map((article, index) => (
            <EditPeek key={index} article={article} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditArticles;