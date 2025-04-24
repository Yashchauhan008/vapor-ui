import { useEffect, useRef } from 'react';

export default function MaskMouseEffect({
  // Background color
  bgColor = "#11131e",
  // Text gradient colors
  textGradientStart = "#fa9b8b",
  textGradientEnd = "#f27481",
  // Hidden content gradient colors
  hiddenGradientTop = "#fb9c84",
  hiddenGradientMiddle = "#f06680",
  hiddenGradientBottom = "#812470",
  // Text content
  mainText = "Hello Guys Like and share this post with everyone",
  hiddenText = "Did you liked it or not ??",
  // Mask size when expanded
  expandedMaskSize = 250
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const hiddenContentRef = useRef(null);
  
  useEffect(() => {
    // Import GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    
    script.onload = () => {
      const gsap = window.gsap;
      const containerElement = containerRef.current;
      
      // Create GSAP animations
      const xTo = gsap.quickTo(hiddenContentRef.current, "--x", {
        duration: 0.4,
        ease: "power4.out"
      });
      
      const yTo = gsap.quickTo(hiddenContentRef.current, "--y", {
        duration: 0.4,
        ease: "power4.out"
      });
      
      // Timeline for hover effect
      const tl = gsap.timeline({ paused: true });
      tl.to(hiddenContentRef.current, {
        "--size": expandedMaskSize,
        duration: 0.75,
        ease: "back.out(1.7)"
      });
      
      // Add event listeners to hovering content
      const paragraphs = contentRef.current.querySelectorAll('p');
      paragraphs.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          tl.restart();
        });
        el.addEventListener("mouseleave", () => {
          tl.reverse();
        });
      });
      
      // Calculate mouse position relative to the container
      function getRelativePosition(e) {
        const rect = containerElement.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
      
      // Handle mouse movement within the container
      function handleMouseMove(e) {
        const pos = getRelativePosition(e);
        xTo(pos.x);
        yTo(pos.y);
      }
      
      // Initial setup
      const initialSetup = (e) => {
        const pos = getRelativePosition(e);
        
        gsap.set(hiddenContentRef.current, { 
          autoAlpha: 1, 
          "--x": pos.x, 
          "--y": pos.y 
        });
        
        // Switch to container-specific tracking
        containerElement.removeEventListener("mousemove", initialSetup);
        containerElement.addEventListener("mousemove", handleMouseMove);
      };
      
      // Only track mouse movements when inside the container
      containerElement.addEventListener("mousemove", initialSetup);
      
      // For preview/initial state - position at center of container
      const rect = containerElement.getBoundingClientRect();
      gsap.set(hiddenContentRef.current, {
        autoAlpha: 1,
        "--x": rect.width / 2,
        "--y": rect.height / 2
      });
    };
    
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      const containerElement = containerRef.current;
      if (containerElement) {
        containerElement.removeEventListener("mousemove", () => {});
      }
    };
  }, [expandedMaskSize]);
  
  // Create background style with the prop color
  const bgStyle = { backgroundColor: bgColor };
  
  // Gradient styles for text and hidden content
  const textGradientStyle = {
    background: `linear-gradient(45deg, ${textGradientStart} 0%, ${textGradientEnd} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
  
  const hiddenContentStyle = {
    '--x': '0px',
    '--y': '0px',
    '--size': '5px',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: `linear-gradient(180deg, ${hiddenGradientTop} 0%, ${hiddenGradientMiddle} 50%, ${hiddenGradientBottom} 100%)`,
    color: bgColor,
    WebkitMaskImage: 'var(--mask)',
    maskImage: 'var(--mask)',
    pointerEvents: 'none',
    visibility: 'hidden',
    '--mask': 'radial-gradient(circle at var(--x) var(--y), black var(--size), transparent 0)',
  };
  
  return (
    <div className="relative pb-5" style={bgStyle} ref={containerRef}>
      <div className="content" ref={contentRef}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-4/5 lg:w-2/3">
              <p className="text-5xl font-bold text-center uppercase" style={textGradientStyle}>
                {mainText}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden-content" ref={hiddenContentRef} style={hiddenContentStyle}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-4/5 lg:w-2/3">
              <p className="text-5xl font-bold text-center uppercase">
                {hiddenText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}