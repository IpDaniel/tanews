import { useState } from "react";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.

import Sidebar from "../components/Sidebar.jsx";



function App() {
  return (
    <>
      <TopNav />
      <Sidebar />
      <div>app component page</div>
    </>
  );
}

export default App;
