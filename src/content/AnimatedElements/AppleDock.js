import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AppleDock = ({ items = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Default items if none provided
  const dockItems = items.length > 0 ? items : [
    { id: 1, name: 'Finder', image: 'https://example.com/finder.png' },
    { id: 2, name: 'Safari', image: 'https://example.com/safari.png' },
    { id: 3, name: 'Messages', image: 'https://example.com/messages.png' },
    { id: 4, name: 'Mail', image: 'https://example.com/mail.png' },
    { id: 5, name: 'Photos', image: 'https://example.com/photos.png' },
    { id: 6, name: 'Music', image: 'https://example.com/music.png' },
    { id: 7, name: 'Settings', image: 'https://example.com/settings.png' }
  ];

  // Base size of dock items
  const baseSize = 56;
  const baseGap = 12;

  // Calculate scale for each item based on distance from hovered item
  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return 1.8; // Hovered item
    if (distance === 1) return 1.4; // Direct neighbors
    if (distance === 2) return 1.2; // Second neighbors
    return 1; // Default scale
  };

  // Calculate the width needed for each item to maintain consistent gaps
  const getItemOuterWidth = (index) => {
    const scale = getScale(index);
    return baseSize * scale + baseGap; // Item width plus consistent gap
  };

  // Calculate total dock width based on all item widths
  const getDockWidth = () => {
    return dockItems.reduce((width, _, index) => {
      return width + getItemOuterWidth(index);
    }, 0);
  };

  return (
    <div className="flex justify-center items-center h-100 w-full bg-black">
      <motion.div 
        className="flex items-center mb-6 rounded-3xl backdrop-blur-lg bg-gray-800/30 border border-gray-700/30 px-3 py-3"
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          width: getDockWidth()
        }}
        transition={{ 
          y: {
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.8 
          },
          width: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 1.5
          }
        }}
      >
        {dockItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex flex-col items-center justify-center"
            style={{
              width: getItemOuterWidth(index),
              display: 'flex',
              justifyContent: 'center'
            }}
            animate={{
              width: getItemOuterWidth(index)
            }}
            transition={{
              width: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative flex items-center justify-center rounded-2xl backdrop-blur-md bg-gray-600/20 border border-gray-500/20 shadow-lg cursor-pointer overflow-hidden"
              animate={{
                scale: getScale(index),
                zIndex: hoveredIndex === index ? 10 : 1
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25
              }}
              style={{
                width: baseSize,
                height: baseSize,
                transformOrigin: 'bottom'
              }}
            >
              <motion.div
                className="flex items-center justify-center w-full h-full"
              >
                <img src={item.image} alt={item.name} className="w-9 h-9 rounded-md" />
              </motion.div>
            </motion.div>
            
            <motion.div
              className="text-white text-xs font-medium mt-2 px-2 py-1 rounded-lg backdrop-blur-sm bg-black/40 opacity-0 absolute"
              style={{
                bottom: -24
              }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{
                duration: 1
              }}
            >
              {item.name}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppleDock;