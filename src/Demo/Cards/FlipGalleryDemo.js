import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/flipGalleryImages/FG1.jpg"
import img2 from "../../assets/images/flipGalleryImages/FG2.jpg"
import img3 from "../../assets/images/flipGalleryImages/FG3.jpg"
import FlipGallery from "../../content/Cards/FlipGallery";

const FlipGalleryDemo = () => {

  const myImages = [
    { title: "Mountain View", url: img1 },
    { title: "Ocean Sunset", url: img2 },
    { title: "Ocean Sunset", url: img3 },
    // Add more images as needed
  ];
  
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

export default FlipGalleryDemo;
