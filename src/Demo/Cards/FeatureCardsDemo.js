import React from 'react'
import FeatureCards from '../../content/Cards/FeatureCards'

import img1 from "../../assets/images/featureCardsImages/featurecard1.avif"
import img2 from "../../assets/images/featureCardsImages/featurecard2.avif"
import img3 from "../../assets/images/featureCardsImages/featurecard3.avif"

const FeatureCardsDemo = () => {

  const blogPosts = [
    {
      image: img1,
      title: "How to Think Like an Expert Developer",
      description: "Hey, developers! I've been pushing code in web development for a while now, and let me tell you, there's an enormous difference between a developer who simply creates lines and one who genuinely knows the symphony behind the code."
    },
    {
      image: img2,
      title: "Mastering the Art of Visionary Design: Skills You wanna boost",
      description: "In my 25+ years of experience I've determined that there's one key capability that separates good product designers from great designers."
    },
    {
      image: img3,
      title: "Self-host Plausible Analytics",
      description: "Plausible is an open-source analytics tool that provides insights into website traffic without compromising user privacy. While Plausible offers a hosted service, self-hosting can significantly reduce costs, especially for sites with moderate to high traffic."
    }
  ];

  return (
    <>
      <div className="demo-box">
        <div className="preview-box d-flex justify-content-center gap-3 p-10">
           <FeatureCards 
        title="Latest from Blog" 
        cards={blogPosts} 
      />
        </div>
        <div className="states">
          <h3>Customization</h3>
          <div className="customization-box">
            <div className="customization-item"></div>
          </div>
          <h3>Props</h3>
          <h3>Dependencies</h3>
        </div>
      </div>
    </>
  )
}

export default FeatureCardsDemo