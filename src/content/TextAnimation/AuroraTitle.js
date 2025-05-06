import React from "react";

const AuroraTitle = ({
  title = "the beautiful aurora",
  colors = ["#00c2ff", "#ffc640", "#33ff8c", "#e54cff"],
  fontSize = "clamp(3rem, 8vw, 7rem)",
  blur = "1rem",
  animationDuration = 12,
}) => {
  return (
    <div className="bg-black text-white grid place-items-center text-center relative overflow-hidden">
      <style>{`
        @keyframes aurora-border {
          0% {
            border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          }
          25% {
            border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%;
          }
          50% {
            border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%;
          }
          75% {
            border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%;
          }
          100% {
            border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          }
        }

        @keyframes aurora-1 {
          0% { top: 0; right: 0; }
          50% { top: 100%; right: 75%; }
          75% { top: 100%; right: 25%; }
          100% { top: 0; right: 0; }
        }

        @keyframes aurora-2 {
          0% { top: -50%; left: 0%; }
          60% { top: 100%; left: 75%; }
          85% { top: 100%; left: 25%; }
          100% { top: -50%; left: 0%; }
        }

        @keyframes aurora-3 {
          0% { bottom: 0; left: 0; }
          40% { bottom: 100%; left: 75%; }
          65% { bottom: 40%; left: 50%; }
          100% { bottom: 0; left: 0; }
        }

        @keyframes aurora-4 {
          0% { bottom: -50%; right: 0; }
          50% { bottom: 0%; right: 40%; }
          90% { bottom: 50%; right: 25%; }
          100% { bottom: -50%; right: 0; }
        }
      `}</style>

      <div>
        <h1
          className="font-extrabold relative tracking-tight"
          style={{ fontSize }}
        >
          {title}
          <div className="absolute inset-0 z-10 pointer-events-none mix-blend-darken">
            {colors.map((color, i) => {
              const animationNames = [
                "aurora-1",
                "aurora-2",
                "aurora-3",
                "aurora-4",
              ];
              const animationName = animationNames[i];
              const animationTime = animationDuration + i * 2;

              const style = {
                backgroundColor: color,
                filter: "blur(" + blur + ")",
                animation:
                  "aurora-border 6s ease-in-out infinite, " +
                  animationName +
                  " " +
                  animationTime +
                  "s ease-in-out infinite alternate",
              };

              const positionStyle = [
                { top: "-50%", right: 0 },
                { top: "-50%", left: 0 },
                { bottom: 0, left: 0 },
                { bottom: "-50%", right: 0 },
              ][i];

              return (
                <div
                  key={i}
                  className="absolute w-[60vw] h-[60vw] mix-blend-overlay"
                  style={{
                    ...style,
                    ...positionStyle,
                    borderRadius: "37% 29% 27% 27% / 28% 25% 41% 37%",
                  }}
                ></div>
              );
            })}
          </div>
        </h1>
      </div>
    </div>
  );
};

export default AuroraTitle;
