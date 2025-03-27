export const testimonialCarouselCode = `
import React from 'react';
import TestimonialCarousel from '../../content/TestimonialCarousel';

export const TestimonialCarouselDemo = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Thompson',
      role: 'Product Manager',
      company: 'InnovateTech',
      content: 'This component has revolutionized how we present customer feedback. The smooth animations and responsive design are exceptional.',
      avatar: 'S',
      color: 'from-indigo-500 to-purple-600',
    },
    // ... other testimonials
  ];

  return (
    <div className="demo-box">
      <div className="preview-box">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </div>
  );
};
`;
