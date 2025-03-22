import React from "react";
import Marquee from "./demoComponents/Marquee";

const PreviewTab = () => {
  const items = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/200",
    "Some text content",
    "https://via.placeholder.com/250",
    "More content",
  ];

  return (
    <>
    <div className="preview-box"></div>
    <h2>Customize</h2>
    <div className="customization-box"></div>
    <h2>Props</h2>
    <div className="props-box"></div>
    <h2>Dependencies</h2>
    <div className="dependencies-box"></div>
    </>
  );
};

export default PreviewTab;

{/* <Marquee
  items={items}
  speed={50}
  direction="forward"
  gap={20}
  itemWidth={200}
/> */}