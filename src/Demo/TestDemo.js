import React, { useState, useEffect } from "react";

const TestDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
        <div className="space-y-32 p-8">
      
      {/* <TextFadeReveal containerClassName="text-3xl font-bold">
        Simple fade in text reveal
        Simple fade in text reveal
        Simple fade in text reveal
        Simple fade in text reveal
        Simple fade in text reveal
        Simple fade in text reveal
        Simple fade in text reveal
        Simple fade in text reveal
      </TextFadeReveal> */}
      
      {/* <TextSlideReveal containerClassName="text-3xl font-bold text-white">
        Text slides in from the side
        Text slides in from the side
        Text slides in from the side
        Text slides in from the side
      </TextSlideReveal> */}
      
      {/* <TextWaveReveal containerClassName="text-3xl font-bold">
        Text with wave effect animation
        Text with wave effect animation
        Text with wave effect animation
        Text with wave effect animation
        Text with wave effect animation
        Text with wave effect animation
        Text with wave effect animation
        Text with wave effect animation
      </TextWaveReveal> */}
    </div>
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

export default TestDemo;
