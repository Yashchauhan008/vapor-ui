import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AppleDock = ({ 
  items = [], 
  baseSize = 56, 
  baseGap = 12,
  hoverScale = 1.8,
  neighborScale = 1.4,
  secondNeighborScale = 1.2
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Default items if none provided
  const dockItems = items.length > 0 ? items : [
    { id: 1, name: 'Finder', imageurl: 'https://example.com/finder.png' },
    { id: 2, name: 'Safari', imageurl: 'https://example.com/safari.png' },
    { id: 3, name: 'Messages', imageurl: 'https://example.com/messages.png' },
    { id: 4, name: 'Mail', imageurl: 'https://example.com/mail.png' },
    { id: 5, name: 'Photos', imageurl: 'https://example.com/photos.png' },
    { id: 6, name: 'Music', imageurl: 'https://example.com/music.png' },
    { id: 7, name: 'Settings', imageurl: 'https://example.com/settings.png' }
  ];

  // Calculate scale for each item based on distance from hovered item
  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return hoverScale; // Hovered item
    if (distance === 1) return neighborScale; // Direct neighbors
    if (distance === 2) return secondNeighborScale; // Second neighbors
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
    <div className="flex justify-center items-center h-100 w-full bg-transparent">
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
                {item.imageurl && (
                  <img 
                    src={item.imageurl} 
                    alt={item.name} 
                    className="w-9 h-9 rounded-md"
                    onError={(e) => {
                      // Fallback for broken imageurls
                      e.target.src = "data:imageurl/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='9' y1='9' x2='15' y2='15'%3E%3C/line%3E%3Cline x1='15' y1='9' x2='9' y2='15'%3E%3C/line%3E%3C/svg%3E";
                    }}
                  />
                )}
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