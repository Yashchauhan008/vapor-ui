import React, { useState } from "react";
import BlackHole from "../../content/AnimatedElements/BlackHole";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";
import Tunnel from "../../content/AnimatedElements/Tunnel";

const TunnelDemo = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const props = [

  ]
  

  return (
    <>
      <div className="demo-box">
        {!fullScreen && (
          <button
            onClick={() => setFullScreen(true)}
            className="btn1 relative translate-y-20 translate-x-7 rounded-full z-[200] mb-4 px-4 py-2 bg-white text-black"
          >
            Go Fullscreen
          </button>
        )}

        <div
          className={`border h-screen border-white/20 rounded-[40px] overflow-hidden z-[100] transition-all duration-500 ease-in-out ${
            fullScreen
              ? "fixed top-0 left-0 w-screen h-screen bg-black"
              : "relative"
          }`}
        >
          {fullScreen && (
            <button
              onClick={() => setFullScreen(false)}
              className="btn1 absolute top-4 -right-4 px-3 py-1 bg-white text-black rounded z-[110]"
            >
              Back to Original Size
            </button>
          )}

          <Tunnel/>
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

export default TunnelDemo;
