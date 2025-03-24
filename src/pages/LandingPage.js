import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import logo from "../assets/vaporlogo.svg"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [hovered, setHovered] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const nav = useNavigate()
  
  // Create gradient follow effect based on mouse position
  const gradientX = useTransform(mouseX, [0, window.innerWidth], ["0%", "100%"]);
  const gradientY = useTransform(mouseY, [0, window.innerHeight], ["0%", "100%"]);
  
  // Update mouse position values when mouse moves
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  
  // Features data
  const features = [
    { 
      id: 1, 
      icon: "✦", 
      title: "Glassmorphic UI", 
      description: "Create stunning glass-like interfaces with just a few lines of code" 
    },
    { 
      id: 2, 
      icon: "⚡", 
      title: "Lightning Fast", 
      description: "Optimized performance with minimal bundle size" 
    },
    { 
      id: 3, 
      icon: "🤯", 
      title: "Reactive", 
      description: "Real-time updates with zero configuration" 
    },
    { 
      id: 4, 
      icon: "📱", 
      title: "Responsive", 
      description: "Adapt seamlessly to any screen size" 
    }
  ];
  
  // Cycle through features
  const handleDotClick = (index) => {
    setActiveDot(index);
  };
  
  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Gradients */}
      <motion.div 
        className="absolute inset-0 opacity-70"
        style={{ 
          background: `radial-gradient(circle at ${gradientX} ${gradientY}, rgba(120, 119, 198, 0.3), rgba(40, 41, 128, 0.1), transparent)`,
        }}
      />
      
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-600 opacity-20 blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -30, 0] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-cyan-500 opacity-20 blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Logo and Nav at the top */}
      <motion.div 
        className="absolute top-0 left-0 right-0 z-20 flex justify-center py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mt-5">
          <motion.div 
            className="h-10 w-10 rounded-lg p-0 mr-3"
            whileHover={{ rotate: 10 }}
          >
            <div className="h-full w-full flex items-center justify-center">
              <img src={logo}/>
            </div>
          </motion.div>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            VaporUI
          </h1>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 pt-16">
        {/* Left Section - Hero Content */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-2 py-1 px-4 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 inline-flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs text-cyan-300 mr-2">✨</span>
            <span className="text-xs font-medium text-white">Introducing VaporJS</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">beautiful</span> interfaces with Vapor
          </motion.h1>
          
          <motion.p 
            className="text-lg text-white text-opacity-80 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A modern UI library for creating stunning glassmorphic interfaces with minimal effort. Perfect for developers who want to build eye-catching, responsive applications.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              onClick={()=>{nav("/testimonials/testimonial-carousel")}}
            >
              <span className="relative z-10">Components</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                animate={{ x: hovered ? "0%" : "-100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
            
            <motion.a 
              href="#" 
              className="flex items-center text-white hover:text-cyan-300 transition-colors cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Right Section - Interactive Feature Cards */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-md">
            {/* Main Feature Card */}
            <motion.div 
              className="w-full h-64 sm:h-80 rounded-2xl p-0.5 bg-gradient-to-br from-cyan-400 to-blue-600 relative z-20 shadow-lg shadow-blue-500/20"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ 
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-full h-full rounded-2xl p-6 backdrop-blur-xl bg-black bg-opacity-30 border border-white border-opacity-10 flex flex-col justify-between overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeDot}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-center"
                  >
                    <div className="text-5xl mb-6 text-white">{features[activeDot].icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{features[activeDot].title}</h3>
                    <p className="text-white text-opacity-80">{features[activeDot].description}</p>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex justify-center gap-3 mt-6">
                  {features.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-3 h-3 rounded-full ${index === activeDot ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-white bg-opacity-30'}`}
                      onClick={() => handleDotClick(index)}
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Cards */}
            <motion.div 
              className="absolute top-8 -left-4 w-36 h-36 rounded-lg p-0.5 bg-gradient-to-br from-purple-400 to-pink-500 rotate-6 z-10 shadow-lg shadow-purple-500/20"
              animate={{ 
                rotate: [6, -2, 6],
                y: [0, 10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <div className="w-full h-full rounded-lg backdrop-blur-xl bg-black bg-opacity-30 border border-white border-opacity-10 flex items-center justify-center overflow-hidden">
                <div className="text-2xl text-white opacity-70">🔮</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-8 -right-4 w-36 h-36 rounded-lg p-0.5 bg-gradient-to-br from-amber-400 to-orange-500 -rotate-6 z-10 shadow-lg shadow-amber-500/20"
              animate={{ 
                rotate: [-6, 2, -6],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1, rotate: -10 }}
            >
              <div className="w-full h-full rounded-lg backdrop-blur-xl bg-black bg-opacity-30 border border-white border-opacity-10 flex items-center justify-center overflow-hidden">
                <div className="text-2xl text-white opacity-70">✨</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 flex justify-center items-center text-white text-opacity-60 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button className="mx-2 hover:text-cyan-300 transition-colors">Documentation</button>
        <span className="mx-2">•</span>
        <button className="mx-2 hover:text-cyan-300 transition-colors">GitHub</button>
        <span className="mx-2">•</span>
        <button className="mx-2 hover:text-cyan-300 transition-colors">npm</button>
      </motion.div>
    </div>
  );
};

export default LandingPage;