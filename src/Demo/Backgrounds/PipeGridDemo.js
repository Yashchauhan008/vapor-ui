import React, { useState, useEffect } from "react";
import PipeGrid from "../../content/Backgrounds/PipeGrid";
import PropsTable from "../../components/PropTable"; // Assuming you already have this component
import DependencyList from "../../components/DependencyList";

const PipeGridDemo = () => {
  const [fullScreen, setFullScreen] = useState(false);

  // State for customization
  const [dotSize, setDotSize] = useState(9);
  const [ringSize, setRingSize] = useState(4);
  const [gridSize, setGridSize] = useState(35);
  const [animationDuration, setAnimationDuration] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  // To force re-render all at once on prop changes
  useEffect(() => {
    // Trigger any necessary side effects on prop change here
    // Force re-render by changing state (dummy state for re-rendering purpose)
  }, [dotSize, ringSize, gridSize, animationDuration, backgroundColor]);

  const props = [
    {
      property: "dotSize",
      type: "number",
      default: "9",
      description: "Size of the individual dots in the grid.",
    },
    {
      property: "ringSize",
      type: "number",
      default: "4",
      description: "Size of the ring around the dots.",
    },
    {
      property: "gridSize",
      type: "number",
      default: "35",
      description: "Size of the grid.",
    },
    {
      property: "animationDuration",
      type: "number",
      default: "2",
      description: "Duration of the animation in seconds.",
    },
    {
      property: "backgroundColor",
      type: "string",
      default: "transparent",
      description: "Background color of the grid.",
    },
  ];

  return (
    <>
      <div className="demo-box">
        {/* <div className="preview-box d-flex justify-content-center gap-3 p-10">
          <PipeGrid
            dotSize={dotSize}
            ringSize={ringSize}
            gridSize={gridSize}
            animationDuration={animationDuration}
            backgroundColor={backgroundColor}
          />
        </div> */}
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

          <PipeGrid
            dotSize={dotSize}
            ringSize={ringSize}
            gridSize={gridSize}
            animationDuration={animationDuration}
            backgroundColor={backgroundColor}
          />
        </div>

        <div className="states">
          <h3>Customization</h3>
          <p className="mb-4">
            <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md mr-2">
              Note
            </span>
            : Please modify grid size after changing dot or ring size.
          </p>
          {/* Customization UI */}
          <div className="customization-box">
            <div className="customization-item">
              <label htmlFor="dot-size" className="block text-gray-300 mb-2">
                Dot Size:
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="dot-size"
                  min="1"
                  max="20"
                  step="0.1"
                  value={dotSize}
                  onChange={(e) => setDotSize(Number(e.target.value))}
                  className="mr-3 w-full range1"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {dotSize}px
                </span>
              </div>
            </div>

            <div className="customization-item">
              <label htmlFor="ring-size" className="block text-gray-300 mb-2">
                Ring Size:
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="ring-size"
                  min="1"
                  max="20"
                  step="0.1"
                  value={ringSize}
                  onChange={(e) => setRingSize(Number(e.target.value))}
                  className="mr-3 w-full range1"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {ringSize}px
                </span>
              </div>
            </div>

            <div className="customization-item">
              <label htmlFor="grid-size" className="block text-gray-300 mb-2">
                Grid Size:
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="grid-size"
                  min="10"
                  max="100"
                  step="1"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="mr-3 w-full range1"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {gridSize}px
                </span>
              </div>
            </div>

            <div className="customization-item">
              <label
                htmlFor="animation-duration"
                className="block text-gray-300 mb-2"
              >
                Animation Duration:
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="animation-duration"
                  min="1"
                  max="10"
                  step="0.1"
                  value={animationDuration}
                  onChange={(e) => setAnimationDuration(Number(e.target.value))}
                  className="mr-3 w-full range1"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {animationDuration}s
                </span>
              </div>
            </div>
          </div>

          <h3>Props</h3>
          <PropsTable properties={props} />

          <h3>Dependencies</h3>
          <DependencyList deps={["react"]} />
        </div>
      </div>
    </>
  );
};

export default PipeGridDemo;
