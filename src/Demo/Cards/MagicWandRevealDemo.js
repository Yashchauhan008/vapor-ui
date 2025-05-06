import React, { useState, useEffect } from "react";
import MagicWandReveal from "../../content/Cards/MagicWandReveal";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";
import img1 from "../../assets/images/portraits/portrait1.webp"
import img2 from "../../assets/images/portraits/portrait2.webp"
import img3 from "../../assets/images/portraits/portrait3.webp"

const MagicWandRevealDemo = () => {

  const props = [
    {
      property: "imageUrls",
      type: "array of strings",
      default: "[]",
      description: "An array of image URLs to display within the magic wand effect tiles."
    },
    {
      property: "wandSize",
      type: "string",
      default: '"10vmin"',
      description: "The size of the wand used for the reveal effect."
    },
    {
      property: "tileSize",
      type: "string",
      default: '"38vmin"',
      description: "The size of each tile in the image grid."
    },
    {
      property: "backgroundColor",
      type: "string",
      default: '"rgb(2, 6, 23)"',
      description: "Background color of the container."
    },
    {
      property: "tileBackgroundColor",
      type: "string",
      default: '"rgb(31, 41, 55)"',
      description: "Background color of the tiles."
    },
    {
      property: "containerRef",
      type: "ref",
      default: "null",
      description: "Reference to the container element where the tiles and wand are placed."
    },
    {
      property: "wandRef",
      type: "ref",
      default: "null",
      description: "Reference to the wand element used for the effect."
    },
    {
      property: "tilesRef",
      type: "ref",
      default: "null",
      description: "Reference to the container holding the tiles."
    },
    {
      property: "tiles",
      type: "array",
      default: "[]",
      description: "Array holding the tile elements to apply the reveal effect."
    }
  ];

  
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
        <MagicWandReveal
        imageUrls={[
          img1,
          img2,
          img3
        ]}
        wandSize="10vmin"
        tileSize="38vmin"
        backgroundColor="rgb(2, 6, 23)"
        tileBackgroundColor="rgb(31, 41, 55)"
      />

        </div>
        <div className="states">
          {/* <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div> */}
          <h3>Props</h3>
          <PropsTable properties={props}/>
          <h3>Dependencies</h3>
          <DependencyList deps={["react"]}/>
        </div>
      </div>
    </>
  );
};

export default MagicWandRevealDemo;
