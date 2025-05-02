import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/ElasticAcordianEmages/human1.webp"
import CardStack from "../../content/Cards/CardStack";


const CardStackDemo = () => {

  
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

export default CardStackDemo;
