import React, { useState, useEffect } from "react";
import InstagramCarousel from "../../content/Cards/InstagramCarousel";

const InstagramCarouselDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
          <InstagramCarousel/>
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

export default InstagramCarouselDemo;