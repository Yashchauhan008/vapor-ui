import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OnScrollTextReveal = ({ 
  text = "This text reveals as you scroll down", 
  delay = 0.05, 
  duration = 0.5,
  threshold = 0.5 // How much of the element needs to be in view
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold });

  // Split text into an array of words
  const words = text.split(' ');
  
  // Container variants for the entire text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };
  
  // Word variants
  const wordVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <div ref={ref} className="flex justify-center items-center min-h-64 bg-gray-900 text-white p-8 rounded-lg shadow-lg overflow-hidden my-8">
      <motion.div
        className="text-3xl font-bold text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <motion.span 
            key={index} 
            className="inline-block mx-1"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default OnScrollTextReveal;

// Demo usage in a page with multiple sections
const ScrollAnimationDemo = () => {
  return (
    <div className="w-full">
      {/* Spacer to allow scrolling */}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl font-semibold">Scroll down to see animations</p>
      </div>
      
      <OnScrollTextReveal text="This text reveals when scrolled into view" />
      
      {/* Spacer between animations */}
      <div className="h-64"></div>
      
      <OnScrollTextReveal 
        text="Each word appears one by one as you scroll" 
        delay={0.08}
      />
      
      {/* Spacer between animations */}
      <div className="h-64"></div>
      
      <OnScrollTextReveal 
        text="You can customize animation speed and timing" 
        delay={0.04}
        duration={0.3}
      />
      
      {/* More content */}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">End of demo</p>
      </div>
    </div>
  );
};