import { useState } from "react";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.
import Footer from "../components/Footer.jsx";
import SideBar from "../components/Sidebar.jsx";
import SearchBar from "../components/Search.jsx";

function App() {
  const articles = [
    { id: 1, title: "AI in HR: The Future of Recruitment" },
    { id: 2, title: "Stock Market Insights for 2025" },
    { id: 3, title: "Tech Startups to Watch" },
  ];

  return (
    <>
      <TopNav />
      <SideBar />
      <SearchBar articles={articles} />
      <div></div>
      <Footer />
    </>
  );
}

export default App;
