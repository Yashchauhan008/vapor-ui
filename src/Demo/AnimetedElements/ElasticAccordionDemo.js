import React, { useState } from "react";
import ElasticAccordion from "../../content/AnimatedElements/ElasticAccordion";
import human1 from "../../assets/images/ElasticAcordianEmages/human3.webp";
import human2 from "../../assets/images/ElasticAcordianEmages/human2.webp";
import human3 from "../../assets/images/ElasticAcordianEmages/human1.webp";
import human4 from "../../assets/images/ElasticAcordianEmages/human4.webp";
import useForceUpdate from "../../hooks/useForceUpdate";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const ElasticAccordionDemo = () => {
  const images = [human1, human2, human3, human4];
  const [defaultWidth, setDefaultWidth] = useState("10vw");
  const [expandedWidth, setExpandedWidth] = useState("35vw");
  const [height, setHeight] = useState("60vh");
  const [expandEase, setExpandEase] = useState("50");
  const [collapseEase, setCollapseEase] = useState("40");
  const forceUpdate = useForceUpdate();


  const props = [
    {
      property: "images",
      type: "string[]",
      default: "[]",
      description: "An array of image URLs or imports to be displayed in the accordion."
    },
    {
      property: "defaultWidth",
      type: "string (CSS width - e.g. '10vw')",
      default: "'10vw'",
      description: "Width of each accordion item when collapsed."
    },
    {
      property: "expandedWidth",
      type: "string (CSS width - e.g. '35vw')",
      default: "'35vw'",
      description: "Width of the hovered/expanded accordion item."
    },
    {
      property: "height",
      type: "string (CSS height - e.g. '60vh')",
      default: "'60vh'",
      description: "Total height of the accordion component."
    },
    {
      property: "expandEase",
      type: "string | number",
      default: "'50'",
      description: "Animation easing speed when an item expands."
    },
    {
      property: "collapseEase",
      type: "string | number",
      default: "'40'",
      description: "Animation easing speed when an item collapses."
    }
  ];

  const deps = ["react", "gsap"]
  
  return (
    <div className="demo-box">
      <div className="preview-box" style={{ paddingTop: "70px" }}>
        <ElasticAccordion
          images={images}
          defaultWidth={defaultWidth}
          expandedWidth={expandedWidth}
          height={height}
          expandEase={expandEase}
          collapseEase={collapseEase}
          key={forceUpdate.value}
        />
      </div>
      <div className="states">
        <h3>Customization</h3>
        
        <div className="customization-item">
          <label className="block text-gray-300 mb-2">
            Default Width
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="50"
              value={parseInt(defaultWidth.replace("vw", ""))}
              onChange={(e) => {
                setDefaultWidth(e.target.value + "vw");
                forceUpdate.update();
              }}
              className="w-full mr-3 range1"
            />
            <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
              {parseInt(defaultWidth.replace("vw", ""))}
            </span>
          </div>
        </div>

        <div className="customization-item">
          <label className="block text-gray-300 mb-2">
            Expanded Width
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="70"
              value={parseInt(expandedWidth.replace("vw", ""))}
              onChange={(e) => {
                setExpandedWidth(e.target.value + "vw");
                forceUpdate.update();
              }}
              className="w-full mr-3 range1"
            />
            <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
              {parseInt(expandedWidth.replace("vw", ""))}
            </span>
          </div>
        </div>

        <div className="customization-item">
          <label className="block text-gray-300 mb-2">
            Height
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="100"
              value={parseInt(height.replace("vh", ""))}
              onChange={(e) => {
                setHeight(e.target.value + "vh");
                forceUpdate.update();
              }}
              className="w-full mr-3 range1"
            />
            <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
              {parseInt(height.replace("vh", ""))}
            </span>
          </div>
        </div>

        <div className="customization-item">
          <label className="block text-gray-300 mb-2">
            Expand Ease
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="100"
              value={expandEase}
              onChange={(e) => {
                setExpandEase(e.target.value);
                forceUpdate.update();
              }}
              className="w-full mr-3 range1"
            />
            <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
              {expandEase}
            </span>
          </div>
        </div>

        <div className="customization-item">
          <label className="block text-gray-300 mb-2">
            Collapse Ease
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="100"
              value={collapseEase}
              onChange={(e) => {
                setCollapseEase(e.target.value);
                forceUpdate.update();
              }}
              className="w-full mr-3 range1"
            />
            <span className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md min-w-8 text-center">
              {collapseEase}
            </span>
          </div>
        </div>
        
        <h3>Props</h3>
        <PropsTable properties={props}/>
        <h3>Dependencies</h3>
        <DependencyList deps={deps}/>
      </div>
    </div>
  );
};

export default ElasticAccordionDemo;