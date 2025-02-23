// this is the 404 error page
// in Main.jsx, you will notice that there is a * path, which basically covers everything that is not a
// route we defined. this is npt nessecary but its nice to have and helps out in development so that
// react doesnt yell at us

import React from "react";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";

const Error404 = () => {
  return (
    <>
      <TopNav />
      <div className="error-page-container"> 404 error. you fucked up</div>
      <Footer />
    </>
  );
};

export default Error404;
