const Testimonials = {
    'testimonial-carousel': () => import("../Demo/Testimonial/TestimonialCarouselDemo"),
  };
  
  const InteractiveElements = {
    'apple-dock': () => import("../Demo/AnimetedElements/AppleDockDemo"),
    'tech-stack-showcase': () => import("../Demo/AnimetedElements/TechStackShowcaseDemo"),
    'chandelier': () => import("../Demo/AnimetedElements/ChandelierDemo"),
    'elastic-accordion': () => import("../Demo/AnimetedElements/ElasticAccordionDemo"),
  };
  
//   const components = {
//     'animated-list': () => import("../Demo/AnimatedListDemo"),
//   };
  
//   const marquee = {
//     'aurora': () => import("../demo/Backgrounds/AuroraDemo"),
//   };
  
  export const componentMap = {
    ...Testimonials,
    ...InteractiveElements,
    // ...components,
    // ...marquee,
  };
  