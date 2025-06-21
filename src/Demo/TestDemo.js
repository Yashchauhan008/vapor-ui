import React, { useState } from "react";
import AbstractLinesBackground from "../content/temp";
import QuantumNav from "../content/temp";

const TestDemo = () => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
          {/* <GradientBackground>
            <div className="flex items-center justify-center h-[500px]">
              <h1 className="font-bold text-white text-[60px] backdrop:filter blur-0">Background 1</h1>
            </div>
          </GradientBackground> */}
        <QuantumNav/>
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
