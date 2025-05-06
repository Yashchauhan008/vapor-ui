import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/appleDockImages/chrome.png";
import img2 from "../../assets/images/appleDockImages/spotify.png";
import img3 from "../../assets/images/appleDockImages/figma.png";
import img4 from "../../assets/images/appleDockImages/connection.png";
import SocialIconsGrid from "../../content/AnimatedElements/SocialIconsGrid";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const SocialIconsGridDemo = () => {
  const props = [
    {
      property: "x",
      type: "number",
      default: "10",
      description: "Number of columns in the icon grid.",
    },
    {
      property: "y",
      type: "number",
      default: "10",
      description: "Number of rows in the icon grid.",
    },
    {
      property: "blockHeight",
      type: "number (pixels)",
      default: "50",
      description: "Height of each individual grid block.",
    },
    {
      property: "blockWidth",
      type: "number (pixels)",
      default: "50",
      description: "Width of each individual grid block.",
    },
    {
      property: "iconImages",
      type: "Array<{ src: string, title: string }>",
      default: "[]",
      description:
        "Array of image objects used to randomly populate the grid. Each object should have `src` (image URL) and `title` (for tooltip/alt text).",
    },
  ];

  const deps = ["react"];

  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
          <div className="bg-black text-white flex flex-col items-center justify-center space-y-12">
            <h1 className="text-center">
              <SocialIconsGrid
                x={10}
                y={20}
                containerWidth={500}
                containerHeight={500}
                iconImages={[
                  {
                    id: "twitter",
                    title: "Follow on Twitter",
                    activeColor: "#1DA1F2",
                    src: img1,
                  },
                  {
                    id: "linkedin",
                    title: "Connect on LinkedIn",
                    activeColor: "#0A66C2",
                    src: img2,
                  },
                  {
                    id: "youtube",
                    title: "Subscribe on YouTube",
                    activeColor: "#FF0000",
                    src: img3,
                  },
                  {
                    id: "connection",
                    title: "Subscribe on YouTube",
                    activeColor: "#FF0000",
                    src: img4,
                  },
                ]}
              />
            </h1>
          </div>
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

export default SocialIconsGridDemo;
