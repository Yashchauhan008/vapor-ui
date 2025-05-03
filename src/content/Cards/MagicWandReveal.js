import { useState, useEffect, useRef } from "react";

export default function MagicWandReveal({
  imageUrls = [
    "https://assets.codepen.io/1468070/edgar-infocus-eCSsB3sIEHs-unsplash.jpg?width=1000&height=1250&format=auto&quality=70",
    "https://assets.codepen.io/1468070/eugene-golovesov-ItyV8UzZzzw-unsplash.jpg?width=818&height=1228&format=auto&quality=80",
    "https://assets.codepen.io/1468070/alex-shuper-3OpOV8ntLj4-unsplash.jpg?width=1000&height=1500&format=auto&quality=80"
  ],
  wandSize = "10vmin",
  tileSize = "38vmin",
  backgroundColor = "rgb(2, 6, 23)",
  tileBackgroundColor = "rgb(31, 41, 55)"
}) {
  const containerRef = useRef(null);
  const wandRef = useRef(null);
  const tilesRef = useRef(null);
  const [tiles, setTiles] = useState([]);

  // Initialize tiles with ref elements when component mounts
  useEffect(() => {
    if (tilesRef.current) {
      setTiles(Array.from(tilesRef.current.querySelectorAll(".tile")));
    }
    
    // Initialize wand position to center of container
    if (containerRef.current && wandRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      wandRef.current.style.left = `${rect.width / 2}px`;
      wandRef.current.style.top = `${rect.height / 2}px`;
    }
  }, []);

  const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Get container dimensions and position
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the container
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    // Calculate wand position using container dimensions
    const mouse = {
      position: { x: mouseX, y: mouseY },
      decimal: { x: mouseX / containerRect.width, y: mouseY / containerRect.height },
      multiplier: { x: 1.3, y: 0.4 },
      offset: { x: containerRect.width * -0.15, y: containerRect.height * 0.1 },
      modifiedPosition: { x: 0, y: 0 }
    };
    
    mouse.modifiedPosition.x = mouse.position.x * mouse.multiplier.x + mouse.offset.x;  
    mouse.modifiedPosition.y = mouse.position.y * mouse.multiplier.y + mouse.offset.y;
    
    // Update wand styles relative to container
    if (wandRef.current) {
      wandRef.current.style.left = `${mouse.modifiedPosition.x}px`;
      wandRef.current.style.top = `${mouse.modifiedPosition.y}px`;
      wandRef.current.style.rotate = `${mouse.decimal.x * 20 - 10}deg`;
    }
    
    // Reveal images based on mouse position
    tiles.forEach(tile => {
      const dimensions = tile.getBoundingClientRect();
      const tileLeft = dimensions.left - containerRect.left;
      const relativeMouseX = mouse.modifiedPosition.x - tileLeft;
      const mouseXAsDecimal = clamp(relativeMouseX / dimensions.width, 0, 1);
      
      const opacity = mouseXAsDecimal;
      const blur = 1 - mouseXAsDecimal;
      
      tile.style.setProperty("--opacity", opacity);
      tile.style.setProperty("--blur", blur);
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center" 
      style={{ backgroundColor, height: "100%", width: "100%" }} 
      onMouseMove={handleMouseMove}
    >
      <div 
        id="wand" 
        ref={wandRef}
        className="absolute z-10 rounded-3xl shadow-lg overflow-hidden"
        style={{ 
          width: wandSize, 
          aspectRatio: "1 / 10",
          background: "linear-gradient(to right, rgb(26 24 28) 10%, rgb(42 40 44) 45% 55%, rgb(26 24 28) 90%)",
          left: "5%",
          top: "20%",
          translate: "-50%",
          rotate: "-3deg",
          zIndex: 100
        }}
      >
        <div 
          className="cap" 
          style={{ 
            height: "20%", 
            width: "100%", 
            background: "linear-gradient(to right, rgb(212 221 236) 10%, rgb(255 255 255) 45% 55%, rgb(212 221 236) 90%)" 
          }}
        />
      </div>

      <div id="tiles" ref={tilesRef} className="flex">
        {imageUrls.map((url, index) => (
          <div 
            key={index} 
            className="tile flex items-center justify-center relative overflow-hidden rounded-3xl shadow-lg"
            style={{
              width: tileSize,
              aspectRatio: "1",
              backgroundColor: tileBackgroundColor,
              rotate: index === 0 ? "3deg" : index === 1 ? "-2deg" : "5deg",
              zIndex: 3 - index,
              marginLeft: index > 0 ? "-10vmin" : "0",
              "--opacity": 0,
              "--blur": 1,
              boxShadow: "0vmin 3vmin 6vmin rgb(0 0 0 / 25%), inset 0vmin 0.5vmin 1vmin rgb(255 255 255 / 15%)"
            }}
          >
            <svg 
              className="absolute text-white opacity-10" 
              style={{ fontSize: "15vmin" }} 
              width="1em" 
              height="1em" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <img 
              src={url} 
              alt={`Image ${index + 1}`}
              className="absolute left-0 top-0 h-full"
              style={{ 
                aspectRatio: "1", 
                objectFit: "cover", 
                opacity: "var(--opacity)", 
                filter: "blur(calc(var(--blur) * 10px))" 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}