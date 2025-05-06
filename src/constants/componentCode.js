const Testimonials = {
    'testimonial-carousel': () => import("../constants/Testimonials/TestimonialCarouselCode"),
  };
  
  const InteractiveElements = {
    'apple-dock': () => import("../constants/AnimatedElements/AppleDockCode"),
    'tech-stack-showcase': () => import("../constants/AnimatedElements/TechStackShowcaseCode"),
    'chandelier': () => import("../constants/AnimatedElements/ChandelierCode"),
    'elastic-accordion': () => import("../constants/AnimatedElements/ElasticAccordionCode"),
    'mask-mouse-effect': () => import("../constants/AnimatedElements/MaskMouseEffectCode"),
    'memory-game': () => import("../constants/AnimatedElements/MemoryGameCode"),
    'social-icons-grid': () => import("../constants/AnimatedElements/SocialIconsGridCode")
    // '': () => import("../constants/")
  };

  
  const FormElements = {
    "action-button": () => import("../constants/FormElements/ActionButtonCode"),
    'full-screen-navbar': () => import("../constants/FormElements/FullScreenNavbarCode")

  }

  const Cards = {
    "feature-cards": () => import("../constants/Cards/FeatureCardsCode"),
    'flip-gallery': () => import("../constants/Cards/FlipGalleryCode.js"),
    'card-stack': () => import("../constants/Cards/CardStackCode.js"),
    'canvas-card': () => import("../constants/Cards/CanvasCardCode.js"),
    'magic-wand-reveal': () => import("../constants/Cards/MagicWandRevealCode.js"),
    'instagram-carousel': () => import("../constants/Cards/InstagramCarouselCode.js"),
    'kippo-card-swiper': () => import("../constants/Cards/KippoCardSwiperCode.js")

  }
  
  const TextAnimations = {
    "aurora-title": () => import("../constants/TextAnimation/AuroraTitleCode.js"),
    "text-fade-reveal": () => import("../constants/TextAnimation/TextFadeRevealCode.js"),
    "text-slide-reveal": () => import("../constants/TextAnimation/TextSlideRevealCode.js"),
    "text-wave-reveal": () => import("../constants/TextAnimation/TextWaveRevealCode.js"),
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
    ...TextAnimations,
    // ...components,
    // ...marquee,
  };
  