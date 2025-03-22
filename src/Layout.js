import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const Layout = () => {
  return (
    <>
      <div className="full-screen">
        <Header />
        <div className="category-container">
          <Sidebar />
          {/* <Display category={category} subcategory={subcategory} /> */}
            <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Layout;
