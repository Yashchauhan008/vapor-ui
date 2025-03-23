import React, { useState, useEffect, useRef } from 'react';

const RangeSlider = () => {
  const [value, setValue] = useState(20);
  const handleRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (handleRef.current) {
      handleRef.current.textContent = newValue;
    }
  };

  // Initialize on component mount
  useEffect(() => {
    if (handleRef.current) {
      handleRef.current.textContent = value;
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* Hidden original input */}
        <input
          type="range"
          name="participants"
          min="5"
          max="51"
          value={value}
          onChange={handleChange}
          className="w-full opacity-0 absolute z-10 cursor-pointer"
        />
        {/* Custom slider track */}
        <div className="w-full h-2.5 bg-gray-200 rounded-lg relative">
          {/* Fill - using single color instead of gradient */}
          <div 
            className="absolute top-10px left-0 h-full bg-green-500 rounded-lg" 
            style={{ width: `${((value - 5) / (51 - 5)) * 100}%` }}
          ></div>
          {/* Handle */}
          <div 
            ref={handleRef}
            className="absolute top-0 -mt-4 w-10 h-10 text-black bg-white rounded-full text-center leading-10 font-bold text-sm border-6 shadow flex items-center justify-center"
            style={{ 
              left: `calc(${((value - 5) / (51 - 5)) * 100}% - 20px)`,
              borderWidth: '6px',
              borderColor:"#4bc67d"
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;