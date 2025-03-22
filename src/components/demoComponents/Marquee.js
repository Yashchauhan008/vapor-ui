import React, { useState, useEffect, useRef } from 'react';

const Marquee = ({
  items = [],
  speed = 50,
  direction = 'forward',
  gap = 20,
  className = '',
  itemWidth = 'auto', // Changed to auto by default for better responsiveness
  minItemWidth = 150, // Minimum item width for responsive layouts
  maxItemWidth = 300, // Maximum item width for responsive layouts
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [duplicatedItems, setDuplicatedItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [actualItemWidth, setActualItemWidth] = useState(minItemWidth);

  // Calculate responsive item width based on container size
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      
      // Calculate responsive item width
      let calculatedWidth;
      if (itemWidth === 'auto') {
        // Responsive sizing: aim to show about 3-5 items depending on container width
        const idealCount = width < 768 ? 2 : width < 1200 ? 3 : 4;
        calculatedWidth = Math.max(minItemWidth, Math.min(maxItemWidth, width / idealCount - gap));
      } else {
        calculatedWidth = typeof itemWidth === 'number' ? itemWidth : minItemWidth;
      }
      
      setActualItemWidth(calculatedWidth);
    };
    
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [itemWidth, minItemWidth, maxItemWidth, gap]);

  // Clone items to create a seamless infinite effect
  useEffect(() => {
    if (containerWidth === 0 || items.length === 0) return;
    
    // Calculate how many duplicates we need to fill the screen multiple times
    const itemsNeededToFill = Math.ceil((containerWidth * 3) / (actualItemWidth + gap));
    const duplicateCount = Math.max(3, Math.ceil(itemsNeededToFill / items.length));
    const duplicated = Array(duplicateCount).fill().flatMap(() => items);
    setDuplicatedItems(duplicated);
  }, [items, actualItemWidth, containerWidth, gap]);

  // Animation effect with requestAnimationFrame for smoother performance
  useEffect(() => {
    let animationId;
    let lastTime = 0;

    const animate = (timestamp) => {
      if (!trackRef.current || isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Calculate scroll increment based on delta time for consistent speed
      const scrollIncrement = (deltaTime * speed) / 1000;
      
      // Direction control
      const directionMultiplier = direction === 'forward' ? 1 : -1;
      
      // Apply the scroll
      trackRef.current.scrollLeft += scrollIncrement * directionMultiplier;
      
      // Check if we need to reset scroll position for infinite effect
      const scrollWidth = trackRef.current.scrollWidth / 2;
      if (trackRef.current.scrollLeft >= scrollWidth || trackRef.current.scrollLeft <= 0) {
        // Jump back to middle to create the illusion of infinite scrolling
        trackRef.current.scrollLeft = direction === 'forward' ? 1 : scrollWidth - 1;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, direction, isPaused]);

  // Mouse interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Speed multiplier for drag
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch interaction handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      ref={containerRef}
      className={`futuristic-marquee-container ${className}`}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%', // Takes full width of parent container
      }}
    >
      <div className="futuristic-marquee-glow" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(0,200,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 2
        }}
      />
      
      <div
        ref={trackRef}
        className="futuristic-marquee-track"
        style={{
          display: 'flex',
          cursor: isDragging ? 'grabbing' : 'grab',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`marquee-item-${index}`}
            className="futuristic-marquee-item"
            style={{
              flex: '0 0 auto',
              width: `${actualItemWidth}px`,
              marginRight: `${gap}px`,
              padding: '10px',
              boxSizing: 'border-box',
              borderRadius: '8px',
              background: 'rgba(10, 20, 30, 0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0, 150, 250, 0.2)',
              boxShadow: '0 0 15px rgba(0, 150, 250, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: isPaused ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => !isDragging && setIsPaused(false)}
          >
            {typeof item === 'string' && item.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
              <img 
                src={item} 
                alt="Marquee item" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }} 
              />
            ) : (
              <div style={{ padding: '10px', color: 'rgba(200, 230, 255, 0.9)' }}>
                {item}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;