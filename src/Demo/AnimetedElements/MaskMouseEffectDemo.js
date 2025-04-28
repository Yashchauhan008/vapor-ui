import React, { useState, useEffect } from "react";
import MaskMouseEffect from "../../content/AnimatedElements/MaskMouseEffect";

const MaskMouseEffectDemo = () => {


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
          <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div>
          <h3>Props</h3>
          <h3>Dependencies</h3>
        </div>
      </div>
    </>
  );
};

export default MaskMouseEffectDemo;
