import React, { useEffect } from 'react'
import { CATEGORIES, NEW, UPDATED } from '../constants/categorylist.test'
import useCategory from '../utils/useCategory';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    useEffect(()=>{console.log("sidebar loaded")},)

    const navigation = useNavigate();

    const { category, subcategory } = useCategory();
    
    // Standardized navigation function
    const handleNavigation = (categoryItem, subcat) => {
        console.log(category,"test",subcat)
        const formattedCategory = categoryItem.replace(/\s+/g, "-").toLowerCase();
        const formattedSubcategory = subcat.replace(/\s+/g, "-").toLowerCase();
        console.log(formattedCategory,"test",formattedSubcategory)
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
              const isActive = subcat.toLowerCase() === subcategory.toLowerCase();

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