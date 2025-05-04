import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/flipGalleryImages/FG1.jpg"
import img2 from "../../assets/images/flipGalleryImages/FG2.jpg"
import img3 from "../../assets/images/flipGalleryImages/FG3.jpg"
import FlipGallery from "../../content/Cards/FlipGallery";
import DependencyList from "../../components/DependencyList";
import PropsTable from "../../components/PropTable";

const FlipGalleryDemo = () => {

  const myImages = [
    { title: "Mountain View", url: img1 },
    { title: "Ocean Sunset", url: img2 },
    { title: "Ocean Sunset", url: img3 },
    // Add more images as needed
  ];

  const props = [
    {
      property: "images",
      type: "Array<{ title: string, url: string }>",
      default: "defaultImages",
      description: "Array of image objects with a title and image URL to be displayed in the flip animation."
    },
    {
      property: "width",
      type: "number",
      default: 240,
      description: "Width of the gallery in pixels."
    },
    {
      property: "height",
      type: "number",
      default: 400,
      description: "Height of the gallery in pixels."
    },
    {
      property: "flipSpeed",
      type: "number",
      default: 750,
      description: "Duration of the flip animation in milliseconds."
    },
    {
      property: "backgroundColor",
      type: "string",
      default: '"rgba(0, 0, 0, 0.8)"',
      description: "Background color of the gallery container."
    },
    {
      property: "borderColor",
      type: "string",
      default: '"rgba(255, 255, 255, 0.25)"',
      description: "Border color of the gallery container."
    },
    {
      property: "titleColor",
      type: "string",
      default: '"rgba(255, 255, 255, 0.75)"',
      description: "Color of the title text displayed below the gallery."
    },
    {
      property: "padding",
      type: "number",
      default: 5,
      description: "Padding around the gallery content."
    },
    {
      property: "perspective",
      type: "number",
      default: 800,
      description: "CSS perspective for the flip animation depth."
    },
    {
      property: "dividerHeight",
      type: "number",
      default: 4,
      description: "Height of the divider line between top and bottom halves."
    },
    {
      property: "navButtonsColor",
      type: "string",
      default: '"white"',
      description: "Color of the navigation and autoplay toggle buttons."
    },
    {
      property: "showTitle",
      type: "boolean",
      default: true,
      description: "Whether to display the title text below the gallery."
    },
    {
      property: "easing",
      type: "string",
      default: '"cubic-bezier(0.455, 0.03, 0.515, 0.955)"',
      description: "Easing function used for the flip animations."
    },
    {
      property: "autoplayEnabled",
      type: "boolean",
      default: true,
      description: "If true, the gallery will automatically cycle through images."
    },
    {
      property: "autoplayInterval",
      type: "number",
      default: 3000,
      description: "Delay in milliseconds between image flips when autoplay is enabled."
    },
    {
      property: "pauseOnHover",
      type: "boolean",
      default: true,
      description: "Pauses the autoplay when the user hovers over the gallery."
    }
  ];
  

  const deps = ["react"]
  
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
        <div className="bg-black text-white flex flex-col items-center justify-center space-y-12">
      <h1 className="text-center">
      <FlipGallery 
      images={myImages}
      width={300}
      height={500}
      flipSpeed={800}
      backgroundColor="rgba(25, 25, 25, 0.9)"
      borderColor="rgba(255, 255, 255, 0.4)"
      titleColor="white"
      padding={10}
    />
      </h1>
    </div>
        </div>
        <div className="states">
          <h3>Props</h3>
          <PropsTable properties={props}/>
          <h3>Dependencies</h3>
          <DependencyList deps={deps}/>
        </div>
      </div>
    </>
  );
};

export default FlipGalleryDemo;
