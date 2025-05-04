import React from 'react'

const KippoCardSwiper = ({ images = [], duration = 500, easing = 'ease-in-out' }) => {
  const transitionStyle = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
  }

  return (
    <div className="group relative h-[300px] w-[200px] mx-auto rounded-2xl">
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] group-hover:z-10 bg-pink-400 group-hover:translate-x-64 group-hover:translate-y-40 group-hover:rotate-[20deg] rounded-lg" style={transitionStyle}>
        <img src={images[0]} alt='Card 1' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] group-hover:z-10 bg-yellow-200 group-hover:translate-x-64 group-hover:-translate-y-40 group-hover:rotate-[20deg] rounded-lg" style={transitionStyle}>
        <img src={images[1]} alt='Card 2' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] group-hover:z-10 bg-green-400 group-hover:-translate-x-64 group-hover:translate-y-40 group-hover:-rotate-[30deg] rounded-lg" style={transitionStyle}>
        <img src={images[2]} alt='Card 3' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-[75px] z-0 left-[50px] h-[150px] w-[100px] group-hover:z-10 bg-blue-600 group-hover:-translate-x-64 group-hover:-translate-y-40 group-hover:-rotate-[20deg] rounded-lg" style={transitionStyle}>
        <img src={images[3]} alt='Card 4' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl -rotate-12 group-hover:-rotate-12 group-hover:-translate-x-60 group-hover:translate-y-10" style={transitionStyle}>
        <img src={images[4]} alt='Card 5' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl -rotate-6 group-hover:-rotate-6 group-hover:-translate-x-32 group-hover:translate-y-5" style={transitionStyle}>
        <img src={images[5]} alt='Card 6' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl rotate-0 group-hover:rotate-0 group-hover:-translate-x-0 group-hover:translate-y-2" style={transitionStyle}>
        <img src={images[6]} alt='Card 7' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl rotate-6 group-hover:rotate-6 group-hover:translate-x-32 group-hover:translate-y-5" style={transitionStyle}>
        <img src={images[7]} alt='Card 8' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
      <div className="absolute top-0 z-0 left-0 h-[300px] w-[200px] rounded-2xl rotate-12 group-hover:rotate-12 group-hover:translate-x-60 group-hover:translate-y-10" style={transitionStyle}>
        <img src={images[8]} alt='Card 9' className="h-full w-full object-cover rounded-lg shadow-md" />
      </div>
    </div>
  )
}

export default KippoCardSwiper
