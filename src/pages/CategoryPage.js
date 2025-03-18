import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Display from '../components/Display'

const CategoryPage = () => {
  return (
    <>
    <div className='full-screen'>
        <Header/>
        <div className='category-container'>
        <Sidebar/>
        <Display/>
        </div>
    </div>
    </>
  )
}

export default CategoryPage