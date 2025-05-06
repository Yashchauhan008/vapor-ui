import React, { useState, useRef } from "react";
import { TextWaveReveal } from "../../content/TextAnimation/TextWaveReveal";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const TextWaveRevealDemo = () => {
  const [animationConfig, setAnimationConfig] = useState({
    duration: 0.8,
    ease: "elastic.out(1,0.3)",
    scrollStart: "top 80%",
    stagger: 0.05,
    textColor: "text-white",
    fontSize: "text-3xl",
    fontWeight: "font-bold",
    waveHeight: 20,
    waveFrequency: 3
  });

  const props = [
    {
      property: "children",
      type: "string",
      default: "-",
      description: "The text content to animate"
    },
    {
      property: "scrollContainerRef",
      type: "React.RefObject",
      default: "null",
      description: "Optional ref to a scroll container"
    },
    {
      property: "containerClassName",
      type: "string",
      default: "\"\"",
      description: "CSS classes for the container"
    },
    {
      property: "animationDuration",
      type: "number",
      default: 0.8,
      description: "Duration of the animation in seconds"
    },
    {
      property: "ease",
      type: "string",
      default: "\"power3.out\"",
      description: "GSAP easing function"
    },
    {
      property: "scrollStart",
      type: "string",
      default: "\"top 90%\"",
      description: "ScrollTrigger start position"
    },
    {
      property: "stagger",
      type: "number",
      default: 0.02,
      description: "Time between each character animation"
    },
    {
      property: "waveHeight",
      type: "number",
      default: 20,
      description: "Height of the wave motion in pixels"
    },
    {
      property: "waveFrequency",
      type: "number",
      default: 3,
      description: "Frequency of the wave oscillation"
    }
  ];
  

  const scrollContainerRef = useRef(null);

  // Sample paragraph text
  const paragraphText = "Another writing challenge can be to take the individual sentences in the random paragraph and incorporate a single sentence from that into a new paragraph to create a short story. Unlike the random sentence generator, the sentences from the random paragraph will have some connection to one another so it will be a bit different. You also won't know exactly how many sentences will appear in the random paragraph.";

  // Available options for dropdown selects
  const easeOptions = ["elastic.out(1,0.3)","power1.out", "power2.out", "power3.out", "power4.out", "back.out", "elastic.out", "bounce.out"];
  const colorOptions = ["text-gray-800", "text-blue-500", "text-red-500", "text-green-500", "text-purple-500", "text-yellow-500"];
  const fontSizeOptions = ["text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl"];
  const fontWeightOptions = ["font-normal", "font-medium", "font-semibold", "font-bold"];

  // Handle configuration changes
  const handleConfigChange = (key, value) => {
    setAnimationConfig(prev => ({
      ...prev,
      [key]: ["duration", "stagger", "waveHeight", "waveFrequency"].includes(key) ? parseFloat(value) : value
    }));
  };

  // Function to reset the demo - useful to re-trigger animations
  const resetDemo = () => {
    const currentContent = scrollContainerRef.current.innerHTML;
    scrollContainerRef.current.innerHTML = '';
    setTimeout(() => {
      scrollContainerRef.current.innerHTML = currentContent;
    }, 100);
  };

  // Combine classes for container
  const containerClasses = `${animationConfig.fontSize} ${animationConfig.fontWeight} ${animationConfig.textColor}`;

  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center p-8" ref={scrollContainerRef}>
          <div className="space-y-32 p-6 w-full">
            <TextWaveReveal
              containerClassName={containerClasses}
              animationDuration={animationConfig.duration}
              ease={animationConfig.ease}
              scrollStart={animationConfig.scrollStart}
              stagger={animationConfig.stagger}
              waveHeight={animationConfig.waveHeight}
              waveFrequency={animationConfig.waveFrequency}
            >
              {paragraphText}
            </TextWaveReveal>
          </div>
        </div>

        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Animation Duration</label>
              <div className="flex items-center">
              <input 
                type="range" 
                min="0.1" 
                max="3" 
                step="0.1" 
                value={animationConfig.duration} 
                onChange={(e) => handleConfigChange("duration", e.target.value)}
                className="w-full range1 mr-3"
              />
              
              <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">{animationConfig.duration}s</span>
            </div>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Stagger Delay</label>
              <div className="flex items-center">
              <input 
                type="range" 
                min="0.01" 
                max="0.2" 
                step="0.01" 
                value={animationConfig.stagger} 
                onChange={(e) => handleConfigChange("stagger", e.target.value)}
                className="w-full range1 mr-3"
              />
              
              <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">{animationConfig.stagger}s</span>
            </div>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Wave Height</label>
              <div className="flex items-center">
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="5" 
                value={animationConfig.waveHeight} 
                onChange={(e) => handleConfigChange("waveHeight", e.target.value)}
                className="w-full range1 mr-3"
              />
              
              <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">{animationConfig.waveHeight}px</span>
            </div>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Wave Frequency</label>
              <div className="flex items-center">
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="1" 
                value={animationConfig.waveFrequency} 
                onChange={(e) => handleConfigChange("waveFrequency", e.target.value)}
                className="w-full range1 mr-3"
              />
              
              <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">{animationConfig.waveFrequency}</span>
            </div>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Easing</label>
              <select 
                value={animationConfig.ease} 
                onChange={(e) => handleConfigChange("ease", e.target.value)}
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {easeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="customization-item">
              <label className="block text-gray-300 mb-2">Scroll Start Trigger</label>
              <select 
                value={animationConfig.scrollStart} 
                onChange={(e) => handleConfigChange("scrollStart", e.target.value)}
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
                onChange={(e) => handleConfigChange("textColor", e.target.value)}
                className="w-full mt-2 p-2 rounded-md bg-gray-800 text-white"
              >
                {colorOptions.map(option => (
                  <option key={option} value={option}>{option.replace('text-', '')}</option>
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
                {fontSizeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <h3>Props</h3>
                <PropsTable properties={props}/>

          <h3>Dependencies</h3>
          <DependencyList deps={["GSAP", "React"]} />

        </div>
      </div>
    </>
  );
};

export default TextWaveRevealDemo;