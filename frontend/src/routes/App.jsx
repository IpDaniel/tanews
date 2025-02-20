import { useState } from "react";

import TopNav from "../components/TopNav.jsx"; // this is an example of a reusable component. i set
// up a basic topnav that just returns topnav. need styling.

function App() {
  return (
    <>
      <TopNav />
      <div>app component page</div>
    </>
  );
}

export default App;
