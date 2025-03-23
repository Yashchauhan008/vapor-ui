const animations = {
    'animated-content': () => import("../demo/Animations/AnimatedContentDemo"),
  };
  
  const textAnimations = {
    'split-text': () => import("../demo/TextAnimations/SplitTextDemo"),
  };
  
  const components = {
    'animated-list': () => import("../demo/Components/AnimatedListDemo"),
  };
  
  const marquee = {
    'aurora': () => import("../demo/Backgrounds/AuroraDemo"),
  };
  
  export const componentMap = {
    ...animations,
    ...textAnimations,
    ...components,
    ...marquee,
  };
  