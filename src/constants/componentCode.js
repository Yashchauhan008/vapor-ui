const Testimonials = {
    'testimonial-carousel': () => import("../constants/Testimonials/TestimonialCarouselCode"),
  };
  
  const InteractiveElements = {
    'apple-dock': () => import("../constants/AnimatedElements/AppleDockCode"),
    'tech-stack-showcase': () => import("../constants/AnimatedElements/TechStackShowcaseCode"),
    'chandelier': () => import("../constants/AnimatedElements/ChandelierCode"),
    'elastic-accordion': () => import("../constants/AnimatedElements/ElasticAccordionCode"),
    'mask-mouse-effect': () => import("../constants/AnimatedElements/MaskMouseEffectCode")
  };

  
  const FormElements = {
    "action-button": () => import("../constants/FormElements/ActionButtonCode")
  }

  const Cards = {
    "feature-cards": () => import("../constants/Cards/FeatureCardsCode")
  }
  
  const Testing = {
    "test-demo": () => import("../Demo/TestDemo")
  }

  
//   const marquee = {
//     'aurora': () => import("../demo/Backgrounds/AuroraDemo"),
//   };
  
  export const componentCodeMap = {
    ...Testimonials,
    ...InteractiveElements,
    ...FormElements,
    ...Cards,
    ...Testing,
    // ...components,
    // ...marquee,
  };
  