import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppleDock from "../../content/AnimatedElements/AppleDock";
import tikTok from "../../assets/images/appleDockImages/tik-tok.png";
import instagram from "../../assets/images/appleDockImages/instagram.png";
import tinder from "../../assets/images/appleDockImages/connection.png";
import spotify from "../../assets/images/appleDockImages/spotify.png";
import slack from "../../assets/images/appleDockImages/slack.png";
import figma from "../../assets/images/appleDockImages/figma.png";
import chrome from "../../assets/images/appleDockImages/chrome.png";

const AppleDockDemo = () => {
  // Sample Dock data

  const items = [
    { id: 1, name: 'Finder', image: tikTok },
    { id: 2, name: 'Safari', image: instagram },
    { id: 3, name: 'Messages', image: tinder },
    { id: 4, name: 'Mail', image: spotify },
    { id: 5, name: 'Photos', image: slack },
    { id: 6, name: 'Music', image: figma },
    { id: 7, name: 'Settings', image: chrome }
  ];




  return (
    <>
      <div className="demo-box">
        <div className="preview-box">
          <AppleDock items={items} />
        </div>
        <div className="states">
        <h3>Customization</h3>
        <div className="customization-box">
          <div className="customization-item">
            
          </div>
        </div>
        <h3>Props</h3>
        <h3>Dependencies</h3>
        </div>
      </div>
    </>
  );
};

export default AppleDockDemo;
