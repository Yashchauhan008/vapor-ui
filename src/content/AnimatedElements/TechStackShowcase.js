import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechStackShowcase = ({techStacks}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  

  // Card variants for animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  // Modal variants for animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  // Item list variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const selectedStack = techStacks.find(stack => stack.id === selectedId);

  return (
    <div className="bg-black p-8 flex flex-col items-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-purple-600/20 filter blur-3xl"
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
          opacity: [0.15, 0.2, 0.15] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-500/20 filter blur-3xl"
        animate={{ 
          x: [0, -50, 0], 
          y: [0, -30, 0],
          opacity: [0.15, 0.2, 0.15] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.h1 
        className="text-4xl font-bold text-white mb-4 mt-8 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        Interactive Tech Stack
      </motion.h1>
      
      <motion.p 
        className="text-gray-400 text-center max-w-2xl mb-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Explore different technology categories by clicking on the cards below
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12 relative z-10">
        {techStacks.map((stack, i) => (
          <motion.div
            key={stack.id}
            layoutId={stack.id}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl cursor-pointer"
            style={{ 
              boxShadow: hoveredId === stack.id ? 
                `0 15px 30px -5px rgba(${stack.color.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.25)` : 
                '0 8px 20px rgba(0, 0, 0, 0.2)' 
            }}
            custom={i}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
            onMouseEnter={() => setHoveredId(stack.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedId(stack.id)}
          >
            <div className="p-5">
              <motion.div
                className="text-5xl mb-4"
                animate={{ 
                  scale: hoveredId === stack.id ? 1.3 : 1,
                  rotate: hoveredId === stack.id ? 10 : 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                {stack.icon}
              </motion.div>
              
              <motion.div 
                className="h-1 w-16 mb-6 rounded-full"
                style={{ backgroundColor: stack.color }}
                animate={{ 
                  width: hoveredId === stack.id ? 100 : 64,
                  opacity: hoveredId === stack.id ? 1 : 0.7
                }}
              />
              
              <motion.h2 
                className="text-2xl font-bold text-white mb-3"
                animate={{ 
                  scale: hoveredId === stack.id ? 1.05 : 1,
                  x: hoveredId === stack.id ? 5 : 0
                }}
              >
                {stack.title}
              </motion.h2>
              
              <motion.p 
                className="text-gray-400"
                animate={{ opacity: hoveredId === stack.id ? 0.9 : 0.6 }}
              >
                {stack.items.slice(0, 3).join(', ')}
                {stack.items.length > 3 && '...'}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={selectedId}
              className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <motion.div 
                      className="text-6xl mr-5"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      {selectedStack.icon}
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white">{selectedStack.title}</h2>
                  </div>
                  <motion.button
                    className="text-gray-400 hover:text-white text-xl"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedId(null)}
                  >
                    ✕
                  </motion.button>
                </div>
                
                <motion.div 
                  className="h-1 rounded-full mb-8"
                  style={{ backgroundColor: selectedStack.color }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                
                <motion.p 
                  className="text-gray-300 mb-10 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {selectedStack.description}
                </motion.p>
                
                <motion.h2 
                  className="text-lg font-semibold text-white mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Technologies:
                </motion.h2>
                
                <motion.ul
                  className="grid grid-cols-2 gap-6"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {selectedStack.items.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      variants={itemVariants}
                    >
                      <motion.div 
                        className="h-3 w-3 rounded-full mr-3"
                        style={{ backgroundColor: selectedStack.color }}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.1
                        }}
                      />
                      <motion.span 
                        className="text-white text-lg"
                        whileHover={{ 
                          x: 5, 
                          color: selectedStack.color,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {item}
                      </motion.span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechStackShowcase;