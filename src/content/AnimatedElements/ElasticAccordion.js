import React, { useState } from 'react';
import { gsap } from 'gsap';

const ElasticAccordion = ({ 
    images, 
    defaultWidth, 
    expandedWidth, 
    height, 
    expandEase, 
    collapseEase
}) => {
    const [clickedIndex, setClickedIndex] = useState(null);
    
    const expand = (index) => {
        const items = document.querySelectorAll('.accordion-item');
        
        gsap.to(items, {
            width: defaultWidth,
            duration: 2,
            ease:`elastic(1, 0.${collapseEase})`
        });
        
        const clickedItem = items[index];
        
        gsap.to(clickedItem, {
            width: clickedIndex === index ? defaultWidth : expandedWidth,
            duration: 2.5,
            ease:`elastic(1, 0.${expandEase})`
        });
        
        setClickedIndex(clickedIndex === index ? null : index);
    };
    
    return (
        <div 
        className="group" 
        style={{ 
            textAlign: 'center', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            backgroundColor: '#060606'
        }}
        >
      {images.map((imageUrl, index) => (
          <div 
          key={index}
          className="accordion-item"
          style={{
              width: defaultWidth,
              height: height,
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              margin: '1vw',
              borderRadius: '3vw',
              display: 'inline-block',
              cursor: 'pointer',
              backgroundColor: '#fff',
              minHeight: '200px',
              transition: 'all ease'
            }}
            onClick={() => expand(index)}
            />
        ))}
    </div>
  );
};

export default ElasticAccordion;
// images, 
// defaultWidth = '15vw', 
// expandedWidth = '42vw', 
// height = '75vh', 
// expandEase = '50', 
// collapseEase = '40' 