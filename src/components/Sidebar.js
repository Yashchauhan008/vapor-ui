import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, NEW, UPDATED } from '../constants/categorylist';
import useCategory from '../utils/useCategory';

const Sidebar = () => {
  // Initialize expandedCategories with all categories expanded
  const initialExpandedState = CATEGORIES.reduce((acc, _, index) => {
    acc[index] = true; // Set all categories to expanded (true)
    return acc;
  }, {});
  
  const [expandedCategories, setExpandedCategories] = useState(initialExpandedState);
  const navigation = useNavigate();
  const { category, subcategory } = useCategory();

  useEffect(() => {
    console.log("sidebar loaded");
  }, []);

  // Toggle category expansion
  const toggleCategory = (index) => {
    setExpandedCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Standardized navigation function
  const handleNavigation = (categoryItem, subcat) => {
    const formattedCategory = categoryItem.replace(/\s+/g, "-").toLowerCase();
    const formattedSubcategory = subcat.replace(/\s+/g, "-").toLowerCase();
    navigation(`/${formattedCategory}/${formattedSubcategory}`);
  };

  return (
    <div className="sidebar">
      {CATEGORIES.map((categoryItem, index) => {
        const isExpanded = expandedCategories[index];
        
        return (
          <div key={index} className="mb-4">
            <div 
              className="flex justify-between items-center cursor-pointer px-2"
              onClick={() => toggleCategory(index)}
            >
              <h3 className="font-semibold text-[#01EBFF]">{categoryItem.name}</h3>
              <span className="text-gray-600">
                {isExpanded ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
              </span>
            </div>
            
            <div className={`sub-category ml-2 mt-1 transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
              {categoryItem.subcategories.map((subcat, subIndex) => {
                const isNew = NEW.includes(subcat);
                const isUpdated = UPDATED.includes(subcat);
                const isActive = subcat.toLowerCase() === subcategory.toLowerCase();

                return (
                  <h4 
                    key={subIndex} 
                    className={`cursor-pointer flex items-center justify-between ${isActive ? 'active' : ''}`} 
                    onClick={() => handleNavigation(categoryItem.name, subcat)}
                  >
                    <span>{subcat}</span>
                    <div className="flex gap-1">
                      {isNew && <span className="new">New</span>}
                      {isUpdated && <span className="updated">Updated</span>}
                    </div>
                  </h4>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;