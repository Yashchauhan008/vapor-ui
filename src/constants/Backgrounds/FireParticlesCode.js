export const FireParticlesCode = {
    installation:"",
    imports:"",
    parameters:"",
    usage:`<FireParticles
    particleCount={100}
    glowColor={"rgba(6, 217, 255, 0.15)"}
    particleColor={["#06d9ff","#06d9ff"]}
    glowSize={600}
    followCursor={true}
/>`,
    code:`import React, { useEffect, useState } from "react";

export default function FireParticles({ 
  particleCount = 40, 
  glowColor = "rgba(6, 217, 255, 0.15)", 
  particleColor = ["#06d9ff"], 
  glowSize = 600,
  followCursor = true 
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!followCursor) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followCursor]);

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const colors = Array.isArray(particleColor) ? particleColor : [particleColor];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: -Math.random() * 22,
      duration: 12 + Math.random() * 10,
      color: randomColor,
    };
  });

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes particle {" +
            "0% { opacity: 0; transform: translateY(100vh) scale(0); }" +
            "10% { opacity: 1; }" +
            "90% { opacity: 1; }" +
            "100% { opacity: 0; transform: translateY(-100vh) scale(1); }" +
            "}" +
            ".animate-particle {" +
            "animation: particle linear infinite;" +
            "}"
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {followCursor && (
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(" +
                glowSize +
                "px circle at " +
                mousePosition.x +
                "px " +
                mousePosition.y +
                "px, " +
                glowColor +
                ", rgba(6, 217, 255, 0.06) 40%, transparent 70%)",
              opacity: 0.4,
            }}
          />
        )}

        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full animate-particle"
            style={{
              left: particle.left + "%",
              top: particle.top + "%",
              animationDelay: particle.delay + "s",
              animationDuration: particle.duration + "s",
              backgroundColor: particle.color,
              boxShadow: "0 0 6px " + particle.color + "40",
            }}
          />
        ))}
      </div>
    </>
  );
}
`,
}