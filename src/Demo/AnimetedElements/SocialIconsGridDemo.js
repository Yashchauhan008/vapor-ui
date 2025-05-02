import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/appleDockImages/chrome.png"
import img2 from "../../assets/images/appleDockImages/spotify.png"
import img3 from "../../assets/images/appleDockImages/figma.png"
import img4 from "../../assets/images/appleDockImages/connection.png"
import SocialIconsGrid from "../../content/AnimatedElements/SocialIconsGrid";


const SocialIconsGridDemo = () => {

  
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
        <div className="bg-black text-white flex flex-col items-center justify-center space-y-12">
      <h1 className="text-center">
      <SocialIconsGrid
  gridSize={154}
  iconSize={2.5}
  containerWidth={500}
  containerHeight={500}
  iconImages={[
    {
      id: "twitter",
      title: "Follow on Twitter",
      activeColor: "#1DA1F2",
      src: img1
    },
    {
      id: "linkedin",
      title: "Connect on LinkedIn",
      activeColor: "#0A66C2",
      src: img2
    },
    {
      id: "youtube",
      title: "Subscribe on YouTube",
      activeColor: "#FF0000",
      src: img3
    },
    {
      id: "connection",
      title: "Subscribe on YouTube",
      activeColor: "#FF0000",
      src: img4
    }
  ]}
/>

      </h1>
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

export default SocialIconsGridDemo;
