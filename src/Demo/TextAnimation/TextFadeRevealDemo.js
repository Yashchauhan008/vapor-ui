import React, { useState, useRef } from "react";
import { TextFadeReveal } from "../../content/TextAnimation/TextFadeReveal";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const TextFadeRevealDemo = () => {
  const [animationConfig, setAnimationConfig] = useState({
    duration: 1,
    ease: "power2.out",
    scrollStart: "top 80%",
    stagger: 0.05,
    textColor: "text-white",
    fontSize: "text-4xl",
    fontWeight: "font-bold",
  });

  const scrollContainerRef = useRef(null);

  // Sample paragraph text
  const paragraphText =
    "A random paragraph can also be an excellent way for a writer to tackle writers' block. Writing block can often happen due to being stuck with a current project that the writer is trying to complete. By inserting a completely random paragraph from which to begin, it can take down some of the issues that may have been causing the writers' block in the first place.";

  // Available options for dropdown selects
  const easeOptions = [
    "power1.out",
    "power2.out",
    "power3.out",
    "power4.out",
    "back.out",
    "elastic.out",
    "bounce.out",
  ];
  const colorOptions = [
    "text-blue-500",
    "text-red-500",
    "text-green-500",
    "text-purple-500",
    "text-yellow-500",
  ];
  const fontSizeOptions = [
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
  ];
  const fontWeightOptions = [
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
  ];

  const props = [
    {
      property: "children",
      type: "string",
      default: "-",
      description: "The text content to animate",
    },
    {
      property: "scrollContainerRef",
      type: "React.RefObject",
      default: "null",
      description: "Optional ref to a scroll container",
    },
    {
      property: "containerClassName",
      type: "string",
      default: '""',
      description: "CSS classes for the container",
    },
    {
      property: "textClassName",
      type: "string",
      default: '""',
      description: "CSS classes for the text",
    },
    {
      property: "animationDuration",
      type: "number",
      default: 0.8,
      description: "Duration of the animation in seconds",
    },
    {
      property: "ease",
      type: "string",
      default: '"power3.out"',
      description: "GSAP easing function",
    },
    {
      property: "scrollStart",
      type: "string",
      default: '"top 90%"',
      description: "ScrollTrigger start position",
    },
    {
      property: "stagger",
      type: "number",
      default: 0.02,
      description: "Time between each character animation",
    },
  ];

  // Handle configuration changes
  const handleConfigChange = (key, value) => {
    setAnimationConfig((prev) => ({
      ...prev,
      [key]:
        key === "duration" || key === "stagger" ? parseFloat(value) : value,
    }));
  };

  // Function to reset the demo - useful to re-trigger animations
  const resetDemo = () => {
    const currentContent = scrollContainerRef.current.innerHTML;
    scrollContainerRef.current.innerHTML = "";
    setTimeout(() => {
      scrollContainerRef.current.innerHTML = currentContent;
    }, 100);
  };

  return (
    <>
      <div className="demo-box">
        <div
          className="preview-box d-flex justify-content-center p-8"
          ref={scrollContainerRef}
        >
          <div className="space-y-32 w-full p-6">
            <TextFadeReveal
              containerClassName={`${animationConfig.fontSize} ${animationConfig.fontWeight}`}
              textClassName={animationConfig.textColor}
              animationDuration={animationConfig.duration}
              ease={animationConfig.ease}
              scrollStart={animationConfig.scrollStart}
              stagger={animationConfig.stagger}
            >
              {paragraphText}
            </TextFadeReveal>
          </div>
        </div>

        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
                  value={animationConfig.duration}
                  onChange={(e) =>
                    handleConfigChange("duration", e.target.value)
                  }
                  className="w-full mr-3 range1"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {animationConfig.duration}
                </span>
              </div>
            </div>

            <br />
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Stagger Delay</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={animationConfig.stagger}
                  onChange={(e) =>
                    handleConfigChange("stagger", e.target.value)
                  }
                  className="w-full range1 mr-3"
                />
                <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
                  {animationConfig.stagger}s
                </span>
              </div>
            </div>
            <br />

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Easing</label>
              <select
                value={animationConfig.ease}
                onChange={(e) => handleConfigChange("ease", e.target.value)}
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {easeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">
                Scroll Start Trigger
              </label>
              <select
                value={animationConfig.scrollStart}
                onChange={(e) =>
                  handleConfigChange("scrollStart", e.target.value)
                }
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                <option value="top 90%">Very Early (top 90%)</option>
                <option value="top 80%">Early (top 80%)</option>
                <option value="top 65%">Standard (top 65%)</option>
                <option value="top 50%">Middle (top 50%)</option>
                <option value="top 30%">Late (top 30%)</option>
              </select>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Text Color</label>
              <select
                value={animationConfig.textColor}
                onChange={(e) =>
                  handleConfigChange("textColor", e.target.value)
                }
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {colorOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.replace("text-", "")}
                  </option>
                ))}
              </select>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Font Size</label>
              <select
                value={animationConfig.fontSize}
                onChange={(e) => handleConfigChange("fontSize", e.target.value)}
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {fontSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h3>Props</h3>
          <PropsTable properties={props} />

          <h3>Dependencies</h3>
          <DependencyList deps={["GSAP", "React"]} />
        </div>
      </div>
    </>
  );
};

export default TextFadeRevealDemo;
