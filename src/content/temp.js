import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Text Float Up Animation (similar to the example)
export const TextFloatReveal = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const scroller = scrollContainerRef?.current || window;
    const charElements = el.querySelectorAll(".inline-block");
    
    gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%"
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        },
      }
    );
    
    // Cleanup function
    return () => {
      const scrollTrigger = ScrollTrigger.getById(el);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger
  ]);
  
  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <span className={`inline-block ${textClassName}`}>
        {splitText}
      </span>
    </div>
  );
};

// 2. Text Fade In Animation
export const TextFadeReveal = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 0.8,
  ease = "power3.out",
  scrollStart = "top bottom-=10%",
  stagger = 0.02
}) => {
  const containerRef = useRef(null);
  
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const charElements = el.querySelectorAll(".inline-block");
    
    gsap.fromTo(
      charElements,
      {
        opacity: 0
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart
        }
      }
    );
    
    return () => {
      const scrollTrigger = ScrollTrigger.getById(el);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    stagger
  ]);
  
  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <span className={`inline-block ${textClassName}`}>
        {splitText}
      </span>
    </div>
  );
};

// 3. Text Slide In Animation
export const TextSlideReveal = ({
  children,
  direction = "right", // "right" or "left"
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 0.8,
  ease = "power3.out",
  scrollStart = "top bottom-=10%",
  stagger = 0.02
}) => {
  const containerRef = useRef(null);
  
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const charElements = el.querySelectorAll(".inline-block");
    
    gsap.fromTo(
      charElements,
      {
        opacity: 0,
        x: direction === "right" ? -20 : 20
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        x: 0,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart
        }
      }
    );
    
    return () => {
      const scrollTrigger = ScrollTrigger.getById(el);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [
    direction,
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    stagger
  ]);
  
  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <span className={`inline-block ${textClassName}`}>
        {splitText}
      </span>
    </div>
  );
};

// 4. Text Wave Animation
export const TextWaveReveal = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 0.8,
  ease = "elastic.out(1,0.3)",
  scrollStart = "top bottom-=10%",
  stagger = 0.03,
  waveHeight = 20
}) => {
  const containerRef = useRef(null);
  
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const charElements = el.querySelectorAll(".inline-block");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: scrollStart
      }
    });
    
    // First set all characters to invisible
    tl.set(charElements, { opacity: 0, y: waveHeight });
    
    // Then animate each character with a wave effect
    tl.to(charElements, {
      duration: animationDuration,
      opacity: 1,
      y: 0,
      ease: ease,
      stagger: stagger
    });
    
    return () => {
      const scrollTrigger = ScrollTrigger.getById(el);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    stagger,
    waveHeight
  ]);
  
  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <span className={`inline-block ${textClassName}`}>
        {splitText}
      </span>
    </div>
  );
};

// Example usage 