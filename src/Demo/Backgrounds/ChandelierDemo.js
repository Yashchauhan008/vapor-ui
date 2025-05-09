import React, { useState, useEffect } from "react";
import Chandelier from "../../content/Backgrounds/Chandelier";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const ChandelierDemo = () => {
  const [ropeColor, setRopeColor] = useState("#ffffff");
  const [lightColor, setLightColor] = useState("#01EBFF");
  const [key, setKey] = useState(0); // Key for forcing re-render

  // Force re-render when colors change
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [ropeColor, lightColor]);

  const props = [
    {
      property: "ropeColor",
      type: "string",
      default: "'#ffffff'",
      description: "Hex color code for the rope elements of the chandelier",
    },
    {
      property: "lightColor",
      type: "string",
      default: "'#ffcc00'",
      description: "Hex color code for the light bulbs and glow effect",
    },
  ];

  const deps = ["React"];

  // Color input handler
  const handleColorChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <>
      <div className="demo-box">
        <div className="preview-box" style={{ paddingTop: "0px" }}>
          <Chandelier 
            key={key} 
            ropeColor={ropeColor} 
            lightColor={lightColor} 
          />
        </div>
        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box rounded-lg p-4 mb-6 bg-transparent shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="customization-item">
                <label className="block text-lg font-medium text-gray-300 mb-1">
                  Rope Color
                </label>
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                    <input
                      type="color"
                      value={ropeColor}
                      onChange={handleColorChange(setRopeColor)}
                      className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0 opacity-100"
                    />
                  </div>
                  <div
                    type="text"
                    onChange={handleColorChange(setRopeColor)}
                    className="rounded bg-transparent px-2 py-1 text-sm w-24"
                  >
                    {ropeColor}
                    </div>
                </div>
              </div>
              <div className="customization-item">
                <label className="block text-lg font-medium text-gray-300 mb-1">
                  Light Color
                </label>
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={handleColorChange(setLightColor)}
                      className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0 opacity-100"
                    />
                  </div>
                  <div
                    type="text"
                    onChange={handleColorChange(setLightColor)}
                    className="rounded bg-transparent px-2 py-1 text-sm w-24"
                  >
                    {lightColor}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3>Props</h3>
          <PropsTable properties={props} />
          <h3>Dependencies</h3>
          <DependencyList deps={deps} />
        </div>
      </div>
    </>
  );
};

export default ChandelierDemo;