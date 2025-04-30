import React, { useState, useEffect } from "react";
import AuroraTitle from "../../content/TextAnimation/AuroraTitle";

const AuroraTitleDemo = () => {
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
        <div className="bg-black text-white flex flex-col items-center justify-center space-y-12">
      <h1 className="text-center">
        <AuroraTitle
          title="Aurora Magic"
          fontSize="10rem"
          colors = {["#01EBFF", "#ffc640", "#33ff8c", "#4CFF01"]}
          fontWeight="900"
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

export default AuroraTitleDemo;
