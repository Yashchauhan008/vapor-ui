const Testimonials = {
    'testimonial-carousel': () => import("../constants/Testimonials/TestimonialCarouselCode"),
  };
  
  const InteractiveElements = {
    'apple-dock': () => import("../constants/Interactive-elements/AppleDockCode"),
    // 'tech-stack-showcase': () => import("../Demo/AnimetedElements/TechStackShowcaseDemo"),
    // 'chandelier': () => import("../Demo/AnimetedElements/ChandelierDemo"),
    // 'elastic-accordion': () => import("../Demo/AnimetedElements/ElasticAccordionDemo"),
    // 'mask-mouse-effect': () => import("../Demo/AnimetedElements/MaskMouseEffectDemo")
  };

  
//   const FormElements = {
//     "action-button": () => import("../Demo/Buttons/ActionButtonDemo")
//   }

//   const Cards = {
//     "feature-cards": () => import("../Demo/Cards/FeatureCardsDemo")
//   }
  
//   const Testing = {
//     "test-demo": () => import("../Demo/TestDemo")
//   }
  
//   const components = {
//     'animated-list': () => import("../Demo/AnimatedListDemo"),
//   };
  
//   const marquee = {
//     'aurora': () => import("../demo/Backgrounds/AuroraDemo"),
//   };
  
  export const componentCodeMap = {
    ...Testimonials,
    ...InteractiveElements,
    // ...FormElements,
    // ...Cards,
    // ...Testing,
    // ...components,
    // ...marquee,
  };
  