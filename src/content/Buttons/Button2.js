import React from 'react'

const Button2 = ({ children }) => {
  return (
    <>
    <button className='group'>
        <div className=''>
            <span className='absolute'>{children}</span>
            <span className='absolute'>{children}</span>
        </div>
    </button>
    </>
  )
}

export default Button2