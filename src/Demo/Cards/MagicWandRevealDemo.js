import React, { useState, useEffect } from "react";
import MagicWandReveal from "../../content/Cards/MagicWandReveal";

const MagicWandRevealDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
        <MagicWandReveal/>
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

export default MagicWandRevealDemo;
