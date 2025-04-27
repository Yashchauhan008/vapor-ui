import React from 'react';
import { ArrowRight } from 'lucide-react'; // optional icon

const ActionButton = ({ children, circleColor = "#01EBFF", hoverTextColor = "#fff" , fontWeight = "bold" }) => {
  const isGradient = Array.isArray(circleColor) && circleColor.length === 2;

  const backgroundStyle = isGradient
    ? {
        background: `linear-gradient(90deg, ${circleColor[0]}, ${circleColor[1]})`,
      }
    : {
        backgroundColor: circleColor,
      };

  return (
    <button
      className="group relative overflow-hidden px-5 py-3 rounded-2xl bg-white text-black flex flex-row justify-center items-center space-x-2 transition-all duration-500"
      style={{ '--hover-text-color': hoverTextColor }}
    >
      {/* Circle that grows */}
      <div
        style={backgroundStyle}
        className="h-2 w-2 mx-2 absolute left-4 rounded-full transform transition-all duration-500 translate-y-[2px] group-hover:h-64 group-hover:w-64 group-hover:translate-x-[-50px]"
      ></div>

      {/* Text + Icon wrapper */}
      <div className="flex items-center transform transition-all duration-500 translate-x-[10px] font-semibold group-hover:-translate-x-[10px]">
        <span className={`transition-colors font-${fontWeight} duration-500 group-hover:text-[color:var(--hover-text-color)]`}>
          {children}
        </span>
        <ArrowRight
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:stroke-[color:var(--hover-text-color)]"
          size={20}
          strokeWidth={3}
        />
      </div>
    </button>
  );
};

export default ActionButton;
