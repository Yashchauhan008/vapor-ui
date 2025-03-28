import React from "react";
import TestimonialCarousel from "../../content/Testimonial/TestimonialCarousel";

const TestimonialCarouselDemo = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sophia Martinez",
      role: "Product Designer",
      company: "Designify",
      content:
        "This platform completely transformed our workflow. The intuitive interface paired with powerful features has increased our team productivity by 40%.",
      avatar: "S",
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: 2,
      name: "Alexander Chen",
      role: "CTO",
      company: "TechNova",
      content:
        "After evaluating numerous solutions, this stands out for its exceptional attention to detail and performance. Reliable and beautifully crafted.",
      avatar: "A",
      color: "from-blue-500 to-teal-400",
    },
    {
      id: 3,
      name: "Olivia Johnson",
      role: "Marketing Director",
      company: "GlobalReach",
      content:
        "The analytics capabilities are unmatched. We've gained insights that have directly impacted our strategy and resulted in significant growth.",
      avatar: "O",
      color: "from-rose-500 to-orange-400",
    },
  ];

  return (
    <>
      <div className="demo-box">
        <div className="preview-box">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
        <div className="states">
        <h3>Customization</h3>
        <div className="customization-box">
          <div className="customization-item">
            
          </div>
        </div>
        <h3>Props</h3>
        <h3>Dependencies</h3>
        </div>
      </div>
    </>
  );
};

export default TestimonialCarouselDemo;
