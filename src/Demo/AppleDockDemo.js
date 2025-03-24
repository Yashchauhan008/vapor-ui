import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppleDock from "../content/AppleDock";

const AppleDockDemo = () => {
  // Sample Dock data

  const items = [
    { id: 1, name: 'Finder', icon: '📁' },
    { id: 2, name: 'Safari', icon: '🧭' },
    { id: 3, name: 'Messages', icon: '💬' },
    { id: 4, name: 'Mail', icon: '✉️' },
    { id: 5, name: 'Photos', icon: '🖼️' },
    { id: 6, name: 'Music', icon: '🎵' },
    { id: 7, name: 'Settings', icon: '⚙️' }
  ];




  return (
    <>
      <div className="demo-box">
        <div className="preview-box">
          <AppleDock items={items} />
        </div>
        <div className="states">
        <h3>Customization</h3>
        <h3>Props</h3>
        <h3>Dependencies</h3>
        </div>
      </div>
    </>
  );
};

export default AppleDockDemo;
