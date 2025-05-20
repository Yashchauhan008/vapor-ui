export const SparklesTitleCode = {
    installation:"",
    imports:"",
    parameters:`const heartSvg = (color) => (
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color}
    />
  );

  const circleSvg = (color) => (
    <circle cx="10.5" cy="10.5" r="8" fill={color} />
  );

  const diamondSvg = (color) => (
    <path d="M10.5 2L16 10.5L10.5 19L5 10.5L10.5 2Z" fill={color} />
  );

  // Get the appropriate custom SVG based on selection
  const getCustomSvg = () => {
    if (!config.useCustomSvg) return null;

    // You can extend this to have multiple custom SVG options
    return heartSvg;
  };`,
    usage:`<SparklesTitle
    as="div"
    text="i love vapor"
    colors={{
      primary: "#ff6b6b",
      secondary: "#4ecdc4",
    }}
      //in turm of custom svg
    customSvg={svg}

    sparklesCount={30}
    sparkleSize={21}
    textSize="text-4xl"
    fontWeight="font-bold"
    animationDuration={0.8}
    updateInterval={100}
    paused={false}
    className="text-center"
/>`,
    code:`import React, { useState, useEffect } from 'react';

const Sparkle = ({ 
  id, 
  x, 
  y, 
  color, 
  delay, 
  scale, 
  animationDuration,
  size = 21,
  customSvg
}) => {
  const [animationState, setAnimationState] = useState({
    opacity: 0,
    transform: "scale(0) rotate(75deg)",
  });

  useEffect(() => {
    const animate = () => {
      // Initial state
      setAnimationState({
        opacity: 0,
        transform: "scale(0) rotate(75deg)",
      });

      // Animate in
      setTimeout(() => {
        setAnimationState({
          opacity: 1,
          transform: "scale(" + scale + ") rotate(120deg)",
        });
      }, delay * 1000);

      // Animate out
      setTimeout(() => {
        setAnimationState({
          opacity: 0,
          transform: "scale(0) rotate(150deg)",
        });
      }, (delay + animationDuration * 0.5) * 1000);
    };

    animate();
    const interval = setInterval(animate, animationDuration * 1000);

    return () => clearInterval(interval);
  }, [delay, scale, animationDuration]);

  return (
    <svg
      key={id}
      className="pointer-events-none absolute z-20"
      style={{
        left: x,
        top: y,
        opacity: animationState.opacity,
        transform: animationState.transform,
        transition: "all " + (animationDuration * 0.5) + "s ease-in-out",
      }}
      width={size}
      height={size}
      viewBox="0 0 21 21"
    >
      {customSvg ? (
        customSvg(color)
      ) : (
        <path
          d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
          fill={color}
        />
      )}
    </svg>
  );
};

const SparklesTitle = ({
  as: Component = "div",
  text,
  colors = { primary: "#9E7AFF", secondary: "#FE8BBB" },
  className = "",
  sparklesCount = 10,
  sparkleSize = 21,
  customSvg = null,
  textSize = "text-6xl",
  fontWeight = "font-bold",
  animationDuration = 0.8,
  updateInterval = 100,
  paused = false,
  style = {},
  ...props
}) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkle = () => {
      const sparkleX = Math.random() * 100 + "%";
      const sparkleY = Math.random() * 100 + "%";
      const color = Math.random() > 0.5 ? colors.primary : colors.secondary;
      const delay = Math.random() * 2;
      const scale = Math.random() * 1 + 0.3;
      const lifespan = Math.random() * 10 + 5;
      const id = "sparkle-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      
      return { 
        id, 
        x: sparkleX, 
        y: sparkleY, 
        color, 
        delay, 
        scale, 
        lifespan 
      };
    };

    const initializeSparkles = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateSparkle);
      setSparkles(newSparkles);
    };

    const updateSparkles = () => {
      if (paused) return;
      
      setSparkles((currentSparkles) =>
        currentSparkles.map((sparkle) => {
          if (sparkle.lifespan <= 0) {
            return generateSparkle();
          } else {
            return { ...sparkle, lifespan: sparkle.lifespan - 0.1 };
          }
        }),
      );
    };

    initializeSparkles();
    const interval = setInterval(updateSparkles, updateInterval);

    return () => clearInterval(interval);
  }, [colors.primary, colors.secondary, sparklesCount, paused, updateInterval]);

  // Validate required props after hooks
  if (!text) {
    console.warn('SparklesTitle: "text" prop is required');
    return null;
  }

  // Combine class names
  const combinedClassName = [textSize, fontWeight, className]
    .filter(Boolean)
    .join(' ');

  // Combine styles with CSS custom properties for theming
  const combinedStyle = {
    ...style,
    "--sparkles-primary-color": colors.primary,
    "--sparkles-secondary-color": colors.secondary,
  };

  return React.createElement(
    Component,
    {
      className: combinedClassName,
      style: combinedStyle,
      ...props,
    },
    React.createElement(
      "span",
      { 
        className: "relative inline-block",
        style: { position: 'relative', display: 'inline-block' }
      },
      // Render sparkles
      sparkles.map((sparkle) =>
        React.createElement(Sparkle, {
          key: sparkle.id,
          ...sparkle,
          animationDuration,
          size: sparkleSize,
          customSvg,
        })
      ),
      // Render text
      React.createElement(
        "strong", 
        { 
          className: "relative z-10",
          style: { position: 'relative', zIndex: 10 }
        }, 
        text
      )
    )
  );
};

// Default export
export default SparklesTitle;

// Named exports for convenience
export { SparklesTitle, Sparkle };`,
}