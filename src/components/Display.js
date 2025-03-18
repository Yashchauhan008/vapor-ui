import React from 'react'

const Display = ({ category, subcategory }) => {
  return (
    <div className='display'>
      <h2>Category: {category}</h2>
      <h3>Subcategory: {subcategory}</h3>
    </div>
  )
}

export default Display