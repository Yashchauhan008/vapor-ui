import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

const EnhancedGlassmorphicCardStack = () => {
  // Initial cards data with images
  const initialCards = [
    { 
      id: 1, 
      title: 'Northern Lights', 
      color: 'from-blue-400 to-purple-600', 
      content: 'Aurora Borealis in the night sky',
      image: '/api/placeholder/500/300' 
    },
    { 
      id: 2, 
      title: 'Mountain Peak', 
      color: 'from-indigo-500 to-blue-700', 
      content: 'Snowy mountain top at sunrise',
      image: '/api/placeholder/500/300' 
    },
    { 
      id: 3, 
      title: 'Ocean Wave', 
      color: 'from-cyan-500 to-blue-500', 
      content: 'Crystal clear ocean waves',
      image: '/api/placeholder/500/300' 
    },
    { 
      id: 4, 
      title: 'Desert Dunes', 
      color: 'from-amber-500 to-orange-600', 
      content: 'Golden sand dunes at sunset',
      image: '/api/placeholder/500/300' 
    },
    { 
      id: 5, 
      title: 'Forest Mist', 
      color: 'from-emerald-400 to-green-600', 
      content: 'Mysterious misty forest at dawn',
      image: '/api/placeholder/500/300' 
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const [dragging, setDragging] = useState(false);
  const [direction, setDirection] = useState(null);
  const constraintsRef = useRef(null);

  // Function to handle card reordering based on drag direction
  const handleDragEnd = (_, info, index) => {
    setDragging(false);
    
    // Calculate drag distance and direction
    const xDist = Math.abs(info.offset.x);
    const yDist = Math.abs(info.offset.y);
    let direction = null;
    
    // Determine primary direction and if drag was significant enough
    if (xDist > yDist && xDist > 80) {
      direction = info.offset.x > 0 ? 'right' : 'left';
    } else if (yDist > xDist && yDist > 80) {
      direction = info.offset.y > 0 ? 'down' : 'up';
    }
    
    if (direction) {
      // Make a copy of the cards array
      const newCards = [...cards];
      const currentCard = newCards[index];
      
      // Remove the current card from its position
      newCards.splice(index, 1);
      
      // Insert the card in a new position based on direction
      switch (direction) {
        case 'left':
          // Move closer to the front (top of stack)
          newCards.unshift(currentCard);
          break;
        case 'right':
          // Move one position back
          newCards.splice(Math.min(index + 1, newCards.length), 0, currentCard);
          break;
        case 'up':
          // Move to the front (top of stack)
          newCards.unshift(currentCard);
          break;
        case 'down':
          // Move to the back (bottom of stack)
          newCards.push(currentCard);
          break;
        default:
          break;
      }
      
      setCards(newCards);
      setDirection(direction);
      
      // Reset direction after animation
      setTimeout(() => setDirection(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 z-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600 mix-blend-overlay filter blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600 mix-blend-overlay filter blur-3xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-cyan-500 mix-blend-overlay filter blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Instruction text */}
      <motion.h2
        className="relative z-10 text-white text-opacity-80 mb-8 font-light text-center text-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Drag cards in any direction to reorder
      </motion.h2>

      {/* Card container */}
      <div 
        ref={constraintsRef} 
        className="relative w-full max-w-md h-96 flex items-center justify-center z-10 perspective-1000"
      >
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layoutId={`card-${card.id}`}
              className={`absolute cursor-grab active:cursor-grabbing ${index === 0 ? "z-30" : index === 1 ? "z-20" : index === 2 ? "z-10" : "z-0"}`}
              initial={{ 
                y: 300, 
                opacity: 0, 
                scale: 0.8,
                rotateZ: Math.random() * 6 - 3,
              }}
              animate={{ 
                y: index * 12, 
                x: index * 4,
                opacity: index < 4 ? 1 - (index * 0.15) : 0,
                scale: 1 - (index * 0.04),
                rotateZ: index % 2 === 0 ? index * 1 : index * -1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                }
              }}
              exit={{ 
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 } 
              }}
              drag={index === 0}
              dragConstraints={{ top: -100, right: 100, bottom: 100, left: -100 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              dragElastic={0.4}
              onDragStart={() => setDragging(true)}
              onDragEnd={(e, info) => handleDragEnd(e, info, index)}
              whileDrag={{ 
                scale: 1.05, 
                zIndex: 50,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
              }}
            >
              <div 
                className={`w-80 h-56 rounded-2xl p-0.5 bg-gradient-to-br ${card.color} overflow-hidden`}
                style={{ 
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative backdrop-blur-lg backdrop-filter bg-black bg-opacity-20">
                  {/* Card image with overlay */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                    <p className="text-white text-opacity-80 text-sm mb-4">{card.content}</p>
                    
                    <div className="flex justify-between items-center">
                      {index === 0 && (
                        <div className="flex space-x-2">
                          {['←', '→', '↑', '↓'].map((arrow, i) => (
                            <motion.span 
                              key={i}
                              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 text-white"
                              whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.3)" }}
                            >
                              {arrow}
                            </motion.span>
                          ))}
                        </div>
                      )}
                      
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-white bg-opacity-10 backdrop-blur-md flex items-center justify-center border border-white border-opacity-20"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                      >
                        <span className="text-white font-medium">{index + 1}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Direction indicator - shows when card is dragged */}
      <AnimatePresence>
        {direction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            <div className="text-5xl text-white text-opacity-30">
              {direction === 'left' ? '←' : 
               direction === 'right' ? '→' : 
               direction === 'up' ? '↑' : '↓'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 px-6 py-3 rounded-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 text-white text-opacity-90 hover:bg-opacity-10 transition-all duration-300"
        onClick={() => setCards(initialCards)}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.95 }}
      >
        Reset Cards
      </motion.button>
    </div>
  );
};

export default EnhancedGlassmorphicCardStack;