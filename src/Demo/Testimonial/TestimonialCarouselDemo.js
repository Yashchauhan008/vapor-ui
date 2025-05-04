import React from "react";
import TestimonialCarousel from "../../content/Testimonial/TestimonialCarousel";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

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

  const props = [
    {
      property: "testimonials",
      type: "Array<Object>",
      default: "(required)",
      description: "Array of testimonial objects to display in the carousel."
    },
    {
      property: "testimonials[].content",
      type: "string",
      default: "''",
      description: "The main testimonial message or feedback content."
    },
    {
      property: "testimonials[].name",
      type: "string",
      default: "''",
      description: "The name of the person giving the testimonial."
    },
    {
      property: "testimonials[].role",
      type: "string",
      default: "''",
      description: "The professional role or title of the person."
    },
    {
      property: "testimonials[].company",
      type: "string",
      default: "''",
      description: "The company or organization the person is associated with."
    },
    {
      property: "testimonials[].avatar",
      type: "string",
      default: "''",
      description: "A string representing the person's avatar (e.g., initials or icon)."
    },
    {
      property: "testimonials[].color",
      type: "string (Tailwind gradient class)",
      default: "''",
      description: "Tailwind gradient utility class applied as the background for the avatar circle."
    }
  ];
  

  return (
    <>
      <div className="demo-box">
        <div className="preview-box">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
        <div className="states">
        {/* <h3>Customization</h3>
        <div className="customization-box">
          <div className="customization-item">
            
          </div>
        </div> */}
        <h3>Props</h3>
        <PropsTable properties={props}/>
        <h3>Dependencies</h3>
        <DependencyList deps={["react","framer-motion"]}/>
        </div>
      </div>
    </>
  );
};

export default TestimonialCarouselDemo;
