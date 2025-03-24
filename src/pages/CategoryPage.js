import { useEffect, useRef, Suspense, lazy, useState, React } from 'react';
import { useParams } from "react-router-dom";
import CodeTab from "../components/CodeTab";
import ContributionTab from "../components/ContributionTab";
// import AnimatedContentDemo from "../Demo/AnimatedContentDemo"
import { componentMap } from "../constants/Components";
import AppleDock from '../content/AppleDock';
import TechStackShowcase from '../content/TechStackShowcase';

const CategoryPage = () => {
  const { category, subcategory } = useParams();

  const [content, setContent] = useState("Preview");
  const [demoName, setDemoName] = useState("");
  const [DynamicComponent, setDynamicComponent] = useState(null);

  useEffect(() => {
    setDemoName(convertToPascalCaseWithDemo(subcategory));
    
    // Reset and load the new component when subcategory changes
    if (subcategory && componentMap[subcategory]) {
      const loadComponent = async () => {
        try {
          // Dynamically import the component based on current subcategory
          const Component = lazy(componentMap[subcategory]);
          setDynamicComponent(() => Component);
        } catch (error) {
          console.error("Error loading component:", error);
          setDynamicComponent(null);
        }
      };
      
      loadComponent();
    } else {
      setDynamicComponent(null);
    }
  }, [subcategory]);

  function convertToPascalCaseWithDemo(str) {
    if (!str) return "";
    return `<${str.split('-') // Split by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join('') + 'Demo'}/>`; // Join and append 'Demo'
  }



  return (
    <div className="category-page">
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
          <>
            {DynamicComponent ? (
              <Suspense fallback={<div>Loading component...</div>}>
                <DynamicComponent />
              </Suspense>
            ) : (
              <div>No component found for {subcategory}</div>
            )}
          </>
        )}
        {content === "Code" && (
          <CodeTab/>
        )}
        {content === "Contribute" && (
          <ContributionTab/>
          // </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
