const Testimonials = {
    'testimonial-carousel': () => import("../Demo/Testimonial/TestimonialCarouselDemo"),
  };
  
  const InteractiveElements = {
    'apple-dock': () => import("../Demo/AnimetedElements/AppleDockDemo"),
    'tech-stack-showcase': () => import("../Demo/AnimetedElements/TechStackShowcaseDemo"),
    'chandelier': () => import("../Demo/AnimetedElements/ChandelierDemo"),
    'elastic-accordion': () => import("../Demo/AnimetedElements/ElasticAccordionDemo"),
    'mask-mouse-effect': () => import("../Demo/AnimetedElements/MaskMouseEffectDemo"),
    'memory-game': () => import("../Demo/AnimetedElements/MemoryGameDemo"),
    'social-icons-grid': () => import("../Demo/AnimetedElements/SocialIconsGridDemo")
  };

  
  const FormElements = {
    "action-button": () => import("../Demo/FormElements/ActionButtonDemo"),
    "full-screen-navbar": () => import("../Demo/FormElements/FullScreenNavbarDemo")
  }

  const Cards = {
    "feature-cards": () => import("../Demo/Cards/FeatureCardsDemo"),
    "flip-gallery": () => import("../Demo/Cards/FlipGalleryDemo"),
    "card-stack": () => import("../Demo/Cards/CardStackDemo"),
    "canvas-card": () => import("../Demo/Cards/CanvasCardDemo"),
    "magic-wand-reveal": () => import("../Demo/Cards/MagicWandRevealDemo"),
    "instagram-carousel": () => import("../Demo/Cards/InstagramCarouselDemo"),
    "kippo-card-swiper": () => import("../Demo/Cards/KippoCardSwiperDemo")
  }

  const TextAnimation = {
    "aurora-title": () => import("../Demo/TextAnimation/AuroraTitleDemo"),
    "text-fade-reveal": () => import("../Demo/TextAnimation/TextFadeRevealDemo"),
    "text-slide-reveal": () => import("../Demo/TextAnimation/TextSlideRevealDemo"),
    "text-wave-reveal": () => import("../Demo/TextAnimation/TextWaveRevealDemo")
  }
  
  const Testing = {
    "test-demo": () => import("../Demo/TestDemo")
  }
  
//   const components = {
//     'animated-list': () => import("../Demo/AnimatedListDemo"),
//   };
  
//   const marquee = {
//     'aurora': () => import("../demo/Backgrounds/AuroraDemo"),
//   };
  
  export const componentMap = {
    ...Testimonials,
    ...InteractiveElements,
    ...FormElements,
    ...Cards,
    ...Testing,
    ...TextAnimation
    // ...components,
    // ...marquee,
  };
  