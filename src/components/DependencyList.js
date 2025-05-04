import React from 'react';

const DependencyList = ({ deps = [] }) => {
  return (
    <div className="dep-box rounded-lg p-4">
      <span>
        {deps.map((item, index) => (
          <code
            key={index}
            className="bg-gray-800 text-white text-sm py-1 px-3 rounded-md mr-2"
          >
            {item}
          </code>
        ))}
      </span>
    </div>
  );
};

export default DependencyList;
