const Testimonials = {
    'testimonial-carousel': () => import("../Demo/TestimonialCarouselDemo"),
  };
  
  const InteractiveElements = {
    'apple-dock': () => import("../Demo/AppleDockDemo"),
    'tech-stack-showcase': () => import("../Demo/TechStackShowcaseDemo"),
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
  