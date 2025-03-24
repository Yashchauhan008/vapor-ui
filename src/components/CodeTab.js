import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { testimonialCarouselCode } from '../constants/Codes/TestimonialCarouselCode';

const CodeTab = () => {
  if (!testimonialCarouselCode) {
    return (
      <div className="code-error">
        <p>Code content failed to load. Please check:</p>
        <ul>
          <li>TestimonialCarouselCode.js file exists</li>
          <li>Proper export/import paths</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="code-tab-container">
      <h2>Component Code</h2>
      <div className="code-box">
        <SyntaxHighlighter
          language="javascript"
          style={synthwave84}
          customStyle={{
            borderRadius: '12px',
            padding: '20px',
            marginTop: '15px',
            background: '#000 !important'
          }}
        >
          {testimonialCarouselCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeTab;
