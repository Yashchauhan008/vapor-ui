export const CanvasCardCode= {
    installation:"",
    imports:`import img1 from "../../path/to/img.png"`,
    parameters:"",
    usage:`<CanvasCard
    align="left"
    image={img1}
    subtitle="Heading"
    title1="Canvas"
    title2="Card"
    details="Custom gradient with hex."
    gradientFrom="#F94300"
    gradientTo="#E32200"
 />`,
    code:`import React from "react";

const CanvasCard = ({
  align = "right",
  image,
  subtitle,
  title1,
  title2,
  details,
  gradientFrom = "#FD8944",
  gradientTo = "#994B17",
}) => {
  const isLeft = align === "left";
  const gradientId = "grad-" + gradientFrom.slice(1) + "-" + gradientTo.slice(1);
  const textGradientStyle = {
    backgroundImage: "linear-gradient(to right, " + gradientFrom + ", " + gradientTo + ")",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <a
      href="#"
      className="relative block w-[400px] h-[400px] p-5 text-inherit no-underline group"
    >
      {/* SVG Border */}
      <div className="absolute top-10 -left-10 w-full h-full z-0 transform -rotate-[10deg] skew-x-[-10deg] transition-transform duration-200 group-hover:rotate-[-14deg] group-hover:skew-x-[-14deg] group-hover:scale-[0.96]">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradientFrom} stopOpacity="1" />
              <stop offset="100%" stopColor={gradientTo} stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect
            className="stroke-[4] fill-none [stroke-dasharray:2000] [stroke-dashoffset:2000] group-hover:animate-[draw-line_3s_cubic-bezier(0.19,1,0.22,1)_forwards]"
            stroke={"url(#" + gradientId + ")"}
            width="100%"
            height="100%"
          />
        </svg>
      </div>

      {/* Image */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden bg-white transform -rotate-[10deg] skew-x-[-10deg] transition-transform duration-200 group-hover:rotate-[-14deg] group-hover:skew-x-[-14deg] group-hover:scale-[0.96]">
        <img
          src={image}
          alt=""
          className="max-w-[500px] max-h-[500px] opacity-30 transform scale-[0.9] transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
        />
      </div>

      {/* Text Content */}
      <div
        className={
          "absolute bottom-0 " + 
          (isLeft ? "-left-[25%]" : "left-[85%]") + 
          " uppercase z-10"
        }
      >
        <span
          className="block absolute left-0 top-2 text-xl font-white rotate-[270deg] -translate-y-full -translate-x-[calc(100%+80px)] origin-top-left opacity-0 transition-all duration-700 delay-[350ms] group-hover:translate-x-[-00%] group-hover:opacity-100 bg-clip-text text-transparent"
          style={textGradientStyle}
        >
          {subtitle}
        </span>
        <strong className="block text-[62px] font-white transform -translate-x-20 opacity-0 transition-all duration-700 delay-[100ms] group-hover:translate-x-0 group-hover:opacity-100 text-white">
          {title1}
        </strong>
        <strong className="block text-[62px] font-white transform -translate-x-20 opacity-0 transition-all duration-700 delay-[200ms] group-hover:translate-x-0 group-hover:opacity-100 text-white">
          {title2}
        </strong>
        <span
          className="block transform -translate-x-20 opacity-0 transition-all duration-700 delay-[140ms] group-hover:translate-x-0 group-hover:opacity-100 bg-clip-text text-transparent"
          style={textGradientStyle}
        >
          {details}
        </span>
      </div>

      {/* Keyframes */}
      <style>
        {"@keyframes draw-line { from { stroke-dashoffset: 2000; } to { stroke-dashoffset: 0; } }"}
      </style>
    </a>
  );
};

export default CanvasCard;
`,
}