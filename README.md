# Vapor UI · ![npm](https://img.shields.io/badge/Under_Active_Development-orange) 

Experimental React animation-first component library powered by:

- Framer Motion
- GSAP
- React Spring

## Features
- Fluid gesture animations
- Scroll-triggered effects
- Physics-based motions
- Custom easing presets

## Installation 
```bash
npm install @vapor-ui/core framer-motion gsap
```

## Quick Start
```jsx
import { AnimatedCard, HoverButton } from '@vapor-ui/core';

export default function App() {
  return (
    <AnimatedCard 
      whileHover={{ scale: 1.05 }}
      gsap={{ scrollTrigger: { scrub: true }}}
    >
      <HoverButton
        hoverScale={1.1}
        tapScale={0.95}
      >
        Animate Me
      </HoverButton>
    </AnimatedCard>
  )
}
```

## Component Status
| Component | Animation Type | Docs |
|-----------|----------------|------|
| AnimatedCard | Framer Motion | [View]() |
| HoverButton | GSAP Timeline | [View]() |
| ParallaxSection | ScrollTrigger | [View]() |

## Contributing
```bash
git clone https://github.com/Yashchauhan008/vapor-ui.git
cd vapor-ui
npm install
npm start
```

Made with ❤️ by Yash Chauhan