import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/ElasticAcordianEmages/human1.webp"
import img2 from "../../assets/images/ElasticAcordianEmages/human2.webp"
import CanvasCard from "../../content/Cards/CanvasCard";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const CanvasCardDemo = () => {

  const props = [
    {
      property: "align",
      type: "string",
      default: '"right"',
      description: "The alignment of the text content. Can be 'left' or 'right'."
    },
    {
      property: "image",
      type: "string",
      default: '""',
      description: "URL for the image displayed in the card."
    },
    {
      property: "subtitle",
      type: "string",
      default: '""',
      description: "Subtitle text displayed inside the card."
    },
    {
      property: "title1",
      type: "string",
      default: '""',
      description: "The first title text displayed inside the card."
    },
    {
      property: "title2",
      type: "string",
      default: '""',
      description: "The second title text displayed inside the card."
    },
    {
      property: "details",
      type: "string",
      default: '""',
      description: "Additional details text displayed inside the card."
    },
    {
      property: "gradientFrom",
      type: "string",
      default: '"#FD8944"',
      description: "The starting color of the gradient applied to the border."
    },
    {
      property: "gradientTo",
      type: "string",
      default: '"#994B17"',
      description: "The ending color of the gradient applied to the border."
    }
  ];

  const deps =['react']

  return (
    <>
      <div className="demo-box">
          <h1 className="text-3xl font-bold my-4">Right card</h1>
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
        <CanvasCard
        align="right"
        image={img2}
        subtitle="Heading"
        title1="Canvas"
        title2="Card"
        details="Custom gradient with hex."
        gradientFrom="#FF6F2D"
        gradientTo="#842B94"
      />
        </div>
        <h1 className="text-3xl font-bold my-4">Left card</h1>

        <div className="preview-box d-flex justify-content-center gap-3 p-[150px] mt-3">
        <CanvasCard
        align="left"
        image={img1}
        subtitle="Heading"
        title1="Canvas"
        title2="Card"
        details="Custom gradient with hex."
        gradientFrom="#F94300"
        gradientTo="#E32200"
      />
        </div>
        <div className="states">
          {/* <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div> */}
          <h3>Props</h3>
          <PropsTable properties={props}/>
          <h3>Dependencies</h3>
          <DependencyList deps={deps}/>
        </div>
      </div>
    </>
  );
};

export default CanvasCardDemo;
