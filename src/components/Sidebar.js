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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  // Close mobile sidebar when clicking outside
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Standardized navigation function
  const handleNavigation = (categoryItem, subcat) => {
    const formattedCategory = categoryItem.replace(/\s+/g, "-").toLowerCase();
    const formattedSubcategory = subcat.replace(/\s+/g, "-").toLowerCase();
    navigation(`/${formattedCategory}/${formattedSubcategory}`);
    // Close mobile sidebar after navigation
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="mobile-sidebar-toggle lg:hidden fixed top-4 right-4 z-50 p-2 bg-[#0f2b31] border border-[#00d9ff] rounded-md"
        onClick={toggleMobileSidebar}
      >
        <svg className="w-6 h-6 text-[#00d9ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="mobile-overlay lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Close Button */}
        <button
          className="mobile-close-btn lg:hidden absolute top-4 right-4 p-2 text-[#00d9ff] hover:bg-[#0f2b31] rounded-md"
          onClick={closeMobileSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

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
    </>
  );
};

export default Sidebar;