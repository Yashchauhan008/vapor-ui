
import { useState, useEffect } from 'react';

const PipeGrid = ({
  backgroundColor = 'transparent',
  layers = [
    { color: '#6dff73', rotation: 45, position: { x: -50, y: -50 }, animation: 'animateDots_one' },
    { color: '#db0aff', rotation: 45, position: { x: -50, y: -38 }, animation: 'animateDots_two' },
    { color: '#03a9f4', rotation: 45, position: { x: -50, y: -62 }, animation: 'animateDots_two' },
    { color: '#ffc107', rotation: -45, position: { x: -50, y: -50 }, animation: 'animateDots_one' },
    { color: '#e91e63', rotation: -45, position: { x: -50, y: -38 }, animation: 'animateDots_two' },
    { color: '#0f0', rotation: -45, position: { x: -50, y: -62 }, animation: 'animateDots_two' },
  ],
  dotSize = 9,
  ringSize = 4,
  gridSize = 35,
  animationDuration = 2,
  height = '100vh',
  width = '100%',
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: height, width, background: backgroundColor }}>
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: '100px',
            height: '250vh',
            background: `#222 radial-gradient(${layer.color} ${dotSize}px, #000 ${dotSize}px, #000 ${dotSize + ringSize}px, transparent ${dotSize + ringSize}px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            transform: `translate(${layer.position.x}%, ${layer.position.y}%) rotate(${layer.rotation}deg)`,
            zIndex: 10 - index,
            animation: `${layer.animation} ${animationDuration}s linear infinite`,
            boxShadow: 'inset -30px 0 40px rgba(0, 0, 0, 1), inset 30px 0 40px rgba(0, 0, 0, 1), inset -10px 0 10px rgba(255, 255, 255, 0.25), inset 10px 0 10px rgba(255, 255, 255, 0.25), 0 0 50px rgba(0, 0, 0, 1)',
            border:'2px solid black'
          }}
        />
      ))}

      <style jsx>{`
        @keyframes animateDots_one {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: ${gridSize}px -${gridSize}px;
          }
        }

        @keyframes animateDots_two {
          0% {
            background-position: ${gridSize}px -${gridSize}px;
          }
          100% {
            background-position: 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PipeGrid;