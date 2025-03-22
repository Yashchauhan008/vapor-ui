import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Marquee from "./demoComponents/Marquee";
import PreviewTab from "./PreviewTab";
import CodeTab from "./CodeTab";
import ContributionTab from "./ContributionTab";

const Display = () => {
  const { category, subcategory } = useParams();

  const [content, setContent] = useState("Preview");



  return (
    <div className="display">
      <h2>{category.replace("-", " ")}</h2>
      <h3>{subcategory.replace("-", " ")}</h3>
      <div className="preview-btn-list">
        <button
          className="btn1"
          onClick={() => {
            setContent("Preview");
          }}
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
            class="chakra-icon css-13otjrl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Preview
        </button>
        <button
          className="btn1"
          onClick={() => {
            setContent("Code");
          }}
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
            class="chakra-icon css-13otjrl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          Code
        </button>
        <button
          className="btn1"
          onClick={() => {
            setContent("Contribute");
          }}
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
            class="chakra-icon css-13otjrl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          Contribute
        </button>
      </div>
      <div className="content-box">
        {content === "Preview" && (
          <PreviewTab/>
        )}
        {content === "Code" && (
          <CodeTab/>
        )}
        {content === "Contribute" && (
          <ContributionTab/>
        )}
      </div>
    </div>
  );
};

export default Display;
