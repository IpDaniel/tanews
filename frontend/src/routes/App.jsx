import { useState } from "react";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.
import Footer from "../components/Footer.jsx";
import SideBar from "../components/SideBar.tsx";




function App() {
  return (
    <>
      <TopNav />
      <SideBar />
      <div></div>
      <Footer />
    </>
  );
}

export default App;
