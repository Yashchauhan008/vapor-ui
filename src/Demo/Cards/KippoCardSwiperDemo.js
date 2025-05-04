import React, { useState, useEffect } from "react";
import KippoCardSwiper from "../../content/Cards/KippoCardSwiper";
import img1 from "../../assets/images/Dog/dog1.webp";
import img2 from "../../assets/images/Dog/dog2.webp";
import img3 from "../../assets/images/Dog/dog3.webp";
import img4 from "../../assets/images/Dog/dog4.webp";
import img5 from "../../assets/images/Dog/dog5.webp";
import img6 from "../../assets/images/Dog/dog6.webp";
import img7 from "../../assets/images/Dog/dog7.webp";
import img8 from "../../assets/images/Dog/dog8.webp";
import img9 from "../../assets/images/Dog/dog9.webp";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const KippoCardSwiperDemo = () => {

  const props = [
    {
      property: "images",
      type: "string[]",
      default: "[]",
      description: "Array of 9 image URLs to be displayed as cards in the swiper animation."
    },
    {
      property: "duration",
      type: "number",
      default: "500",
      description: "Duration of the transition animation in milliseconds when the user hovers over the swiper."
    },
    {
      property: "easing",
      type: "string",
      default: "'ease-in-out'",
      description: "CSS timing function used for the transition animation (e.g., 'linear', 'ease', 'ease-in-out')."
    }
  ];

  

  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
          <KippoCardSwiper
            images={[img1, img2, img3, img4, img5, img6, img7, img8, img9]}
            duration={700}
            easing="cubic-bezier(0.4, 0, 0.2, 1)" // or 'ease', 'linear', etc.
            />
        </div>
        <div className="states">
          <h3>Props</h3>
          <PropsTable properties={props}/>
          <h3>Dependencies</h3>
          <DependencyList deps={["react"]}/>
        </div>
      </div>
    </>
  );
};

export default KippoCardSwiperDemo;
