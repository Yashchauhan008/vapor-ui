import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div>LandingPage</div>
      <Link to="/">landing</Link>
      <br/>
      <Link to="/showcase">showcase</Link>
      <br/>
      <Link to="/category-1/sub-category-1.1">category 1 sub 1</Link>
    </>
  );
};

export default LandingPage;
