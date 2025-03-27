import React, { useState, useEffect, useRef } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  
  return position;
};

const getRelativePosition = (position, rect) => {
  if (!rect) return { x: -1, y: -1 };
  
  return {
    x: (position.x - rect.left) / rect.width,
    y: (position.y - rect.top) / rect.height
  };
};

const Card = ({ 
  src = 'https://picsum.photos/id/41/700/900', 
  width = 350, 
  height = 450, 
  onClick 
}) => {
  const position = useMousePosition();
  const ref = useRef(null);
  const rect = ref.current?.getBoundingClientRect();
  
  const { x, y } = getRelativePosition(position, rect);
  const over = x > 0 && x < 1 && y > 0 && y < 1;
  
  return (
    <div 
      ref={ref}
      onClick={onClick}
      className={`relative mx-auto perspective-[1000px] transition-all duration-100 ease-in-out ${over ? 'card-hover' : ''}`}
      style={{
        width: `${width}px`,
        aspectRatio: width / height
      }}
    >
      <div 
        className={`relative w-full h-full bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-100 ease-in-out ${over ? 'scale-105' : ''}`}
        style={{
          transformOrigin: 'center',
          transform: over 
            ? `rotateY(${20 * x - 10}deg) rotateX(${-20 * y + 10}deg)` 
            : 'rotateY(0deg) rotateX(0deg)'
        }}
      >
        {/* Photo Frame */}
        <div 
          className="absolute inset-[0.75rem] bg-cover bg-center rounded-sm shadow-inner"
          style={{ 
            backgroundImage: `url(${src})`,
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Shine Effect */}
        {over && (
          <div 
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] mix-blend-overlay pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%)',
              transform: `translate(${50 * x}%, ${50 * y}%)`
            }}
          />
        )}
      </div>
    </div>
  );
};

const ThreeDCardEffect = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-[#060112] bg-opacity-90"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg%20viewBox%3D'0%200%20250%20250'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20opacity%3D'0.15'%20filter%3D'sepia(1)'%3E%3Cfilter%20id%3D'noiseFilter'%3E%3CfeTurbulence%20type%3D'turbulence'%20baseFrequency%3D'2'%20numOctaves%3D'1'%20stitchTiles%3D'stitch'%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20filter%3D'url(%23noiseFilter)'%20fill-opacity%3D'0.5'%2F%3E%3C%2Fsvg%3E")`,
        backgroundBlendMode: 'overlay'
      }}
    >
      <Card />
    </div>
  );
};

export default ThreeDCardEffect;