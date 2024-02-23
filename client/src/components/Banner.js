import React from 'react'
import banner from '../assets/banner.jpg'
const Banner = () => {
  return (
    <div className='w-full'>
      <img src={banner} alt="Banner" className='h-[294px] w-full object-cover'/>
      
    </div>
  )
}

export default Banner