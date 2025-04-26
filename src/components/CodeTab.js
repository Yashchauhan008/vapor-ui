import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";
import useCategory from "../utils/useCategory";
import { componentCodeMap } from "../constants/componentCode";
import { useParams } from "react-router-dom";
import { FiCopy, FiCheck } from "react-icons/fi"; // import icons


// Create a custom style that's completely black
const blackTheme = {
  ...synthwave84,
  'code[class*="language-"]': {
    ...synthwave84['code[class*="language-"]'],
    background: 'black !important',
    backgroundColor: 'black !important',
  },
  'pre[class*="language-"]': {
    ...synthwave84['pre[class*="language-"]'],
    background: 'black !important',
    backgroundColor: 'black !important',
    border: "1px solid #ffffff40",
    borderRadius: "20px"
  }
};

const CodeTab = () => {
  const { category, subcategory } = useParams();
  const [codeContent, setCodeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null); // Track which section was copied

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .code-box pre,
      .code-box code,
      .code-box pre[class*="language-"],
      .code-box code[class*="language-"],
      .react-syntax-highlighter-line-number,
      .token {
        background-color: black !important;
        background: black !important;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    if (subcategory && componentCodeMap[subcategory]) {
      setLoading(true);
      setError(null);
      componentCodeMap[subcategory]()
        .then(module => {
          if (module.default) {
            setCodeContent(module.default);
          } else if (module[subcategory.split('-').map((part, i) => 
            i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('')+"Code"]) {
            setCodeContent(module[subcategory.split('-').map((part, i) => 
              i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('')+"Code"]);
          } else if (module.AppleDockCode) {
            setCodeContent(module.AppleDockCode);
          } else if (module.TestimonialCarouselCode) {
            setCodeContent(module.TestimonialCarouselCode);
          } else {
            const possibleExport = Object.values(module).find(
              item => item && typeof item === 'object' &&
                      (item.installation !== undefined ||
                       item.usage !== undefined ||
                       item.code !== undefined)
            );
            if (possibleExport) {
              setCodeContent(possibleExport);
            } else {
              setError(`Could not find valid code content in the imported module for ${subcategory}`);
            }
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load component code:", err);
          setError(`Failed to load code for ${subcategory}`);
          setLoading(false);
        });
    } else if (subcategory) {
      setError(`No code found for component: ${subcategory}`);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [subcategory]);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000); // Reset after 2s
    });
  };

  if (loading) {
    return <div className="text-white">Loading code examples...</div>;
  }

  if (error) {
    return (
      <div className="code-error text-white">
        <p>{error}</p>
        <p>Please check:</p>
        <ul>
          <li>The component name in the URL is correct</li>
          <li>The component exists in our library</li>
          <li>The component code has the expected properties (installation, usage, code)</li>
        </ul>
      </div>
    );
  }

  if (!codeContent) {
    return (
      <div className="code-error text-white">
        <p>Select a component to view its code</p>
      </div>
    );
  }

  const renderSection = (title, content, sectionKey) => (
    <>
      <h4 className="text-white text-4xl font-semibold mt-6 mb-4">{title}</h4>
      <div className="relative code-box mb-4" style={{ backgroundColor: 'black' }}>
      <button
  onClick={() => handleCopy(content, sectionKey)}
  className="absolute top-4 right-4 bg-white text-white text-sm px-3 py-1 rounded-md hover:bg-gray-300 transition"
>
  {copiedSection === sectionKey ? <FiCheck size={18} /> : <FiCopy size={18} />}
</button>
        <SyntaxHighlighter
          language="javascript"
          style={blackTheme}
          customStyle={{
            backgroundColor: 'black',
            background: 'black',
            padding: '20px',
            borderRadius: '20px',
            margin: '0'
          }}
          wrapLines={true}
          lineProps={{ style: { backgroundColor: 'black', background: 'black' } }}
          codeTagProps={{ style: { backgroundColor: 'black', background: 'black' } }}
          PreTag={props => <pre {...props} style={{ ...props.style, backgroundColor: 'black', background: 'black' }} />}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </>
  );

  return (
    <div className="code-tab-container">
      {renderSection("Installation", codeContent.installation || "// Installation instructions not available", "installation")}
      {renderSection("Usage", codeContent.usage || "// Usage examples not available", "usage")}
      {renderSection("Code", codeContent.code || "// Component code not available", "code")}
    </div>
  );
};

export default CodeTab;
