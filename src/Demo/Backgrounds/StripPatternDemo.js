import React, { useState } from "react";
import StripPattern from "../../content/Backgrounds/StripPattern";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const StripPatternDemo = () => {
  const [title, setTitle] = useState("Background 1");
  const [colors, setColors] = useState(["#b3b2ff", "#c08aff", "#ffd6fa", "#ff97c5", "#ffecec"]);
  const [stripWidth, setStripWidth] = useState(24); 

  // Safe color change handler with null checks
  const handleColorChange = (index, value) => {
    if (!colors) return;
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const props = [
    { property: "children", type: "ReactNode", default: "undefined", description: "Content to be rendered inside the striped background." },
    { property: "degree", type: "number", default: "-45", description: "Angle (in degrees) for the diagonal strip direction." },
    { property: "color1", type: "string", default: "#b3b2ff", description: "First stripe color in the repeating pattern." },
    { property: "color2", type: "string", default: "#c08aff", description: "Second stripe color in the repeating pattern." },
    { property: "color3", type: "string", default: "#ffd6fa", description: "Third stripe color in the repeating pattern." },
    { property: "color4", type: "string", default: "#ff97c5", description: "Fourth stripe color in the repeating pattern." },
    { property: "color5", type: "string", default: "#ffecec", description: "Fifth stripe color in the repeating pattern." },
    { property: "stripWidth", type: "number", default: "24", description: "Width of each individual stripe in pixels." },
    { property: "className", type: "string", default: "\"\"", description: "Additional class for the outermost container div." },
    { property: "innerClassName", type: "string", default: "\"\"", description: "Additional class for the inner striped div." },
    { property: "style", type: "object", default: "{}", description: "Additional inline styles for the outer container." },
    { property: "innerStyle", type: "object", default: "{}", description: "Additional inline styles for the inner striped div." },
    { property: "minHeight", type: "string", default: "\"100%\"", description: "Minimum height for the inner striped div." },
    { property: "borderRadius", type: "string", default: "\"0.5rem\"", description: "Border radius for the inner striped div." },
    { property: "shadow", type: "string", default: "\"0 10px 15px rgba(0, 0, 0, 0.1)\"", description: "Box shadow for the inner striped div." }
  ];

  // Add a defensive check for colors
  const safeColors = colors || ["#b3b2ff", "#c08aff", "#ffd6fa", "#ff97c5", "#ffecec"];

  return (
    <>
      <div className="demo-box">
        <div className="preview-box flex justify-content-center gap-3 p-10">
          <StripPattern
            color1={safeColors[0]}
            color2={safeColors[1]}
            color3={safeColors[2]}
            color4={safeColors[3]}
            color5={safeColors[4]}
            stripWidth={stripWidth}
          >
            <div className="flex items-center justify-center h-full min-h-[500px]">
              <h1 className="text-white font-bold text-5xl">
                {title}
              </h1>
            </div>
          </StripPattern>
        </div>

        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box space-y-6">
            <div className="customization-item">
              <label htmlFor="title" className="block text-white">Title:</label>
              <input 
                type="text" 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="mt-2 p-2 rounded-md bg-gray-800 text-white" 
              />
            </div>
            <div className="customization-item">
              <label htmlFor="strip-width" className="block text-white mb-2">Strip Width:</label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="strip-width"
                  min="5"
                  max="50"
                  step="1"
                  value={stripWidth}
                  onChange={(e) => setStripWidth(Number(e.target.value))}
                  className="mr-3 w-full range1"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-[3rem] text-center">
                  {stripWidth}px
                </span>
              </div>
            </div>

            <div className="customization-item">
              <label className="block text-lg font-medium text-gray-300 mb-1">Colors:</label>
              <div className="flex flex-wrap gap-4">
                {safeColors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0 opacity-100"
                      />
                    </div>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="rounded bg-transparent px-2 py-1 text-sm w-24"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="mt-8">Props</h3>
          <PropsTable properties={props} />

          <h3 className="mt-8">Dependencies</h3>
          <DependencyList deps={["react"]} />
        </div>
      </div>
    </>
  );
};

export default StripPatternDemo;