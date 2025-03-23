import React from "react";
import Marquee from "./demoComponents/Marquee";
import RangeSlider from "./RangeSlider";
import TestSquare from "./TestSquare";

const PreviewTab = () => {
  // const items = [
  //   "../assets/image.png",
  //   "https://via.placeholder.com/200",
  //   "Some text content",
  //   "https://via.placeholder.com/250",
  //   "More content",
  // ];

  return (
    <>
      <div className="preview-tab">
        <div className="preview-box">
          {/* content will apear dynamicaly based on url */}
          <TestSquare width={100} height={100} opacity={1} color="red" isRotated={false} text="Square" />
        </div>
        <h2 className="">Customize</h2>
        <div className="customization-box">
        <RangeSlider/>
        </div>
        <h2>Props</h2>
        <div className="props-box">
        </div>
        <h2 >Dependencies</h2>
        <div className="dependencies-box"></div>
      </div>
    </>
  );
};

export default PreviewTab;

//       <Marquee
//   items={items}
//   speed={50}
//   direction="forward"
//   gap={20}
//   itemWidth={200}
// />
