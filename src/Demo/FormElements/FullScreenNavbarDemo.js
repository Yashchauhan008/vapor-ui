import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/extra/hero.webp";
import FullScreenNavbar from "../../content/FormElements/FullScreenNavbar";

const TestDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
          <FullScreenNavbar
            bgColor="#111"
            hoverColor="#01EBFF"
            image={img1}
            menuItems={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Work", href: "/work" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <h1>Click menu icon up there 👆🏻</h1>
        </div>
        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div>
          <h3>Props</h3>
          <h3>Dependencies</h3>
        </div>
      </div>
    </>
  );
};

export default TestDemo;
