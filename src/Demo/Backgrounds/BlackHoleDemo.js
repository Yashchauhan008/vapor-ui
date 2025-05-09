import React, { useState } from "react";
import BlackHole from "../../content/Backgrounds/BlackHole";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const BlackHoleDemo = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const props = [
    { property: "totalDiscs", type: "number", default: 100, description: "Total number of concentric elliptical discs." },
    { property: "totalParticles", type: "number", default: 100, description: "Total number of particles to animate." },
    { property: "totalLines", type: "number", default: 100, description: "Total radial lines emitted from discs." },
    { property: "discsColor", type: "string", default: "#444", description: "Color of the elliptical discs." },
    { property: "discsWidth", type: "number", default: 2, description: "Stroke width of the elliptical discs." },
    { property: "linesColor", type: "string", default: "#444", description: "Color of the radial lines." },
    { property: "linesWidth", type: "number", default: 2, description: "Stroke width of the radial lines." },
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

          <BlackHole 
          totalDiscs = {100}
          totalParticles = {100}
          discsColor = "#444"
          discsWidth = {2}
          totalLines = {100}
          backgroundColor = "black"
          linesColor = "#444"
          linesWidth = {2}
          outerGlowOpacity = {0.75}
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

export default BlackHoleDemo;
