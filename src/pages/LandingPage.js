import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="font-black fs-24 text-black">LandingPage</div>
      <Link to="/" className="font-black fs-24 text-black">landing</Link>
      <br/>
      <Link to="/showcase" className="font-black fs-24 text-black">showcase</Link>
      <br/>
      <Link to="/category-1/sub-category-1.1" className="font-black fs-24 text-black">category 1 sub 1</Link>
    </>
  );
};

export default LandingPage;
