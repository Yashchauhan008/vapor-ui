import React, { useState } from "react";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";
import Tunnel from "../../content/Backgrounds/Tunnel";

const TunnelDemo = () => {
  const [fullScreen, setFullScreen] = useState(false);

  // Props
  const [backgroundColor, setBackgroundColor] = useState("#141414");
  const [wireColor, setWireColor] = useState("#FFFFFF");
  const [smoothness, setSmoothness] = useState(1.0);
  const [gridDensity, setGridDensity] = useState(26);
  const [noiseScale, setNoiseScale] = useState(10);
  const [noiseSpeed, setNoiseSpeed] = useState(0.5);
  const [noiseStrength, setNoiseStrength] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(15);
  const [enableDisplacement, setEnableDisplacement] = useState(true);

  const props = [
    { property: "backgroundColor", type: "string", default: "#000000", description: "Tunnel background color" },
    { property: "wireColor", type: "string", default: "#ffffff", description: "Color of the wireframe lines" },
    { property: "smoothness", type: "number", default: 1.0, description: "Smoothness of tunnel edges" },
    { property: "gridDensity", type: "number", default: 20, description: "Number of grid lines in the tunnel" },
    { property: "noiseScale", type: "number", default: 10, description: "Scale of the noise pattern" },
    { property: "noiseSpeed", type: "number", default: 0.5, description: "Speed of noise animation" },
    { property: "noiseStrength", type: "number", default: 0.5, description: "Intensity of noise distortion" },
    { property: "animationDuration", type: "number", default: 30, description: "Time (in seconds) to complete a tunnel loop" },
    { property: "enableDisplacement", type: "boolean", default: true, description: "Toggle noise displacement effect" },
  ];

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

          <Tunnel
            backgroundColor={backgroundColor}
            wireColor={wireColor}
            smoothness={smoothness}
            gridDensity={gridDensity}
            noiseScale={noiseScale}
            noiseSpeed={noiseSpeed}
            noiseStrength={noiseStrength}
            animationDuration={animationDuration}
            enableDisplacement={enableDisplacement}
          />
        </div>

        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box space-y-6">
            {/* Colors */}
            <div className="customization-item">
              <label className="block text-lg font-medium text-gray-300 mb-1">Colors:</label>
              <div className="flex flex-wrap gap-6">
                {/* Background */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-white w-24">Background</label>
                  <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0 opacity-100"
                    />
                  </div>
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="rounded bg-transparent px-2 py-1 text-sm w-24"
                  />
                </div>

                {/* Wire Color */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-white w-24">Wire Color</label>
                  <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                    <input
                      type="color"
                      value={wireColor}
                      onChange={(e) => setWireColor(e.target.value)}
                      className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0"
                    />
                  </div>
                  <input
                    type="text"
                    value={wireColor}
                    onChange={(e) => setWireColor(e.target.value)}
                    className="rounded bg-transparent px-2 py-1 text-sm w-24"
                  />
                </div>
              </div>
            </div>

            {/* Range Sliders */}
            {[
              { label: "Smoothness", value: smoothness, set: setSmoothness, min: 0.1, max: 5, step: 0.1 },
              { label: "Grid Density", value: gridDensity, set: setGridDensity, min: 5, max: 100, step: 1 },
              { label: "Noise Scale", value: noiseScale, set: setNoiseScale, min: 1, max: 50, step: 0.5 },
              { label: "Noise Speed", value: noiseSpeed, set: setNoiseSpeed, min: 0, max: 2, step: 0.1 },
              { label: "Noise Strength", value: noiseStrength, set: setNoiseStrength, min: 0, max: 1, step: 0.01 },
              { label: "Animation Duration", value: animationDuration, set: setAnimationDuration, min: 1, max: 60, step: 1 },
            ].map((item, idx) => (
              <div className="customization-item" key={idx}>
                <label className="block text-white mb-2">{item.label}:</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    value={item.value}
                    onChange={(e) => item.set(Number(e.target.value))}
                    className="mr-3 w-full range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">{item.value}</span>
                </div>
              </div>
            ))}

            {/* Toggle */}
            <div className="customization-item">
              <label className="text-white flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={enableDisplacement}
                  onChange={() => setEnableDisplacement(!enableDisplacement)}
                  className="form-checkbox"
                />
                <span>Enable Displacement</span>
              </label>
            </div>
          </div>

          <h3>Props</h3>
          <PropsTable properties={props} />
          <h3>Dependencies</h3>
          <DependencyList deps={["react", "three", "@react-three/fiber", "@react-three/drei"]} />
        </div>
      </div>
    </>
  );
};

export default TunnelDemo;
