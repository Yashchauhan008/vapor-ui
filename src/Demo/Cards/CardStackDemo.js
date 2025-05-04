import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/ElasticAcordianEmages/human1.webp"
import CardStack from "../../content/Cards/CardStack";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";


const CardStackDemo = () => {

  const props = [
    {
      property: "image",
      type: "string",
      default: '"/api/placeholder/400/320"',
      description: "URL for the card image shown at the top of the card."
    },
    {
      property: "title",
      type: "string",
      default: '""',
      description: "Title text displayed in the details section."
    },
    {
      property: "subtitle",
      type: "string",
      default: '""',
      description: "Subtitle text shown below the title in a smaller green font."
    },
    {
      property: "cardNumber",
      type: "string",
      default: '"#"',
      description: "Large number or identifier shown on hover in the center of card."
    }
  ];
  
const deps = ["react"]
  
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
        <div className="bg-black text-white flex flex-col items-center justify-center space-y-12">
      <h1 className="text-center">
      <CardStack 
        image={img1} 
        title="Christine McKay" 
        subtitle="New York, US"
        cardNumber="1" 
      />

      </h1>
    </div>
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

export default CardStackDemo;
