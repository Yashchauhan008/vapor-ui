import { useState, useEffect } from 'react';

const CustomCursor = ({ 
  // You can customize these SVGs or pass custom SVGs as props
  defaultCursorSvg,
  pointerCursorSvg,
  dragCursorSvg,
  textCursorSvg,
  // Default sizing
  cursorSize = { width: 28, height: 28 }
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  
  // Track cursor position
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updatePosition);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  // Handle cursor visibility
  useEffect(() => {
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  // Handle cursor type changes based on element hover
  useEffect(() => {
    const handleMouseOver = (e) => {
      // Check for clickable elements
      const isPointer = e.target.matches('[type="range"], a, button, [role="button"], [type="button"], [type="submit"], [type="reset"], .clickable');
      
      // Check for draggable elements
      const isDraggable = e.target.matches('[draggable="true"], .draggable');
      
      // Check for text input elements
      const isText = e.target.matches('textarea, [contenteditable="true"]');
      
      if (isDraggable) {
        setCursorType('drag');
      } else if (isPointer) {
        setCursorType('pointer');
      } else if (isText) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Add CSS to hide default cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body, * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Default SVG cursors if none are provided as props
  const defaultSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" height="32" viewBox="0 0 32 32" width="32">
      <clipPath id="a">
        <path d="m0 0h32v32h-32z" />
      </clipPath>
      <mask id="b" height="32" maskUnits="userSpaceOnUse" width="32" x="0" y="0">
        <path d="m32 0h-32v32h32z" fill="#fff" />
      </mask>
      <g clipPath="url(#a)">
        <g mask="url(#b)">
          <path d="m6.31879 22.4284c-.10356.1629-.2536.2908-.43074.3673-.17706.0767-.37302.0983-.56261.0623-.18948-.0361-.36386-.1281-.50047-.2644-.1366-.1363-.22923-.3103-.26577-.4998l-3.54142-19.97488c-.027669-.17301-.00764-.3503.05792-.51278.06556-.16249.17417-.30403.31416-.4094.13999-.10538.30606-.17059.48035-.18865.17428-.018042.35018.01176.50879.08621l18.2196 8.9264c.1719.0875.3135.2246.4067.3936.0931.169.1334.362.1156.5541-.0178.1922-.0928.3745-.2155.5234-.1225.1491-.287.2579-.4721.3122l-5.6684 1.5692c-.1514.042-.2902.1206-.4044.2286-.1141.1079-.2001.2421-.2505.391s-.0637.3078-.0386.4629.0877.3017.1824.4271l5.0894 6.7612c.1536.2043.2198.461.1841.714s-.1704.4815-.3745.6352l-1.7248 1.2994c-.2042.1536-.4611.2199-.7141.1842s-.4814-.1704-.6351-.3745l-5.0919-6.7604c-.0944-.1257-.218-.2264-.3602-.2933s-.2986-.0981-.4557-.0907c-.157.0073-.30979.053-.44507.1329-.13529.08-.24907.1918-.33124.3258z" fill="#fff" stroke="#01EBFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
  
  const pointerSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="32" viewBox="0 0 30 32" width="30">
      <path d="m15.2715 8.49449-.5977-1.2817c-.2641-.5666-.7426-1.00498-1.33-1.21878-.5874-.21381-1.2357-.1855-1.8023.07869-.5665.26419-1.0049.74259-1.2187 1.33009-.2138.5874-.1855 1.2357.0786 1.8022l-3.18762-6.8358c-.2641-.56656-.7426-1.00496-1.33-1.21877-.58743-.213801-1.23572-.185501-1.80228.07869-.56655.26419-1.00496.74262-1.21876 1.33005-.21381.58742-.1855 1.23572.07869 1.80228l6.04155 12.95606-4.23182-2.968c-.51247-.3594-1.14671-.5005-1.7632-.3923-.61649.1083-1.16474.457-1.52413.9694-.35939.5125-.50049 1.1467-.39226 1.7632.10824.6165.45695 1.1648.96941 1.5242 6.9037 5.7141 10.21392 7.2914 14.93492 5.0899 1.1221-.5232 2.1302-1.2624 2.9666-2.1752.8365-.9128 1.485-1.9815 1.9084-3.1449.4235-1.1635.6136-2.399.5596-3.6359s-.3511-2.4511-.8743-3.5733l-1.9923-4.27241c-.2642-.56651-.7426-1.00491-1.33-1.21871-.5875-.21381-1.2358-.1855-1.8023.07869-.5666.26419-1.005.74262-1.2188 1.33002s-.1855 1.2357.0787 1.8023z" fill="#fff" stroke="#01EBFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
  
  const dragSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="32" viewBox="0 0 30 32" width="30">
      <path d="m7.67641 6.43486h10.13509l.11 7.47194-10.30016.3962z" fill="#fff" />
      <path d="m12.7528 6.46554c0-.67409-.2678-1.32058-.7445-1.79723-.4766-.47666-1.1231-.74444-1.7972-.74444-.67409 0-1.32057.26778-1.79723.74444-.47665.47665-.74444 1.12314-.74444 1.79723v3.55836" fill="#fff" />
      <path d="m12.7528 6.46554c0-.67409-.2678-1.32058-.7445-1.79723-.4766-.47666-1.1231-.74444-1.7972-.74444-.67409 0-1.32057.26778-1.79723.74444-.47665.47665-.74444 1.12314-.74444 1.79723v3.55836" stroke="#5f45f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="m17.836 8.49887v-2.03333c0-.67409-.2678-1.32058-.7444-1.79723-.4767-.47666-1.1232-.74444-1.7972-.74444-.6741 0-1.3206.26778-1.7973.74444-.4766.47665-.7444 1.12314-.7444 1.79723v3.55836" fill="#fff" />
      <path d="m17.836 8.49887v-2.03333c0-.67409-.2678-1.32058-.7444-1.79723-.4767-.47666-1.1232-.74444-1.7972-.74444-.6741 0-1.3206.26778-1.7973.74444-.4766.47665-.7444 1.12314-.7444 1.79723v3.55836" stroke="#5f45f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="m7.66939 14.0906v-4.0667h-2.54166c-.6741 0-1.32058.2678-1.79723.7444-.47666.4767-.74444 1.1232-.74444 1.7973v1.525c0 2.6963 1.07113 5.2823 2.97775 7.1889s4.49259 2.9777 7.18889 2.9777c2.6964 0 5.2823-1.0711 7.1889-2.9777 1.9067-1.9066 2.9778-4.4926 2.9778-7.1889v-5.5917c0-.67409-.2678-1.32057-.7444-1.79723-.4767-.47665-1.1232-.74443-1.7973-.74443s-1.3205.26778-1.7972.74443c-.4767.47666-.7444 1.12314-.7444 1.79723v1.525" fill="#fff" />
      <path d="m7.66939 14.0906v-4.0667h-2.54166c-.6741 0-1.32058.2678-1.79723.7444-.47666.4767-.74444 1.1232-.74444 1.7973v1.525c0 2.6963 1.07113 5.2823 2.97775 7.1889s4.49259 2.9777 7.18889 2.9777c2.6964 0 5.2823-1.0711 7.1889-2.9777 1.9067-1.9066 2.9778-4.4926 2.9778-7.1889v-5.5917c0-.67409-.2678-1.32057-.7444-1.79723-.4767-.47665-1.1232-.74443-1.7973-.74443s-1.3205.26778-1.7972.74443c-.4767.47666-.7444 1.12314-.7444 1.79723v1.525" stroke="#5f45f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
  
  const textSvg = (
    <svg width={cursorSize.width} height={cursorSize.height} viewBox="0 0 24 24" fill="#5F45F2" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4H14M12 4V20M8 20H16" stroke="#5F45F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const getCursorElement = () => {
    switch(cursorType) {
      case 'pointer':
        return pointerCursorSvg || pointerSvg;
      case 'drag':
        return dragCursorSvg || dragSvg;
      case 'text':
        return textCursorSvg || textSvg;
      default:
        return defaultCursorSvg || defaultSvg;
    }
  };

  return (
    <div 
      className="fixed pointer-events-none"
      style={{
        left: `${position.x+30}px`,
        top: `${position.y+30}px`,
        transform: 'translate(-50%, -50%)',
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.15s ease',
        willChange: 'left, top',
        zIndex: 100000,
        scale:1.6
      }}
    >
      {getCursorElement()}
    </div>
  );
};

export default CustomCursor;