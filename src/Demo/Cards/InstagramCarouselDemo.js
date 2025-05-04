import React, { useState, useEffect } from "react";
import InstagramCarousel from "../../content/Cards/InstagramCarousel";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";
import logo from "../../assets/images/portraits/portrait3.webp"
import post1 from "../../assets/images/portraits/portrait2.webp"
import post2 from "../../assets/images/portraits/portrait4.webp"
import post3 from "../../assets/images/portraits/portrait5.webp"


const InstagramCarouselDemo = () => {

  const props = [
    {
      property: "profileImage",
      type: "string",
      default: "''",
      description: "URL of the user's profile image."
    },
    {
      property: "username",
      type: "string",
      default: "''",
      description: "Instagram username to display."
    },
    {
      property: "isVerified",
      type: "boolean",
      default: "false",
      description: "Indicates whether the user is verified (shows a verified icon if true)."
    },
    {
      property: "images",
      type: "string[]",
      default: "[]",
      description: "Array of image URLs to be displayed in the carousel."
    },
    {
      property: "likes",
      type: "number",
      default: "0",
      description: "Total number of likes for the post."
    },
    {
      property: "caption",
      type: "string",
      default: "''",
      description: "Text content of the Instagram post caption."
    },
    {
      property: "timeAgo",
      type: "string",
      default: "''",
      description: "Displays how long ago the post was made (e.g., '2 HOURS AGO')."
    },
    {
      property: "alts",
      type: "string[]",
      default: "[]",
      description: "Alternative text for each image, used for accessibility."
    }
  ];

  
  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-[150px]">
        <InstagramCarousel
        profileImage={logo}
        username="buster_the_cat"
        isVerified={true}
        images={[
          post1,
          post2,
          post3,
        ]}
        likes={4820}
        caption="Living my best 9 lives 😸✨"
        timeAgo="1 HOUR AGO"
        alts={[
          "Cat laying in sunlight",
          "Cat playing with toy",
          "Cat napping on sofa",
          "Cat looking majestic"
        ]}
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
          <DependencyList deps={["react"]}/>
        </div>
      </div>
    </>
  );
};

export default InstagramCarouselDemo;