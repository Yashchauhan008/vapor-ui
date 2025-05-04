import React, { useState, useEffect } from "react";
import MaskMouseEffect from "../../content/AnimatedElements/MaskMouseEffect";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const MaskMouseEffectDemo = () => {
  const props = [
    {
      property: "bgColor",
      type: "string (CSS color)",
      default: '"#11131e"',
      description: "Background color of the entire component container.",
    },
    {
      property: "textGradientStart",
      type: "string (CSS color)",
      default: '"#fa9b8b"',
      description: "Starting color of the gradient applied to the main text.",
    },
    {
      property: "textGradientEnd",
      type: "string (CSS color)",
      default: '"#f27481"',
      description: "Ending color of the gradient applied to the main text.",
    },
    {
      property: "hiddenGradientTop",
      type: "string (CSS color)",
      default: '"#fb9c84"',
      description: "Top color of the gradient background in the hidden text.",
    },
    {
      property: "hiddenGradientMiddle",
      type: "string (CSS color)",
      default: '"#f06680"',
      description:
        "Middle color of the gradient background in the hidden text.",
    },
    {
      property: "hiddenGradientBottom",
      type: "string (CSS color)",
      default: '"#812470"',
      description:
        "Bottom color of the gradient background in the hidden text.",
    },
    {
      property: "mainText",
      type: "string",
      default: '"Hello Guys Like and share this post with everyone"',
      description: "The main text shown initially with gradient color.",
    },
    {
      property: "hiddenText",
      type: "string",
      default: '"Did you liked it or not ??"',
      description:
        "The hidden text revealed through the animated circular mask.",
    },
    {
      property: "expandedMaskSize",
      type: "number",
      default: "250",
      description:
        "The radius (in px) of the circular mask when expanded on hover.",
    },
  ];

  const deps = ["react"];

  return (
    <>
      <div className="demo-box">
        <div className="preview-box">
          <MaskMouseEffect
            bgColor="#000000"
            textGradientStart="#64ffda"
            textGradientEnd="#00bcd4"
            hiddenGradientTop="pink"
            hiddenGradientMiddle="#f08597"
            hiddenGradientBottom="pink"
            mainText="Hover over this text to see the effect"
            hiddenText="Surprise! Hidden content revealed"
            expandedMaskSize={250}
          />
        </div>
        <div className="states">
          <h3>Props</h3>
          <PropsTable properties={props} />
          <h3>Dependencies</h3>
          <DependencyList deps={deps} />
        </div>
      </div>
    </>
  );
};

export default MaskMouseEffectDemo;
