import React from 'react'
import { CATEGORIES, NEW, UPDATED } from '../assets/categorylist'
import useCategory from '../utils/useCategory';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigation = useNavigate();

    const { category, subcategory } = useCategory();
    
    // Standardized navigation function
    const handleNavigation = (categoryItem, subcat) => {
        const formattedCategory = categoryItem.replace(/\s+/g, "-").toLowerCase();
        const formattedSubcategory = subcat.replace(/\s+/g, "-").toLowerCase();
        navigation(`/${formattedCategory}/${formattedSubcategory}`);
      };
      

    return (
    <div className='sidebar'>
      {CATEGORIES.map((categoryItem, index) => (
        <div key={index}>
          <h3>{categoryItem.name}</h3>
          <div className='sub-category'>
            {categoryItem.subcategories.map((subcat, subIndex) => {
              // Check if the subcategory is in the NEW or UPDATED lists
              const isNew = NEW.includes(subcat);
              const isUpdated = UPDATED.includes(subcat);
              // Determine if the current subcategory is active
              const isActive = subcat === subcategory;

              return (
                <h4 
                  key={subIndex} 
                  className={isActive ? 'active' : ''} 
                  onClick={() => handleNavigation(categoryItem.name, subcat)} // Use the standardized function
                >
                  {subcat}
                  {isNew && <span className="new">New</span>}
                  {isUpdated && <span className="updated">Updated</span>}
                </h4>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar