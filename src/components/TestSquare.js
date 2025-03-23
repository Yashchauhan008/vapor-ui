import React, { useState } from 'react';

const TestSquare = ({width, height, opacity, color, isRotated, text}) => {
  // State for all customization options
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Customizable Square</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Square Preview */}
        <div className="flex-1 flex items-center justify-center p-6  rounded-lg" style={{opacity: opacity}}>
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: color,
              transform: isRotated ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              fontWeight: 'bold'
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSquare;