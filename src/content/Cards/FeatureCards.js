import React from "react";
import img1 from "../../assets/images/featureCardsImages/featurecard1.avif";
import img2 from "../../assets/images/featureCardsImages/featurecard2.avif";
import img3 from "../../assets/images/featureCardsImages/featurecard3.avif";

const FeatureCards = () => {
  return (
    <>
      <div className="bg-[#111111] rounded-[50px] h-[500px] w-full border-2 border-[#1E1E1E] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center h-[150px] w-full">
          <h1 className="text-white text-xl font-extrabold md:text-4xl font-semibold">Latest from Blog</h1>
        </div>

        {/* Card Section */}
        <div className="flex items-center justify-center gap-10 px-4 relative top-10 h-[300px]">
          {/* Card 1 */}
          <div className="w-[28%] h-[400px] bg-black flex flex-col items-start justify-start rounded-lg shadow-md translate-y-10 -rotate-6 transition-all duration-300 hover:-translate-y-0 hover:rotate-0">
            <img src={img1} alt="Card 1" className="h-[150px] w-full object-cover rounded-md" />
            <div className="p-4 w-full">
            <h2 className="text-xl font-bold text-white mb-2">How to Think Like an Expert Developer</h2>
            <p className="text-sm text-gray-400">
            Hey, developers! I’ve been pushing code in web development for a while now, and let me tell you, there’s an enormous difference between a developer who simply creates lines and one who genuinely knows the symphony behind the code.
            </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-[28%] h-[400px] bg-black flex flex-col items-start justify-start rounded-xl shadow-md translate-y-3 transition-all duration-300 hover:-translate-y-0 hover:rotate-0">
            <img src={img2} alt="Card 2" className="h-[150px] w-full object-cover rounded-md" />
            <div className="p-4 w-full">
            <h2 className="text-xl font-bold text-white mb-2">Mastering the Art of Visionary Design: Skills You wanna boost</h2>
            <p className="text-sm text-gray-400">
            In my 25+ years of experience I’ve determined that there’s one key capability that separates good product designers from great designers.
            </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-[28%] h-[400px] bg-black flex flex-col items-start justify-start rounded-xl shadow-md translate-y-10 rotate-6 transition-all duration-300 hover:-translate-y-0 hover:rotate-0">
            <img src={img3} alt="Card 3" className="h-[150px] w-full object-cover rounded-md" />
            <div className="p-4 w-full">
            <h2 className="text-xl font-bold text-white mb-2">Self-host Plausible Analytics</h2>
            <p className="text-sm text-gray-400">
            Plausible is an open-source analytics tool that provides insights into website traffic without compromising user privacy. While Plausible offers a hosted service, self-hosting can significantly reduce costs, especially for sites with moderate to high traffic.
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureCards;
