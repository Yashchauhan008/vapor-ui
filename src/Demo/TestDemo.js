import React, { useState } from "react";
import TunnelEffect from "../content/AnimatedElements/Tunnel";
import BlackHole from "../content/temp";

const TestDemo = () => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <>
      <div className="demo-box">
        {!fullScreen && (
          <button
            onClick={() => setFullScreen(true)}
            className="mb-4 px-4 py-2 bg-white text-black rounded"
          >
            Go Fullscreen
          </button>
        )}

        <div
          className={`border h-screen border-white/20 rounded-[40px] overflow-hidden z-[100] mt-[30px] transition-all duration-500 ease-in-out ${
            fullScreen
              ? "fixed top-0 left-0 w-screen h-screen bg-black"
              : "relative"
          }`}
        >
          {fullScreen && (
            <button
              onClick={() => setFullScreen(false)}
              className="absolute top-4 right-4 px-3 py-1 bg-white text-black rounded z-[110]"
            >
              Back to Original Size
            </button>
          )}

          <BlackHole />
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
