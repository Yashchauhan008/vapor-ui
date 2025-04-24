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
import GsapMaskMouseEffect from "../../content/AnimatedElements/MaskMouseEffect";

const MaskMouseEffectDemo = () => {


  return (
    <>
      <div className="demo-box">
        <div className="preview-box">
          <GsapMaskMouseEffect
            bgColor="#000000"
            textGradientStart="#64ffda"
            textGradientEnd="#00bcd4"
            hiddenGradientTop="pink"
            hiddenGradientMiddle="#f08597"
            hiddenGradientBottom="pink"
            mainText="Hover over this text to see the effect"
            hiddenText="Surprise! Hidden content revealed"
            expandedMaskSize={250}
          />
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

export default MaskMouseEffectDemo;
