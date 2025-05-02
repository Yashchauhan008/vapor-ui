import React, { useState, useEffect } from 'react';

const SocialIconsGrid = ({ 
  x = 10,
  y = 10,
  blockHeight = 50,
  blockWidth = 50,
  iconImages = []
}) => {
  const totalCells = x * y;
  const [gridIcons, setGridIcons] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState(new Set());

  // Assign random icons once on mount
  useEffect(() => {
    const randomIcons = Array.from({ length: totalCells }, () => {
      const randomIndex = Math.floor(Math.random() * iconImages.length);
      return iconImages[randomIndex];
    });
    setGridIcons(randomIcons);
  }, [totalCells, iconImages]);

  // Toggle active cell
  const toggleActive = (index) => {
    setActiveIndexes(prev => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index); // Toggle off if already active
      } else {
        updated.add(index); // Activate if not already
      }
      return updated;
    });
  };

  return (
    <div
      className="grid gap-1 p-2"
      style={{
        gridTemplateColumns: `repeat(${x}, ${blockWidth}px)`,
        gridTemplateRows: `repeat(${y}, ${blockHeight}px)`
      }}
    >
      {gridIcons.map((icon, index) => {
        const isActive = activeIndexes.has(index);
        return (
          <div
            key={index}
            className="grid place-items-center bg-transparent cursor-pointer transition-transform duration-300 overflow-hidden"
            style={{
              width: blockWidth,
              height: blockHeight,
              transform: isActive ? 'rotate(-90deg)' : 'rotate(0deg)',
            }}
            title={icon?.title}
            onClick={() => toggleActive(index)}
          >
            {icon && (
              <img
                src={icon.src}
                alt={icon.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                  filter: isActive ? 'none' : 'grayscale(100%)',
                  transition: 'filter 0.3s, transform 0.3s',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SocialIconsGrid;
