
  
  const InteractiveElements = {
    'apple-dock': () => import("../Demo/AnimetedElements/AppleDockDemo"),
    'tech-stack-showcase': () => import("../Demo/AnimetedElements/TechStackShowcaseDemo"),
    'elastic-accordion': () => import("../Demo/AnimetedElements/ElasticAccordionDemo"),
    'mask-mouse-effect': () => import("../Demo/AnimetedElements/MaskMouseEffectDemo"),
    'memory-game': () => import("../Demo/AnimetedElements/MemoryGameDemo"),
    'social-icons-grid': () => import("../Demo/AnimetedElements/SocialIconsGridDemo"),
  };

  
  const FormElements = {
    "action-button": () => import("../Demo/FormElements/ActionButtonDemo"),
    "full-screen-navbar": () => import("../Demo/FormElements/FullScreenNavbarDemo"),
    "testimonial-carousel": () => import("../Demo/FormElements/TestimonialCarouselDemo")
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
    "sparkles-title": () => import("../Demo/TextAnimation/SparklesTitleDemo"),
    "aurora-title": () => import("../Demo/TextAnimation/AuroraTitleDemo"),
    "text-fade-reveal": () => import("../Demo/TextAnimation/TextFadeRevealDemo"),
    "text-slide-reveal": () => import("../Demo/TextAnimation/TextSlideRevealDemo"),
    "text-wave-reveal": () => import("../Demo/TextAnimation/TextWaveRevealDemo")
  }
  
  const Backgrounds = {
    'black-hole': () => import("../Demo/Backgrounds/BlackHoleDemo"),
    'chandelier': () => import("../Demo/Backgrounds/ChandelierDemo"),
    'tunnle': () => import("../Demo/Backgrounds/TunnelDemo"),
    'pipe-grid': () => import("../Demo/Backgrounds/PipeGridDemo"),
    'strip-pattern': () => import("../Demo/Backgrounds/StripPatternDemo"),
    'fire-particles': () => import("../Demo/Backgrounds/FireParticlesDemo")
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
    ...InteractiveElements,
    ...FormElements,
    ...Cards,
    ...Testing,
    ...TextAnimation,
    ...Backgrounds
    // ...components,
    // ...marquee,
  };
  