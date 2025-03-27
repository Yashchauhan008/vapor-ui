import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialCarousel = ({testimonials}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Variants for animations
  const containerVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const quotationMarkVariants = {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 0.2, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full max-w-3xl px-4 py-12 mx-auto overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-50 rounded-2xl -z-10"></div>
      
      {/* Decorative circles */}
      <motion.div 
        className="absolute top-8 left-12 w-32 h-32 rounded-full bg-blue-500 opacity-10 -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -10, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-12 right-12 w-40 h-40 rounded-full bg-purple-500 opacity-10 -z-10"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 15, 0],
          y: [0, -15, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <motion.h2 
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Client Testimonials
        </motion.h2>
        <motion.div 
          className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </div>

      {/* Testimonial carousel */}
      <div className="relative mx-auto max-w-2xl bg-slate-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-8 shadow-xl">
        {/* Large quotation mark */}
        <motion.div 
          className="absolute top-4 left-6 text-8xl text-indigo-300 leading-none font-serif h-16 overflow-hidden"
          variants={quotationMarkVariants}
          initial="initial"
          animate="animate"
          key={`quote-${currentIndex}`}
        >
          "
        </motion.div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`testimonial-${currentIndex}`}
            custom={direction}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10"
          >
            <motion.div 
              className="mb-6" 
              variants={itemVariants}
            >
              <p className="text-slate-200 text-lg leading-relaxed italic">{testimonials[currentIndex].content}</p>
            </motion.div>

            <motion.div 
              className="flex items-center" 
              variants={itemVariants}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {testimonials[currentIndex].avatar}
              </div>
              <div className="ml-4">
                <p className="text-white font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-indigo-300 text-sm">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={`dot-${index}`}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-indigo-400' : 'bg-slate-500'}`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              animate={index === currentIndex ? { scale: [1, 1.3, 1], opacity: 1 } : { opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>

        {/* Control buttons */}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <motion.button
            className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-lg"
            whileHover={{ backgroundColor: "#4f46e5", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-lg"
            whileHover={{ backgroundColor: "#4f46e5", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </motion.button>
          
          <motion.button
            className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-lg"
            whileHover={{ backgroundColor: "#4f46e5", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;