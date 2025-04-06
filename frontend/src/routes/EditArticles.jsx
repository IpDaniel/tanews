import react, { useEffect, useState } from "react";
import "../styles/EditArticles.css";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.
import Footer from "../components/Footer.jsx";
import SideBar from "../components/Sidebar.jsx";
import SearchBar from "../components/Search.jsx";
import ArticlePeek from "../components/ArticlePeek.jsx";
import { useNavigate, useNavigation } from "react-router";

const EditArticles = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => navigate("/login"), 10);
      return;
    }
  }, [user]);
  return (
    <>
      <TopNav />
      <div>Admin page for editing articles. </div>
      <Footer />
    </>
  );
};

export default EditArticles;
