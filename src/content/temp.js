import React from 'react';

const StripPattern = ({children}) => {
  const gradientStyle = {
    backgroundImage: 'repeating-radial-gradient(#FF9800 0 10px, #FFEB3B 10px 20px, #8BC34A 20px 30px)'
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div 
        className="w-full h-full rounded-lg shadow-lg flex items-center justify-center bg-[#FFEB3B]"
        style={gradientStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default StripPattern;
