import React from 'react'
import logo from '../assets/vaporlogo.svg'

const Header = () => {
  return (
    <>
    <div className='header'>
        <div className='logo'>
            <img src={logo} alt="" />
            vapor ui</div>
        <div className='rheader'>
            <input/>
            <button>count</button>
        </div>
    </div>
    </>
  )
}

export default Header