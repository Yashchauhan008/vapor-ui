import { useEffect, useRef, useState } from 'react';

const BlackHole = ({
  totalDiscs = 100,
  totalParticles = 100,
  discsColor = "#444",
  discsWidth = 2,
  totalLines = 100,
  backgroundColor = "black",
  linesColor = "#444",
  linesWidth = 2,
  outerGlowOpacity = 0.75
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [renderState, setRenderState] = useState({
    width: 0,
    height: 0,
    dpi: 1
  });
  
  // Animation state
  const animationRef = useRef(null);
  const discsRef = useRef([]);
  const linesRef = useRef([]);
  const particlesRef = useRef([]);
  const clipRef = useRef({});
  const linesCanvasRef = useRef(null);
  const linesCtxRef = useRef(null);
  const startDiscRef = useRef(null);
  const endDiscRef = useRef(null);
  const particleAreaRef = useRef(null);
  const isMountedRef = useRef(true);
  
  // Initial setup
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Set isMounted to true when component mounts
    isMountedRef.current = true;
    
    // Set size
    const setSize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const dpi = window.devicePixelRatio || 1;
      
      setRenderState({
        width: rect.width,
        height: rect.height,
        dpi
      });
      
      if (canvasRef.current) {
        canvasRef.current.width = rect.width * dpi;
        canvasRef.current.height = rect.height * dpi;
      }
      
      return rect;
    };
    
    const rect = setSize();
    
    // Setup discs
    const setDiscs = () => {
      const { width, height } = rect;
      const discs = [];
      
      // Match original code dimensions exactly
      const startDisc = {
        x: width * 0.5,
        y: height * 0.45,
        w: width * 0.75,  // Use 75% of width to ensure it's large like original
        h: height * 0.7   // Use 70% of height to maintain aspect ratio
      };
      
      const endDisc = {
        x: width * 0.5,
        y: height * 0.95,
        w: 0,
        h: 0
      };
      
      startDiscRef.current = startDisc;
      endDiscRef.current = endDisc;
      
      let prevBottom = height;
      const clip = {};
      
      for (let i = 0; i < totalDiscs; i++) {
        const p = i / totalDiscs;
        const disc = tweenDisc({ p }, startDisc, endDisc);
        const bottom = disc.y + disc.h;
        
        if (bottom <= prevBottom) {
          clip.disc = { ...disc };
          clip.i = i;
        }
        
        prevBottom = bottom;
        discs.push(disc);
      }
      
      clip.path = new Path2D();
      clip.path.ellipse(
        clip.disc.x,
        clip.disc.y,
        clip.disc.w,
        clip.disc.h,
        0,
        0,
        Math.PI * 2
      );
      clip.path.rect(
        clip.disc.x - clip.disc.w,
        0,
        clip.disc.w * 2,
        clip.disc.y
      );
      
      discsRef.current = discs;
      clipRef.current = clip;
      
      return { startDisc, endDisc };
    };
    
    const { startDisc, endDisc } = setDiscs();
    
    // Setup lines
    const setLines = () => {
      const { width, height } = rect;
      const lines = [];
      
      const linesAngle = (Math.PI * 2) / totalLines;
      
      for (let i = 0; i < totalLines; i++) {
        lines.push([]);
      }
      
      discsRef.current.forEach((disc) => {
        for (let i = 0; i < totalLines; i++) {
          const angle = i * linesAngle;
          
          const p = {
            x: disc.x + Math.cos(angle) * disc.w,
            y: disc.y + Math.sin(angle) * disc.h
          };
          
          lines[i].push(p);
        }
      });
      
      linesRef.current = lines;
      
      const linesCanvas = new OffscreenCanvas(width, height);
      const ctx = linesCanvas.getContext('2d');
      
      lines.forEach((line) => {
        ctx.save();
        
        let lineIsIn = false;
        line.forEach((p1, j) => {
          if (j === 0) return;
          
          const p0 = line[j - 1];
          
          if (
            !lineIsIn &&
            (ctx.isPointInPath(clipRef.current.path, p1.x, p1.y) ||
             ctx.isPointInStroke(clipRef.current.path, p1.x, p1.y))
          ) {
            lineIsIn = true;
          } else if (lineIsIn) {
            ctx.clip(clipRef.current.path);
          }
          
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = linesColor;
          ctx.lineWidth = linesWidth;
          ctx.stroke();
          ctx.closePath();
        });
        
        ctx.restore();
      });
      
      linesCanvasRef.current = linesCanvas;
      linesCtxRef.current = ctx;
    };
    
    setLines();
    
    // Setup particles
    const setParticles = () => {
      const { width, height } = rect;
      const particles = [];
      
      const particleArea = {
        sw: clipRef.current.disc.w * 0.5,
        ew: clipRef.current.disc.w * 2,
        h: height * 0.85
      };
      
      particleArea.sx = (width - particleArea.sw) / 2;
      particleArea.ex = (width - particleArea.ew) / 2;
      
      particleAreaRef.current = particleArea;
      
      
      for (let i = 0; i < totalParticles; i++) {
        const particle = initParticle(true, particleArea);
        particles.push(particle);
      }
      
      particlesRef.current = particles;
      return particleArea;
    };
    
    const particleArea = setParticles();
    
    // Initialize particle
    function initParticle(start = false, area) {
      const sx = area.sx + area.sw * Math.random();
      const ex = area.ex + area.ew * Math.random();
      const dx = ex - sx;
      const y = start ? area.h * Math.random() : area.h;
      const r = 0.5 + Math.random() * 4;
      const vy = 0.5 + Math.random();
      
      return {
        x: sx,
        sx,
        dx,
        y,
        vy,
        p: 0,
        r,
        c: "rgba(255, 255, 255, "+Math.random()+")"
      };
    }
    
    // Tween helpers
    function easeInExpo(x) {
      return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    }
    
    function tweenValue(start, end, p, ease = false) {
      const delta = end - start;
      const easeFn = ease === 'inExpo' ? easeInExpo : (x => x); // Linear by default
      return start + delta * easeFn(p);
    }
    
    function tweenDisc(disc, startDisc, endDisc) {
      disc.x = tweenValue(startDisc.x, endDisc.x, disc.p);
      disc.y = tweenValue(startDisc.y, endDisc.y, disc.p, 'inExpo');
      disc.w = tweenValue(startDisc.w, endDisc.w, disc.p);
      disc.h = tweenValue(startDisc.h, endDisc.h, disc.p);
      return disc;
    }
    
    // Animation tick function
    const tick = (time) => {
      // Check if component is still mounted
      if (!isMountedRef.current) return;
      
      // Check if canvas is still available
      if (!canvasRef.current) {
        // Canvas is no longer available, cancel animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        // Context is not available, cancel animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.scale(renderState.dpi, renderState.dpi);
      
      // Move discs
      discsRef.current.forEach((disc) => {
        disc.p = (disc.p + 0.001) % 1;
        tweenDisc(disc, startDiscRef.current, endDiscRef.current);
      });
      
      // Move particles
      particlesRef.current.forEach((particle) => {
        particle.p = 1 - particle.y / particleAreaRef.current.h;
        particle.x = particle.sx + particle.dx * particle.p;
        particle.y -= particle.vy;
        
        if (particle.y < 0) {
          const newParticle = initParticle(false, particleAreaRef.current);
          particle.y = newParticle.y;
          particle.sx = newParticle.sx;
          particle.dx = newParticle.dx;
        }
      });
      
      // Draw discs
      ctx.strokeStyle = discsColor;
      ctx.lineWidth = discsWidth;
      
      // Outer disc
      ctx.beginPath();
      ctx.ellipse(
        startDiscRef.current.x,
        startDiscRef.current.y,
        startDiscRef.current.w,
        startDiscRef.current.h,
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.closePath();
      
      // Inner discs
      discsRef.current.forEach((disc, i) => {
        if (i % 5 !== 0) return;
        
        if (disc.w < clipRef.current.disc.w - 5) {
          ctx.save();
          ctx.clip(clipRef.current.path);
        }
        
        ctx.beginPath();
        ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        
        if (disc.w < clipRef.current.disc.w - 5) {
          ctx.restore();
        }
      });
      
      // Draw lines
      if (linesCanvasRef.current) {
        ctx.drawImage(linesCanvasRef.current, 0, 0);
      }
      
      // Draw particles
      ctx.save();
      ctx.clip(clipRef.current.path);
      
      particlesRef.current.forEach((particle) => {
        ctx.fillStyle = particle.c;
        ctx.beginPath();
        ctx.rect(particle.x, particle.y, particle.r, particle.r);
        ctx.closePath();
        ctx.fill();
      });
      
      ctx.restore();
      
      // End frame
      ctx.restore();
      
      // Request next frame only if still mounted
      if (isMountedRef.current) {
        animationRef.current = requestAnimationFrame(tick);
      }
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(tick);
    
    // Handle resize
    const handleResize = () => {
      // Only proceed if component is still mounted
      if (!isMountedRef.current || !containerRef.current || !canvasRef.current) return;
      
      const rect = setSize();
      const { startDisc, endDisc } = setDiscs();
      setLines();
      const particleArea = setParticles();
      
      // Update animation references
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(tick);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      // Set mounted flag to false to prevent further updates
      isMountedRef.current = false;
      
      // Cancel animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Remove event listener
      window.removeEventListener('resize', handleResize);
    };
  }, [totalDiscs, totalParticles, discsColor, discsWidth, totalLines, linesColor, linesWidth]);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-[100vh] overflow-hidden"
      style={{ background: backgroundColor }}
    >
      <canvas 
        ref={canvasRef}
        className="block w-full h-full scale-[200%] translate-x-[50vw] translate-y-[50vh]"
      />
      <div 
        className="absolute inset-0 z-10"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '150%',
          height: '140%',
          transform: 'translate(-50%, -50%)',
          background: "radial-gradient(ellipse at 50% 55%, transparent 10%, "+backgroundColor+" 50%)",
          zIndex: 2,
        }}
      />
      <div 
        className="absolute left-1/2 z-20"
        style={{
          position: 'absolute',
          top: '-71.5%',
          left: '50%',
          width: '30%',
          height: '140%',
          transform: 'translateX(-50%)',
          borderRadius: '0 0 100% 100%',
          background: 'linear-gradient(20deg, #00f8f1, rgba(255, 189, 30, 0.125) 16.5%, #fe848f 33%, rgba(254, 132, 143, 0.125) 49.5%, #00f8f1 66%, rgba(0, 248, 241, 0.375) 85.5%, #ffbd1e 100%) 0 100% / 100% 200%',
          filter: 'blur(50px)',
          mixBlendMode: 'plus-lighter',
          opacity: outerGlowOpacity,
          zIndex: 3,
          animation: 'aura-glow 5s infinite linear',
        }}
      />
      <div 
        className="absolute z-30"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at 50% 75%, #a900ff 20%, transparent 75%)',
          mixBlendMode: 'overlay',
          zIndex: 5,
        }}
      />
      <div 
        className="absolute inset-0 z-40"
        style={{
          background: 'repeating-linear-gradient(transparent, transparent 1px, white 1px, white 2px)',
          mixBlendMode: 'overlay',
          opacity: 0.5,
          zIndex: 10,
        }}
      />
      
      <style jsx>{`
        @keyframes aura-glow {
          0% { background-position: 0 100%; }
          100% { background-position: 0 300%; }
        }
      `}</style>
    </div>
  );
};

export default BlackHole;