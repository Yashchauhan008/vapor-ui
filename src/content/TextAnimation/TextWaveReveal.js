import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


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