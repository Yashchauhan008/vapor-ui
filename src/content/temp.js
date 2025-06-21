import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, Settings, Mail, Search, Heart } from 'lucide-react';

const QuantumNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isBreathing, setIsBreathing] = useState(true);
  const orbRef = useRef(null);
  const containerRef = useRef(null);

  const navItems = [
    { icon: Home, label: 'Home', color: 'from-blue-400 to-cyan-400' },
    { icon: User, label: 'Profile', color: 'from-purple-400 to-pink-400' },
    { icon: Search, label: 'Search', color: 'from-green-400 to-emerald-400' },
    { icon: Mail, label: 'Messages', color: 'from-orange-400 to-red-400' },
    { icon: Heart, label: 'Favorites', color: 'from-pink-400 to-rose-400' },
    { icon: Settings, label: 'Settings', color: 'from-indigo-400 to-purple-400' }
  ];

  // Mouse tracking for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create explosion particles
  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 0.6 + Math.random() * 0.4
      });
    }
    setParticles(newParticles);
  };

  const toggleNav = () => {
    if (!isOpen) {
      createParticles();
    }
    setIsOpen(!isOpen);
  };

  const getOrbPosition = () => {
    if (!orbRef.current) return { x: 0, y: 0 };
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt((mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2);
    
    if (distance < 150 && !isOpen) {
      const pullStrength = Math.max(0, 1 - distance / 150) * 10;
      const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
      return {
        x: Math.cos(angle) * pullStrength,
        y: Math.sin(angle) * pullStrength
      };
    }
    return { x: 0, y: 0 };
  };

  const orbOffset = getOrbPosition();

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      {/* Background Overlay */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-700 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Explosion Particles */}
      {isOpen && particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white/30 rounded-full pointer-events-none"
          style={{
            left: `${20 + particle.x * 0.6}%`,
            top: `${20 + particle.y * 0.6}%`,
            animation: `particle-float ${particle.duration}s ease-out ${particle.delay}s forwards`
          }}
        />
      ))}

      {/* Floating Orb */}
      <div
        ref={orbRef}
        className="absolute top-8 right-8 pointer-events-auto cursor-pointer"
        style={{
          transform: `translate(${orbOffset.x}px, ${orbOffset.y}px) ${isBreathing ? 'scale(1.05)' : 'scale(1)'}`
        }}
        onClick={toggleNav}
        onMouseEnter={() => setIsBreathing(false)}
        onMouseLeave={() => setIsBreathing(true)}
      >
        <div className={`
          relative w-16 h-16 rounded-full
          bg-white/10 backdrop-blur-md border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          transition-all duration-500 hover:scale-110 hover:bg-white/20
          ${isBreathing ? 'animate-pulse' : ''}
          ${isOpen ? 'rotate-180 scale-75' : ''}
        `}>
          {/* Glowing Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/50 to-blue-400/50 animate-spin-slow" />
          
          {/* Inner Glow */}
          <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm" />
          
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-white drop-shadow-lg" />
            ) : (
              <Menu className="w-6 h-6 text-white drop-shadow-lg" />
            )}
          </div>
        </div>
      </div>

      {/* Navigation Constellation */}
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        transition-all duration-700 ease-out
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
      `}>
        {/* Central Hub */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.1)]" />
          
          {/* Orbiting Navigation Items */}
          {navItems.map((item, index) => {
            const angle = (index * 60) - 90; // 60 degrees apart, starting from top
            const radius = 120;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            return (
              <div
                key={item.label}
                className="absolute pointer-events-auto cursor-pointer group"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Connection Line */}
                <div 
                  className="absolute w-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    height: `${radius}px`,
                    left: '50%',
                    bottom: '50%',
                    transform: `rotate(${angle + 90}deg)`,
                    transformOrigin: 'bottom center'
                  }}
                />
                
                {/* Nav Item */}
                <div className={`
                  relative w-20 h-20 rounded-2xl
                  bg-white/10 backdrop-blur-xl border border-white/20
                  shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                  transition-all duration-300 hover:scale-110 hover:bg-white/20
                  group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]
                  ${isOpen ? 'animate-float' : ''}
                `}>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  
                  {/* Ripple Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 group-hover:animate-ping" />
                </div>
                
                {/* Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium whitespace-nowrap">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes particle-float {
          0% { transform: translate(0, 0) scale(0); opacity: 1; }
          50% { opacity: 0.8; }
          100% { transform: translate(var(--random-x, 0), var(--random-y, 0)) scale(1); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default QuantumNav;