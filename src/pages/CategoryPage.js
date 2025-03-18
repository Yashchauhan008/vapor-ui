import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Display from '../components/Display'

const CategoryPage = () => {
    const { category, subcategory } = useParams()

    return (
        <>
        <div className='full-screen'>
            <Header/>
            <div className='category-container'>
            <Sidebar/>
            <Display category={category} subcategory={subcategory}/>
            </div>
        </div>
        </>
    )
}

export default CategoryPage