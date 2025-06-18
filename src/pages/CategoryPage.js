import { useEffect, useRef, Suspense, lazy, useState, React } from "react";
import { useParams } from "react-router-dom";
import CodeTab from "../components/CodeTab";
import ContributionTab from "../components/ContributionTab";
import { componentMap } from "../constants/Components";
import img from "../assets/images/ElasticAcordianEmages/human1.webp";
import Loading from "../components/Loading";
import { TextWaveReveal } from "../content/TextAnimation/TextWaveReveal";
import { TextFadeReveal } from "../content/TextAnimation/TextFadeReveal";
import FireParticles from "../content/Backgrounds/FireParticles";

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

  // Helper function to determine button class based on active state
  const getButtonClass = (buttonName) => {
    return buttonName === content
      ? "btn1 animate-fade-in-up active-btn"
      : "btn1 animate-fade-in-up";
  };

  return (
    <>
            <FireParticles
    particleCount={100}
    glowColor={"rgba(6, 217, 255, 0.15)"}
    particleColor={["#06d9ff","#06d9ff"]}
    glowSize={600}
    followCursor={false}
/>
    <div className="category-page px-8">
      <TextFadeReveal
        key={`category-${animationKey}`}
        containerClassName="text-left overflow-visible bg-transparent"
        textClassName="text-[20px] font-[100] leading-[15px] mb-[10px] pl-[5px] font-[annabel]"
        animationDuration={0.5}
        ease="elastic.out(1,0.3)"
        scrollStart="top 80%"
        stagger={0.04}
        waveHeight={10}
      >
        {category0}
      </TextFadeReveal>
      <TextFadeReveal
        key={`subcategory-${animationKey}`}
        containerClassName="pt-10 pb-2 text-left"
        textClassName="text-[35px] sm:text-[75px] font-[100] leading-[15px] mt-[0px] font-[Rubic]"
        animationDuration={0.5}
        ease="elastic.out(1,0.3)"
        scrollStart="top 80%"
        stagger={0.04}
        waveHeight={25}
      >
        {subcategory0}
      </TextFadeReveal>
      <div className="only-small z-[1000] absolute bottom-[100px] w-full h-[100px] flex items-center justify-center -translate-x-8">
  <div className="px-6 pt-3 pb-5 border border-[#00d9ff] rounded-3xl bg-[#00d9ff] bg-[#00d9ff]/30 backdrop-blur-md max-w-xs text-center">
    <h2 className="text-lg font-semibold text-[#00d9ff] mb-2">Please use a bigger screen</h2>
    <h2 className="text-sm text-[#00d9ff]">Because bigger is better 🤭 </h2>
  </div>
</div>

      <div className="preview-btn-list z-0">
        <button
          key={`preview-btn-${animationKey}`}
          className={getButtonClass("Preview")}
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
            className="chakra-icon css-13otjrl"
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
          className={getButtonClass("Code")}
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
            className="chakra-icon css-13otjrl"
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
          className={getButtonClass("Contribute")}
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
            className="chakra-icon css-13otjrl"
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
    </>
  );
};

export default CategoryPage;
