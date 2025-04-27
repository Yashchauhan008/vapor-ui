import React, { useState, useEffect } from "react";
import Button1 from "../content/FormElements/ActionButton";
import FeatureCards from "../content/Cards/FeatureCards";

const TestDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
          <FeatureCards/>
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
