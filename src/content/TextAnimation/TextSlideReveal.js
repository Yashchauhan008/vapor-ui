import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const TextSlideReveal = ({
    children,
    direction = "left", // "right" or "left"
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
        className={"overflow-hidden "+containerClassName}
      >
        <span className={"inline-block "+textClassName}>
          {splitText}
        </span>
      </div>
    );
  };