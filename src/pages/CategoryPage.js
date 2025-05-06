import { useEffect, useRef, Suspense, lazy, useState, React } from "react";
import { useParams } from "react-router-dom";
import CodeTab from "../components/CodeTab";
import ContributionTab from "../components/ContributionTab";
import { componentMap } from "../constants/Components";
import img from "../assets/images/ElasticAcordianEmages/human1.webp";
import Loading from "../components/Loading";
import { TextWaveReveal } from "../content/TextAnimation/TextWaveReveal";

// Add CSS for animations
const fadeInUpKeyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

const CategoryPage = () => {
  const { category, subcategory } = useParams();

  const [content, setContent] = useState("Preview");
  const [demoName, setDemoName] = useState("");
  const [DynamicComponent, setDynamicComponent] = useState(null);
  // Add a key state that will change when route params change
  const [animationKey, setAnimationKey] = useState(0);

  const cardImages = [img, img, img, img, img, img, img, img];

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

    // Force re-animation by updating the key when category or subcategory changes
    setAnimationKey((prevKey) => prevKey + 1);
  }, [subcategory, category]);

  function convertToPascalCaseWithDemo(str) {
    if (!str) return "";
    return `<${
      str
        .split("-") // Split by hyphen
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join("") + "Demo"
    }/>`; // Join and append 'Demo'
  }

  function formatTitle(text) {
    return text
      .replace(/-/g, " ") // Replace hyphens with spaces
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each
      .join(" "); // Join them back
  }

  const category0 = formatTitle(category);
  const subcategory0 = formatTitle(subcategory);

  // Add keyframes to the document
  useEffect(() => {
    // Create style element for keyframes if it doesn't exist
    if (!document.getElementById("fadeInUpKeyframes")) {
      const styleElement = document.createElement("style");
      styleElement.id = "fadeInUpKeyframes";
      styleElement.innerHTML = fadeInUpKeyframes;
      document.head.appendChild(styleElement);

      return () => {
        // Clean up when component unmounts
        const element = document.getElementById("fadeInUpKeyframes");
        if (element) element.remove();
      };
    }
  }, []);

  return (
    <div className="category-page">
      {/* <SplitText
        key={`category-${animationKey}`}
        text={category0}
        className="text-[20px] font-[100] leading-[15px] mt-[10px] pl-[5px] font-[Rubic]"
        delay={150}
        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        easing="easeOutCubic"
        threshold={0.1}
        rootMargin="-50px"
      />
      <br />
      <br />
      <br />
      <SplitText
        key={`subcategory-${animationKey}`}
        text={subcategory0}
        className="text-[75px] font-[100] leading-[15px] mt-[0px] font-[Rubic]"
        delay={150}
        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
      /> */}
      <TextWaveReveal
        key={`category-${animationKey}`}
        containerClassName="text-left overflow-visible bg-transparent"
        textClassName="text-[20px] font-[100] leading-[15px] mb-[10px] pl-[5px] font-[Rubic]"
        animationDuration={0.9}
        ease="elastic.out(1,0.3)"
        scrollStart="top 80%"
        stagger={0.04}
        waveHeight={10}
      >
        {category}
      </TextWaveReveal>
      <TextWaveReveal
        key={`subcategory-${animationKey}`}
        containerClassName="pt-10 pb-2 text-left"
        textClassName="text-[75px] font-[100] leading-[15px] mt-[0px] font-[Rubic]"
        animationDuration={0.9}
        ease="elastic.out(1,0.3)"
        scrollStart="top 80%"
        stagger={0.04}
        waveHeight={25}
      >
        {subcategory}
      </TextWaveReveal>
      {/* <h2>{category.replace("-", " ")}</h2> */}
      {/* <h3>{subcategory.replace("-", " ")}</h3> */}
      <div className="preview-btn-list z-0">
        <button
          key={`preview-btn-${animationKey}`}
          className="btn1 animate-fade-in-up"
          onClick={() => {
            setContent("Preview");
          }}
          style={{
            animation: `fadeInUp 0.6s ease forwards`,
            opacity: 0,
            transform: "translateY(100px)",
            animationDelay: "0.1s",
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
          key={`code-btn-${animationKey}`}
          className="btn1 animate-fade-in-up"
          onClick={() => {
            setContent("Code");
          }}
          style={{
            animation: `fadeInUp 0.6s ease forwards`,
            opacity: 0,
            transform: "translateY(100px)",
            animationDelay: "0.2s",
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
          key={`contribute-btn-${animationKey}`}
          className="btn1 animate-fade-in-up"
          onClick={() => {
            setContent("Contribute");
          }}
          style={{
            animation: `fadeInUp 0.6s ease forwards`,
            opacity: 0,
            transform: "translateY(100px)",
            animationDelay: "0.3s",
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
              <Suspense fallback={<Loading />}>
                <DynamicComponent />
              </Suspense>
            ) : (
              <div>No component found for {subcategory}</div>
            )}
          </>
        )}
        {content === "Code" && <CodeTab />}
        {content === "Contribute" && (
          <>
            <ContributionTab />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
