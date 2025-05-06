import { useState, useEffect, useRef } from 'react';

// Default image array if none provided
const defaultImages = [
  { title: "Joshua Hibbert", url: "/api/placeholder/600/1000" },
  { title: "Joshua Earle", url: "/api/placeholder/600/1000" },
  { title: "Antoine Beauvillain", url: "/api/placeholder/600/1000" },
  { title: "Greg Rakozy", url: "/api/placeholder/600/1000" }
];

export default function FlipGallery({
  images = defaultImages,
  width = 240,
  height = 400,
  flipSpeed = 750,
  backgroundColor = "rgba(0, 0, 0, 0.8)",
  borderColor = "rgba(255, 255, 255, 0.25)",
  titleColor = "rgba(255, 255, 255, 0.75)",
  padding = 5,
  perspective = 800,
  dividerHeight = 4,
  navButtonsColor = "white",
  showTitle = true,
  easing = "cubic-bezier(0.455, 0.03, 0.515, 0.955)", // Added easing function for smoother animation
  autoplayEnabled = true,   // Enable/disable autoplay
  autoplayInterval = 3000,  // Time between auto flips in milliseconds
  pauseOnHover = true       // Pause autoplay when hovering over gallery
}) {
  // State for gallery
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [titleVisible, setTitleVisible] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // State for autoplay
  const [autoplay, setAutoplay] = useState(autoplayEnabled);
  const [interval, setInterval] = useState(autoplayInterval);
  const autoplayTimerRef = useRef(null);
  
  // Refs for DOM elements
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const overlayTopRef = useRef(null);
  const overlayBottomRef = useRef(null);
  
  // Set autoplay state from props
  useEffect(() => {
    setAutoplay(autoplayEnabled);
    setInterval(autoplayInterval);
  }, [autoplayEnabled, autoplayInterval]);

  // Set initial image on mount
  useEffect(() => {
    if (images && images.length > 0) {
      updateCurrentImages(images[0].url);
      setCurrentTitle(images[0].title);
    }
  }, [images]);
  
  // Handle autoplay functionality
  useEffect(() => {
    // Clear any existing timer
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    
    // Set up new timer if autoplay is enabled and not hovering (if pauseOnHover)
    const shouldPlay = autoplay && !isFlipping && images.length > 1 && !(pauseOnHover && isHovering);
    
    if (shouldPlay) {
      autoplayTimerRef.current = setTimeout(() => {
        updateIndex(1); // Move to next image
      }, interval);
    }
    
    // Cleanup on unmount
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [autoplay, isFlipping, currentIndex, interval, images.length, isHovering, pauseOnHover]);
  
  // Update current visible image elements
  const updateCurrentImages = (url) => {
    const elements = [topRef, bottomRef];
    elements.forEach(ref => {
      if (ref.current) {
        ref.current.style.backgroundImage = "url(" + url + ")";
      }
    });
  };

  // Update next image elements (used during animation)
  const updateOverlayImages = (url) => {
    const elements = [overlayTopRef, overlayBottomRef];
    elements.forEach(ref => {
      if (ref.current) {
        ref.current.style.backgroundImage = "url(" + url + ")";
      }
    });
  };
  
  // Toggle autoplay
  const toggleAutoplay = () => {
    setAutoplay(prev => !prev);
  };
  
  // Handle gallery navigation
  const updateIndex = (increment) => {
    if (isFlipping) return; // Prevent rapid clicking
    
    setIsFlipping(true);
    setFlipDirection(increment);
    
    // Calculate new index with wrapping
    const newIndex = (currentIndex + increment + images.length) % images.length;
    setNextIndex(newIndex);

    // Hide title with animation
    setTitleVisible(false);
    
    // Update overlay panels with the next image before animation starts
    updateOverlayImages(images[newIndex].url);
    
    // Animation timing with easing for smoother motion
    const timing = {
      duration: flipSpeed,
      easing: easing,
      fill: "forwards"
    };
    
    if (overlayTopRef.current && overlayBottomRef.current) {
      // First, reset any previous transforms and show the overlay elements
      overlayTopRef.current.style.opacity = "1";
      overlayBottomRef.current.style.opacity = "1";
      
      // Position the top overlay at 0 degrees (flat)
      overlayTopRef.current.style.transform = "rotateX(0deg)";
      
      // Position the bottom overlay at 90 degrees (folded up/hidden)
      overlayBottomRef.current.style.transform = "rotateX(90deg)";
      
      // Define the animations for the flip effect - ONE animation per panel
      const topAnim = overlayTopRef.current.animate([
        { transform: "rotateX(0deg)" },
        { transform: "rotateX(-90deg)" }
      ], timing);
      
      const bottomAnim = overlayBottomRef.current.animate([
        { transform: "rotateX(90deg)" },
        { transform: "rotateX(0deg)" }
      ], timing);
      
      // Use a completion flag to ensure we only process the animation completion once
      let animationCompleted = false;
      
      const completeAnimation = () => {
        if (animationCompleted) return; // Prevent duplicate execution
        animationCompleted = true;
        
        // Update main panels with the new image
        updateCurrentImages(images[newIndex].url);
        
        // Apply the transformations from the animations to the elements
        overlayTopRef.current.style.transform = "rotateX(-90deg)";
        overlayBottomRef.current.style.transform = "rotateX(0deg)";
        
        // Hide the overlay panels
        setTimeout(() => {
          overlayTopRef.current.style.opacity = "0";
          overlayTopRef.current.style.transform = "rotateX(0deg)";
          overlayBottomRef.current.style.transform = "rotateX(90deg)";
          overlayBottomRef.current.style.opacity = "0";
          
          // Update state
          setCurrentIndex(newIndex);
          setNextIndex(null);
          setCurrentTitle(images[newIndex].title);
          setTitleVisible(true);
          setIsFlipping(false);
        }, 50); // Small delay to ensure smooth transition
      };
      
      // Set up a single completion handler
      topAnim.onfinish = completeAnimation;
      bottomAnim.onfinish = completeAnimation;
    }
  };
  
  // Calculate background position styles
  const topBackgroundStyle = {
    backgroundPosition: 'top'
  };
  
  const bottomBackgroundStyle = {
    backgroundPosition: 'bottom'
  };
  
  // Gallery container styles
  const galleryContainerStyle = {
    backgroundColor,
    border: "1px solid " + borderColor,
    padding: padding + "px",
    position: 'relative',
    marginBottom: '60px' // Add space for title and buttons
  };
  
  // Flip gallery styles
  const flipGalleryStyle = {
    position: 'relative',
    width: width + "px",
    height: height + "px",
    textAlign: 'center',
    perspective: perspective + "px",
  };
  
  // Title styles with improved animation
  const titleStyle = {
    position: 'absolute',
    color: titleColor,
    fontSize: '0.75rem',
    left: 0,
    bottom: "-" + (padding * 4) + "px",
    lineHeight: 2,
    opacity: titleVisible ? 1 : 0,
    transform: "translateY(" + (titleVisible ? 0 : '-0.5rem') + ")",
    transition: "opacity 400ms " + easing + ", transform 400ms " + easing,
    width: '100%',
    textAlign: 'center',
    zIndex: 10
  };
  
  // Divider styles
  const dividerStyle = {
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: dividerHeight + "px",
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    zIndex: 5
  };
  
  // Shared styles for all image panels
  const sharedPanelStyle = {
    position: 'absolute',
    width: '100%',
    height: '50%',
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    backgroundSize: width + "px " + height + "px"
  };
  
  // Top panel styles
  const topPanelStyle = {
    ...sharedPanelStyle,
    ...topBackgroundStyle,
    top: 0,
    transformOrigin: 'bottom'
  };
  
  // Bottom panel styles
  const bottomPanelStyle = {
    ...sharedPanelStyle,
    ...bottomBackgroundStyle,
    bottom: 0,
    transformOrigin: 'top'
  };

  // Overlay panels styles
  const overlayTopPanelStyle = {
    ...topPanelStyle,
    opacity: 0,
    zIndex: 3,
    backfaceVisibility: 'hidden'
  };
  
  const overlayBottomPanelStyle = {
    ...bottomPanelStyle,
    opacity: 0,
    zIndex: 3,
    backfaceVisibility: 'hidden'
  };
  
  // Navigation buttons container styles
  const navContainerStyle = {
    position: 'absolute',
    bottom: "-" + (padding * 4) + "px",
    right: 0,
    display: 'flex',
    gap: '0.2rem',
    zIndex: 20
  };
  
  // Navigation button styles
  const navButtonStyle = {
    border: 'none',
    outline: 'none',
    padding: '5px 10px',
    background: 'rgba(0, 0, 0, 0.3)',
    color: navButtonsColor,
    opacity: 0.75,
    fontSize: '1.2rem',
    transition: "transform 150ms " + easing + ", opacity 150ms " + easing,
    cursor: 'pointer',
    borderRadius: '4px',
    marginLeft: '8px'
  };
  
  // Button hover state
  const [hoveredButton, setHoveredButton] = useState(null);
  
  // Autoplay toggle button style
  const autoplayButtonStyle = {
    ...navButtonStyle,
    fontSize: '0.9rem',
    padding: '6px 8px',
    background: "transparent"
  };
  
  return (
    <div 
      className="gallery" 
      style={galleryContainerStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flip-gallery" style={flipGalleryStyle}>
        {/* Base panels - always visible */}
        <div className="top" ref={topRef} style={topPanelStyle}></div>
        <div className="bottom" ref={bottomRef} style={bottomPanelStyle}></div>
        
        {/* Overlay panels for animation */}
        <div className="overlay-top" ref={overlayTopRef} style={overlayTopPanelStyle}></div>
        <div className="overlay-bottom" ref={overlayBottomRef} style={overlayBottomPanelStyle}></div>
        
        <div className="divider" style={dividerStyle}></div>
        {showTitle && <div className="title" style={titleStyle}>{currentTitle}</div>}
      </div>
      
      <div className="gallery-nav" style={navContainerStyle}>
        {/* Autoplay toggle button */}
          {/* Navigation buttons */}
          <button 
            type="button" 
            onClick={() => updateIndex(-1)} 
            title="Previous"
            style={{
              ...navButtonStyle,
              transform: hoveredButton === 'prev' ? 'scale(1.2)' : 'scale(1)',
              opacity: hoveredButton === 'prev' ? 1 : 0.75
            }}
            onMouseEnter={() => setHoveredButton('prev')}
            onMouseLeave={() => setHoveredButton(null)}
            disabled={isFlipping}
          >
            &#10094;
          </button>
        <button
          type="button"
          onClick={toggleAutoplay}
          title={autoplay ? "Pause" : "Play"}
          style={{
            ...autoplayButtonStyle,
            transform: hoveredButton === 'autoplay' ? 'scale(1.2)' : 'scale(1)',
            opacity: hoveredButton === 'autoplay' ? 1 : 0.75
          }}
          onMouseEnter={() => setHoveredButton('autoplay')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {autoplay ? "❚❚" : "▶"}
        </button>
        
        <button 
          type="button" 
          onClick={() => updateIndex(1)} 
          title="Next"
          style={{
            ...navButtonStyle,
            transform: hoveredButton === 'next' ? 'scale(1.2)' : 'scale(1)',
            opacity: hoveredButton === 'next' ? 1 : 0.75
          }}
          onMouseEnter={() => setHoveredButton('next')}
          onMouseLeave={() => setHoveredButton(null)}
          disabled={isFlipping}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}