export const StripPatternCode = {
    installation:"",
    imports:"",
    parameters:"",
    usage:`<StripPattern
  color1="#b3b2ff"
  color2="#c08aff"
  color3="#ffd6fa"
  color4="#ff97c5"
  color5="#ffecec"
  stripWidth={24}
>
  <div className="flex items-center justify-center h-full min-h-[500px]">
    <h1 className="text-white font-bold text-5xl">
      vapor ui
    </h1>
  </div>
  // or wrap your existing content here.
</StripPattern>`,
    code:`import React from 'react';

const StripPattern = ({
  children,
  degree = -45,
  color1 = "#b3b2ff",
  color2 = "#c08aff",
  color3 = "#ffd6fa",
  color4 = "#ff97c5",
  color5 = "#ffecec",
  className = "",
  innerClassName = "",
  style = {},
  innerStyle = {},
  minHeight = "100%",
  borderRadius = "0.5rem",
  shadow = "0 10px 15px rgba(0, 0, 0, 0.1)",
  stripWidth = 24
}) => {
  const gradientStyle = {
    backgroundImage:
      "repeating-linear-gradient(" +
      degree +
      "deg, " +
      color1 +
      " 0px " + (stripWidth * 1) + "px, " +
      color2 +
      " " + (stripWidth * 1) + "px " + (stripWidth * 2) + "px, " +
      color3 +
      " " + (stripWidth * 2) + "px " + (stripWidth * 3) + "px, " +
      color4 +
      " " + (stripWidth * 3) + "px " + (stripWidth * 4) + "px, " +
      color5 +
      " " + (stripWidth * 4) + "px " + (stripWidth * 5) + "px)",
    borderRadius: borderRadius,
    boxShadow: shadow,
    minHeight: minHeight,
    ...innerStyle
  };

  return (
    <div className={"flex flex-col items-center justify-center h-full w-full " + className} style={style}>
      <div className={"w-full h-full flex items-center justify-center " + innerClassName} style={gradientStyle}>
        {children}
      </div>
    </div>
  );
};

export default StripPattern;
`,
}