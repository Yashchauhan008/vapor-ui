import React, { useState } from "react";
import AuroraTitle from "../../content/TextAnimation/AuroraTitle";
import DependencyList from "../../components/DependencyList";
import PropsTable from "../../components/PropTable";

const AuroraTitleDemo = () => {
  // State to manage customization inputs
  const [title, setTitle] = useState("Aurora Magic");
  const [colors, setColors] = useState([
    "#00c2ff",
    "#ffc640",
    "#33ff8c",
    "#e54cff",
  ]);
  const [fontSize, setFontSize] = useState("8rem");
  const [blur, setBlur] = useState("1.5rem");
  const [animationDuration, setAnimationDuration] = useState(12);
  const [fontWeight, setFontWeight] = useState("extrabold");

  // Handle input changes for color pickers and text inputs
  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };


  const props = [
    {
      property: "title",
      type: "string",
      default: `"the beautiful aurora"`,
      description: "The text that will be displayed as the title in the component."
    },
    {
      property: "colors",
      type: "array of strings",
      default: `["#00c2ff", "#ffc640", "#33ff8c", "#e54cff"]`,
      description: "An array of color values (in hex format) for the aurora effect. Each color corresponds to an animation layer."
    },
    {
      property: "fontSize",
      type: "string",
      default: `"clamp(3rem, 8vw, 7rem)"`,
      description: "The CSS `font-size` property that controls the size of the title text. You can use any valid CSS size unit or the `clamp()` function."
    },
    {
      property: "blur",
      type: "string",
      default: `"1rem"`,
      description: "The blur effect applied to the aurora background layers. You can adjust the value to control the intensity of the blur."
    },
    {
      property: "animationDuration",
      type: "number",
      default: `12`,
      description: "The duration of the aurora animation in seconds. This controls how fast the aurora layers animate."
    },
    {
      property: "fontWeight",
      type: "string",
      default: `"extrabold"`,
      description: "The font weight applied to the title text. It can be any valid font weight, such as `light`, `normal`, `bold`, or `extrabold`."
    }
  ];
  

  return (
    <div className="demo-box">
      {/* Preview Box */}
      <div className="preview-box d-flex justify-content-center gap-3 p-10">
        <div className="bg-black text-white flex flex-col items-center justify-center space-y-12">
          <h1 className="text-center">
            <AuroraTitle
              title={title}
              colors={colors}
              fontSize={fontSize}
              blur={blur}
              animationDuration={animationDuration}
              fontWeight={fontWeight}
            />
          </h1>
        </div>
      </div>

      {/* Customization Controls */}
      <div className="states">
        <h3>Customization</h3>
        <div className="customization-box space-y-6">
          {/* Title Input */}
          <div className="customization-item">
            <label htmlFor="title" className="block text-white">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          {/* Color Inputs */}
          <div className="customization-item">
            <label className="block text-lg font-medium text-gray-300 mb-1">
              Colors:
            </label>
            {colors.map((color, index) => (
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
                  className="rounded bg-transparent px-2 py-1 text-sm w-24 mb-3"
                />
              </div>
            ))}
          </div>

          {/* Font Size Slider */}
          <div className="customization-item">
            <label htmlFor="font-size" className="block text-white mb-2">
              Font Size:
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="font-size"
                min="1"
                max="10"
                step="0.1"
                value={parseFloat(fontSize)}
                onChange={(e) => setFontSize(`${e.target.value}rem`)}
                className="mr-3 w-full range1"
              />
              <span className="text-white">{parseFloat(fontSize)}rem</span>
            </div>
          </div>

          {/* Animation Duration Slider */}
          <div className="customization-item">
            <label htmlFor="animation-duration" className="block text-white">
              Animation Duration (s):
            </label>
            <input
              type="range"
              id="animation-duration"
              min="2"
              max="20"
              value={animationDuration}
              onChange={(e) => setAnimationDuration(Number(e.target.value))}
              className="mr-2 w-full range1"
            />
            <span className="text-white">{animationDuration}s</span>
          </div>

          {/* Blur Slider */}
          <div className="customization-item">
            <label htmlFor="blur" className="block text-white">
              Blur:
            </label>
            <input
              type="range"
              id="blur"
              min="0"
              max="3"
              step="0.1"
              value={parseFloat(blur)}
              onChange={(e) => setBlur(`${e.target.value}rem`)}
              className="mr-2 w-full range1"
            />
            <span className="text-white">{parseFloat(blur)}rem</span>
          </div>

          {/* Font Weight Dropdown */}
          <div className="customization-item">
            <label htmlFor="font-weight" className="block text-white">
              Font Weight:
            </label>
            <select
              id="font-weight"
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="mt-2 p-2 rounded-md bg-gray-800 text-white"
            >
              <option value="light">Light</option>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="extrabold">ExtraBold</option>
            </select>
          </div>
        </div>
        <h3 className="text-xl font-medium mb-4">Props</h3>
            <PropsTable properties={props}/>
        <h3 className="text-xl font-medium mb-4">Dependencies</h3>
        <DependencyList deps={["react"]} />
      </div>
    </div>
  );
};

export default AuroraTitleDemo;
