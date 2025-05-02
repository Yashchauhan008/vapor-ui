import { useState } from "react";

export default function CardStack({ image, title, subtitle, cardNumber }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative w-72 h-96 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bottom stacked cards - visible only on hover */}
      <div 
        className={`absolute inset-0 w-full h-full bg-white rounded shadow-md transition-all duration-500 ${
          isHovered ? 'rotate-6 opacity-100' : 'rotate-0 opacity-0'
        }`}
        style={{ zIndex: 1 }}
      ></div>
      
      <div 
        className={`absolute inset-0 w-full h-full bg-white rounded shadow-md transition-all duration-500 ${
          isHovered ? 'rotate-12 opacity-100' : 'rotate-0 opacity-0'
        }`}
        style={{ zIndex: 0 }}
      ></div>
      
      {/* Main card */}
      <div className="absolute inset-0 w-full h-full bg-white rounded shadow-md z-10">
        {/* Card number that shows on hover */}
        {isHovered && (
          <div className="absolute font-black text-8xl text-gray-200 opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            {cardNumber || "#"}
          </div>
        )}
        
        {/* Image container */}
        <div 
          className={`absolute inset-x-2.5 top-2.5 bg-gray-900 z-10 transition-all duration-500 ${
            isHovered ? 'bottom-20' : 'bottom-2.5'
          }`}
        >
          <img 
            src={image || "/api/placeholder/400/320"} 
            alt={`Profile of ${title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Details section */}
        <div className="absolute inset-x-2.5 bottom-2.5 h-14 z-20">
          <h2 className={`mt-1 font-black text-lg text-gray-900 text-center leading-tight ${isHovered ? "opacity-100" : "opacity-0"} `}>
            {title}
            <br />
            <span className="font-normal text-sm text-green-600">{subtitle}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}