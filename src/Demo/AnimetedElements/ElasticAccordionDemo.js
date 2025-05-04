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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Width : {defaultWidth}
          </label>
          <input
            type="range"
            min="1"
            max="50"
            className="range1"
            value={parseInt(defaultWidth.replace("vw", ""))}
            onChange={(e) => {
              setDefaultWidth(e.target.value + "vw");
              forceUpdate.update();
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expanded Width : {expandedWidth}
          </label>
          <input
            type="range"
            min="1"
            max="70"
            value={parseInt(expandedWidth.replace("vw", ""))}
            onChange={(e) => {
              setExpandedWidth(e.target.value + "vw");
              forceUpdate.update();
            }}
            className="range1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height : {height}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={parseInt(height.replace("vh", ""))}
            onChange={(e) => {
              setHeight(e.target.value + "vh");
              forceUpdate.update();
            }}
            className="range1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expand Ease : {expandEase}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={expandEase}
            onChange={(e) => {
              setExpandEase(e.target.value);
              forceUpdate.update();
            }}
            className="range1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Collapse Ease : {collapseEase}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={collapseEase}
            onChange={(e) => {
              setCollapseEase(e.target.value);
              forceUpdate.update();
            }}
            className="range1"
          />
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