import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/extra/hero.webp";
import FullScreenNavbar from "../../content/FormElements/FullScreenNavbar";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const TestDemo = () => {

  const props = [
    {
      property: "menuItems",
      type: "Array<{ label: string, href: string }>",
      default: `[ { label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Services", href: "/services" }, { label: "Team", href: "/team" }, { label: "Portfolio", href: "/portfolio" }, { label: "Contact", href: "/contact" } ]`,
      description: "An array of objects representing the navigation menu items, each containing a label and a URL (href)."
    },
    {
      property: "bgColor",
      type: "string",
      default: '"#000000"',
      description: "Background color of the menu. The default is black (#000000)."
    },
    {
      property: "hoverColor",
      type: "string",
      default: '"#ff0047"',
      description: "Hover color for the menu item background when the user hovers over them."
    },
    {
      property: "image",
      type: "string | null",
      default: "null",
      description: "An optional image URL for the background banner of the fullscreen menu. If provided, the image will be displayed on large screens."
    }
  ];

  
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
          {/* <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div> */}
          <h3>Props</h3>
          <PropsTable properties={props}/>
          <h3>Dependencies</h3>
          <DependencyList deps={["react-router-dom"]}/>
        </div>
      </div>
    </>
  );
};

export default TestDemo;
