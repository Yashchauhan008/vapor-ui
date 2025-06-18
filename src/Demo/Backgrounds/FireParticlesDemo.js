import { Trash2 } from "lucide-react";
import React, { useState, useCallback } from "react";
import FireParticles from "../../content/Backgrounds/FireParticles";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const useForceRerender = () => {
  const [key, setKey] = useState(0);
  const forceRerender = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);
  return [key, forceRerender];
};

const FireParticlesDemo = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const [renderKey, forceRerender] = useForceRerender();

  const [particleCount, setParticleCount] = useState(70);
  const [glowColor, setGlowColor] = useState("rgba(6, 217, 255, 0.15)");
  const [glowColorHex, setGlowColorHex] = useState("#06d9ff"); // for UI
  const [particleColors, setParticleColors] = useState(["#06d9ff"]);
  const [glowSize, setGlowSize] = useState(600);
  const [followCursor, setFollowCursor] = useState(true);

  const handleSliderChange = (setter, value) => {
    setter(value);
    forceRerender();
  };

  const handleGlowColorChange = (hex) => {
    setGlowColorHex(hex);
    setGlowColor(hex + "26"); // add transparency
    forceRerender();
  };

  const addColorInput = () => {
    setParticleColors([...particleColors, "#ffffff"]);
    forceRerender();
  };

  const removeColorInput = (index) => {
    if (particleColors.length > 1) {
      setParticleColors(particleColors.filter((_, i) => i !== index));
      forceRerender();
    }
  };

  const updateColor = (index, color) => {
    const newColors = [...particleColors];
    newColors[index] = color;
    setParticleColors(newColors);
    forceRerender();
  };

  const propsList = [
    {
      property: "particleCount",
      type: "number",
      default: "140",
      description: "Number of particles displayed in the background.",
    },
    {
      property: "glowColor",
      type: "string",
      default: '"rgba(6, 217, 255, 0.15)"',
      description: "Color of the glow effect.",
    },
    {
      property: "particleColor",
      type: "Array<string>",
      default: '["#06d9ff"]',
      description: "List of particle colors.",
    },
    {
      property: "glowSize",
      type: "number",
      default: "600",
      description: "Size of the glowing area.",
    },
    {
      property: "followCursor",
      type: "boolean",
      default: "true",
      description: "Whether the glow follows the cursor.",
    },
  ];

  const deps = ["react", "framer-motion"];

  return (
    <>
      <div className="demo-box">
        {/* Preview Container */}
        {!fullScreen && (
          <button
            onClick={() => setFullScreen(true)}
            className="btn1 relative translate-y-20 translate-x-7 rounded-full z-[200] mb-4 px-4 py-2 bg-white text-black"
          >
            Go Fullscreen
          </button>
        )}

        <div
          className={`border bg-black h-[500px] border-white/20 rounded-[40px] overflow-hidden z-[100] transition-all duration-500 ease-in-out ${
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

          <FireParticles
            key={renderKey}
            particleCount={particleCount}
            glowColor={glowColor}
            particleColor={particleColors}
            glowSize={glowSize}
            followCursor={followCursor}
          />
        </div>

        {/* Customization Controls */}
        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Particle Count */}
              <div className="customization-item">
                <label className="block text-lg font-medium text-gray-300 mb-2">
                  Particle Count
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={particleCount}
                    onChange={(e) =>
                      handleSliderChange(
                        setParticleCount,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {particleCount}
                  </span>
                </div>
              </div>

              {/* Glow Size */}
              <div className="customization-item">
                <label className="block text-lg font-medium text-gray-300 mb-2">
                  Glow Size
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={glowSize}
                    onChange={(e) =>
                      handleSliderChange(setGlowSize, parseInt(e.target.value))
                    }
                    className="w-full mr-3 range1"
                  />
                  <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                    {glowSize}
                  </span>
                </div>
              </div>

              {/* Glow Color */}
              <div className="customization-item">
                <label className="block text-lg font-medium text-gray-300 mb-2">
                  Glow Color:
                </label>

                <div className="flex items-center space-x-3">
                  {/* Color Picker Box */}
                  <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                    <input
                      type="color"
                      value={glowColorHex}
                      onChange={(e) => handleGlowColorChange(e.target.value)}
                      className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0 opacity-100"
                    />
                  </div>

                  {/* Hex Code Input */}
                  <input
                    type="text"
                    value={glowColorHex}
                    onChange={(e) => handleGlowColorChange(e.target.value)}
                    className="rounded bg-gray-700 text-white border border-gray-600 px-2 py-1 text-sm w-24"
                  />
                </div>
              </div>

              {/* Follow Cursor Toggle */}
              <div className="customization-item">
                <label className="text-white block mb-1">Follow Cursor</label>
                <button
                  onClick={() => {
                    setFollowCursor((prev) => !prev);
                    forceRerender();
                  }}
                  className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ${
                    followCursor ? "bg-blue-400" : "bg-gray-800"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ${
                      followCursor ? "translate-x-8" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Particle Colors */}
              <div className="customization-item">
                <label className="block text-lg font-medium text-gray-300 mb-2">
                  Particle Colors:
                </label>

                {/* Add Color Button */}
                <button
                  onClick={addColorInput}
                  className="mb-4 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm text-sm transition"
                >
                  + Add Color
                </button>

                {/* Row-wise color pickers */}
                <div className="flex flex-wrap gap-4">
                  {particleColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg shadow"
                    >
                      {/* Color Picker Box */}
                      <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0 opacity-100"
                        />
                      </div>

                      {/* Hex Code Input */}
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="rounded bg-gray-700 text-white border border-gray-600 px-2 py-1 text-sm w-24"
                      />

                      {/* Remove Button */}
                      <button
                        onClick={() => removeColorInput(index)}
                        className="text-red-400 hover:text-red-600 transition"
                        title="Remove"
                      >
                        <Trash2 size={16} className="cursor-pointer" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Props Table & Dependencies */}
            <h3 className="text-xl font-semibold mb-4">Props</h3>
            <PropsTable properties={propsList} />

            <h3 className="text-xl font-semibold mb-4 mt-8">Dependencies</h3>
            <DependencyList deps={deps} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FireParticlesDemo;
