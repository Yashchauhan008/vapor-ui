import React, { useState } from "react";
import SparklesTitle from "../../content/TextAnimation/SparklesTitle";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const SparklesTitleDemo = () => {
  // State for customization
  const [config, setConfig] = useState({
    text: "Amazing Title",
    sparklesCount: 30,
    textSize: "text-8xl",
    fontWeight: "font-bold",
    animationDuration: 0.8,
    updateInterval: 100,
    paused: false,
    as: "div",
    sparkleSize: 21,
    useCustomSvg: false,
  });

  const [colors, setColors] = useState(["#ff6b6b", "#01ebff"]);

  // Handle color changes
  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  // Handle config changes
  const handleConfigChange = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Text size options
  const textSizeOptions = [
    { value: "text-2xl", label: "2XL" },
    { value: "text-3xl", label: "3XL" },
    { value: "text-4xl", label: "4XL" },
    { value: "text-5xl", label: "5XL" },
    { value: "text-6xl", label: "6XL" },
    { value: "text-7xl", label: "7XL" },
    { value: "text-8xl", label: "8XL" },
    { value: "text-9xl", label: "9XL" },
  ];

  // Font weight options
  const fontWeightOptions = [
    { value: "font-light", label: "Light" },
    { value: "font-normal", label: "Normal" },
    { value: "font-medium", label: "Medium" },
    { value: "font-semibold", label: "Semibold" },
    { value: "font-bold", label: "Bold" },
    { value: "font-extrabold", label: "Extrabold" },
    { value: "font-black", label: "Black" },
  ];

  // HTML element options
  const elementOptions = [
    { value: "div", label: "div" },
    { value: "h1", label: "h1" },
    { value: "h2", label: "h2" },
    { value: "h3", label: "h3" },
    { value: "span", label: "span" },
    { value: "p", label: "p" },
  ];

  const props = [
    {
      property: "as",
      type: "string",
      default: '"div"',
      description: "HTML element to use as the wrapper (e.g., 'span', 'h1').",
    },
    {
      property: "text",
      type: "string",
      default: "Required",
      description: "The text content to display with sparkles.",
    },
    {
      property: "colors",
      type: "object",
      default: '{ primary: "#9E7AFF", secondary: "#FE8BBB" }',
      description:
        "Object with primary and secondary color strings for sparkles.",
    },
    {
      property: "colors.primary",
      type: "string",
      default: '"#9E7AFF"',
      description: "Primary sparkle color.",
    },
    {
      property: "colors.secondary",
      type: "string",
      default: '"#FE8BBB"',
      description: "Secondary sparkle color.",
    },
    {
      property: "className",
      type: "string",
      default: '""',
      description: "Additional custom CSS class names for the wrapper element.",
    },
    {
      property: "sparklesCount",
      type: "number",
      default: 10,
      description: "Number of sparkles rendered simultaneously.",
    },
    {
      property: "sparkleSize",
      type: "number",
      default: 21,
      description: "Size of each sparkle element in pixels.",
    },
    {
      property: "customSvg",
      type: "function",
      default: "null",
      description:
        "Custom SVG function that receives color as parameter. Returns JSX for custom sparkle shape.",
    },
    {
      property: "textSize",
      type: "string",
      default: '"text-6xl"',
      description: "Tailwind or custom class name to control text size.",
    },
    {
      property: "fontWeight",
      type: "string",
      default: '"font-bold"',
      description: "Tailwind or custom class name for font weight.",
    },
    {
      property: "animationDuration",
      type: "number",
      default: 0.8,
      description: "Duration of each sparkle animation in seconds.",
    },
    {
      property: "updateInterval",
      type: "number",
      default: 100,
      description: "Interval (ms) to check and update sparkles' lifespan.",
    },
    {
      property: "paused",
      type: "boolean",
      default: false,
      description: "Whether the sparkle animation should be paused.",
    },
    {
      property: "style",
      type: "object",
      default: "{}",
      description: "Inline styles for the wrapper element.",
    },
    {
      property: "...props",
      type: "object",
      default: "–",
      description: "Additional props passed to the wrapper element.",
    },
  ];

  // Custom SVG examples
  const heartSvg = (color) => (
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color}
    />
  );

  const circleSvg = (color) => (
    <circle cx="10.5" cy="10.5" r="8" fill={color} />
  );

  const diamondSvg = (color) => (
    <path d="M10.5 2L16 10.5L10.5 19L5 10.5L10.5 2Z" fill={color} />
  );

  // Get the appropriate custom SVG based on selection
  const getCustomSvg = () => {
    if (!config.useCustomSvg) return null;

    // You can extend this to have multiple custom SVG options
    return heartSvg;
  };

  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
          <SparklesTitle
            as={config.as}
            text={config.text}
            colors={{
              primary: colors[0],
              secondary: colors[1],
            }}
            customSvg={getCustomSvg()}
            sparklesCount={config.sparklesCount}
            sparkleSize={config.sparkleSize}
            textSize={config.textSize}
            fontWeight={config.fontWeight}
            animationDuration={config.animationDuration}
            updateInterval={config.updateInterval}
            paused={config.paused}
            className="text-center"
          />
        </div>

        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Text Input */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Text:</label>
              <input
                type="text"
                value={config.text}
                onChange={(e) => handleConfigChange("text", e.target.value)}
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
                placeholder="Enter your text"
              />
            </div>

            {/* HTML Element Selector */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">HTML Element:</label>
              <select
                value={config.as}
                onChange={(e) => handleConfigChange("as", e.target.value)}
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {elementOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Text Size Selector */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Text Size:</label>
              <select
                value={config.textSize}
                onChange={(e) => handleConfigChange("textSize", e.target.value)}
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {textSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Weight Selector */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Font Weight:</label>
              <select
                value={config.fontWeight}
                onChange={(e) =>
                  handleConfigChange("fontWeight", e.target.value)
                }
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {fontWeightOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sparkles Count Slider */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">
                Sparkles Count: {config.sparklesCount}
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={config.sparklesCount}
                  onChange={(e) =>
                    handleConfigChange(
                      "sparklesCount",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full range1 mr-3"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {config.sparklesCount}
                </span>
              </div>
            </div>

            {/* Sparkle Size Slider - FIXED */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">
                Sparkle Size: {config.sparkleSize}px
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={config.sparkleSize}
                  onChange={(e) =>
                    handleConfigChange("sparkleSize", parseInt(e.target.value))
                  }
                  className="w-full range1 mr-3"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {config.sparkleSize}px
                </span>
              </div>
            </div>

            {/* Animation Duration Slider */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">
                Animation Duration
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={config.animationDuration}
                  onChange={(e) =>
                    handleConfigChange(
                      "animationDuration",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full range1 mr-3"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {config.animationDuration}s
                </span>
              </div>
            </div>

            {/* Update Interval Slider */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">
                Update Interval
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={config.updateInterval}
                  onChange={(e) =>
                    handleConfigChange(
                      "updateInterval",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full range1 mr-3"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {config.updateInterval}ms
                </span>
              </div>
            </div>

            {/* Custom SVG Toggle */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Custom Shape:</label>
              <div className="flex items-center">
              <label class="cbox">
                <input
                  type="checkbox"
                  checked={config.useCustomSvg}
                  onChange={(e) =>
                    handleConfigChange("useCustomSvg", e.target.checked)
                  }
                  className="mr-2"
                />
                <div class="checkmark"></div>
                </label>

                <span className="pl-5 text-gray-300">
                  {config.useCustomSvg ? "Hearts" : "Default Stars"}
                </span>
              </div>
            </div>

            {/* Pause Animation Toggle */}
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Animation:</label>
              <div className="flex items-center">
                <label class="cbox">
                  <input
                    type="checkbox"
                    checked={config.paused}
                    onChange={(e) =>
                      handleConfigChange("paused", e.target.checked)
                    }
                    className="mr-2"
                  />
                    <div class="checkmark"></div>
                </label>
                <span className="pl-5 text-gray-300">
                  {config.paused ? "Paused" : "Playing"}
                </span>
              </div>
            </div>

            {/* Color Inputs */}
            <div className="customization-item col-span-2">
              <label className="block text-gray-300 mb-2">Colors:</label>
              <div className="flex items-start justify-start gap-6">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <label className="block text-gray-300 text-sm">
                      {index === 0 ? "Primary:" : "Secondary:"}
                    </label>
                    <div className="relative w-8 h-8 overflow-hidden rounded shadow-sm">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className="absolute inset-0 cursor-pointer w-10 h-10 -m-1 p-0 border-0 opacity-100"
                      />
                    </div>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="rounded bg-transparent px-2 py-1 text-sm w-24 border border-gray-600"
                    />
                  </div>
                ))}
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

export default SparklesTitleDemo;
