import React from 'react'
import img1 from "../../assets/images/Dog/dog1.webp"
import img2 from "../../assets/images/Dog/dog2.webp"
import img3 from "../../assets/images/Dog/dog3.webp"
import img4 from "../../assets/images/Dog/dog4.webp"
import img5 from "../../assets/images/Dog/dog5.webp"
import img6 from "../../assets/images/Dog/dog6.webp"
import img7 from "../../assets/images/Dog/dog7.webp"
import img8 from "../../assets/images/Dog/dog8.webp"
import img9 from "../../assets/images/Dog/dog9.webp"

const KippoCardSwiper = () => {
  return (
    <div className="group relative h-[300px] w-[200px] mx-auto rounded-2xl">
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] duration-500 group-hover:z-10 bg-pink-400 group-hover:translate-x-64 group-hover:translate-y-40 group-hover:rotate-[20deg] rounded-lg">
        <img src={img1} alt='Card 5' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] duration-500 group-hover:z-10 bg-yellow-200 group-hover:translate-x-64 group-hover:-translate-y-40 group-hover:rotate-[20deg] rounded-lg">
        <img src={img2} alt='Card 6' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] duration-500 group-hover:z-10 bg-green-400 group-hover:-translate-x-64 group-hover:translate-y-40 group-hover:-rotate-[30deg] rounded-lg">
        <img src={img3} alt='Card 7' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] duration-500 group-hover:z-10 bg-blue-600 group-hover:-translate-x-64 group-hover:-translate-y-40 group-hover:-rotate-[20deg] rounded-lg">
        <img src={img4} alt='Card 8' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl -rotate-12 group-hover:-rotate-12 group-hover:-translate-x-60 group-hover:translate-y-10 duration-500">
        <img src={img5} alt='Card 1' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl  -rotate-6 group-hover:-rotate-6 group-hover:-translate-x-32 group-hover:translate-y-5 duration-500">
        <img src={img6} alt='Card 2' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl rotate-0 group-hover:rotate-0 group-hover:-translate-x-0 group-hover:translate-y-2 duration-500">
        <img src={img7} alt='Card 2' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl rotate-6 group-hover:rotate-6 group-hover:translate-x-32 group-hover:translate-y-5 duration-500">
        <img src={img8} alt='Card 3' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl rotate-12 group-hover:rotate-12 group-hover:translate-x-60 group-hover:translate-y-10 duration-500">
        <img src={img9} alt='Card 4' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
    </div>
  )
}

export default KippoCardSwiper
