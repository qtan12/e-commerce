import React from 'react'
import { Outlet } from 'react-router-dom' // component con của Public
import { Hearder, Navigation, TopHeader, Footer } from '../../components' // dùng chung không đổi


const Public = () => {
  return (
    <div className='w-full flex flex-col items-center'>
        <TopHeader/>
        <Hearder/>
        <Navigation/>
      <div className='w-main'>
          <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Public