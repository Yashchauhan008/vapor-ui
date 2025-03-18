import React from 'react'
import { CATEGORIES, NEW, UPDATED } from '../assets/categorylist'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      {/* <h2>Categories</h2> */}
      {CATEGORIES.map((category, index) => (
        <div key={index}>
          <h3>{category.name}</h3>
          <ul>
            {category.subcategories.map((subcategory, subIndex) => {
              // Check if the subcategory is in the NEW or UPDATED lists
              const isNew = NEW.includes(subcategory);
              const isUpdated = UPDATED.includes(subcategory);
              let displayName = subcategory;

              // Append labels if applicable
              if (isNew) {
                displayName += ' (New)';
              }
              if (isUpdated) {
                displayName += ' (Updated)';
              }

              return (
                <li key={subIndex}>{displayName}</li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Sidebar