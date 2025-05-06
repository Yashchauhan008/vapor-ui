export const TextFadeRevealCode= {
    installation:"npm install gsap",
    imports:"",
    parameters:"",
    usage:` <TextFadeReveal
    containerClassName="text-center mb-12"
    textClassName="text-5xl font-bold text-white"
    animationDuration={1.2}
    ease="power4.out"
    scrollStart="top 80%"
    stagger={0.05}>
    That is not simply a yes; it is always YASH.
</TextFadeReveal>`,
    code:`import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const TextFadeReveal = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 0.8,
  ease = "power3.out",
  scrollStart = "top 90%", // Default to trigger when element is 90% from top of viewport
  stagger = 0.02
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block opacity-0" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    // Wait a bit for DOM to fully render
    const initTimer = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;

      const charElements = el.querySelectorAll(".inline-block");
      
      // Force initial state
      gsap.set(charElements, { opacity: 0 });

      // Create the animation timeline
      const tl = gsap.timeline({ paused: true });
      tl.to(charElements, {
        opacity: 1,
        duration: animationDuration,
        ease: ease,
        stagger: stagger,
      });

      // Create ScrollTrigger with more reliable settings
      ScrollTrigger.create({
        trigger: el,
        start: scrollStart,
        end: "bottom top", // End when bottom of element leaves top of viewport
        scroller: scrollContainerRef?.current || null,
        once: true,
        // markers: true, // Enable for debugging
        toggleActions: "play none none none", // Play on enter
        onEnter: () => {
          tl.play();
        },
        onRefresh: ({ progress, direction, isActive }) => {
          // If already in view when page loads, play animation
          if (isActive) {
            tl.play();
          }
        }
      });

      // Backup - if element is already in view on load, play animation
      if (el.getBoundingClientRect().top < window.innerHeight) {
        tl.play();
      }
    }, 100); // Small delay to ensure everything is rendered

    return () => {
      clearTimeout(initTimer);
      ScrollTrigger.getAll().forEach(st => st.kill()); // Kill all ScrollTriggers on unmount
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
      className={"overflow-hidden "+containerClassName}
      data-scroll-trigger="true" // Add attribute for debugging
    >
      <span className={"inline-block "+textClassName}>
        {splitText}
      </span>
    </div>
  );
};`,
}