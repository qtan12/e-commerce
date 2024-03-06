import React from 'react'
import { Sidebar, Banner, BestSeller, Uudaimoingay, FeatureProduct, CustomSlider  } from '../../components'
import {useSelector } from 'react-redux'
import icons from '../../ultils/icons'

const {IoIosArrowForward} = icons 

const Trangchu = () => {
  const {newProducts} = useSelector(state => state.products)
  const {danhmuc} = useSelector(state => state.app)
  const {isLoggedIn, current} = useSelector(state => state.user)
  console.log({isLoggedIn, current})
  return (
    <>
      <div className='w-main flex'>
        <div className='flex flex-col gap-8 w-[25%] flex-auto'>
          <Sidebar/>
          <Uudaimoingay/>
        </div>
        <div className='flex flex-col gap-8 pl-5 w-[75%] flex-auto'>
          <Banner/>
          <BestSeller/>
        </div>
    </div>
    <div className='my-8'>
      <FeatureProduct/>
    </div>

    <div className=' w-full my-8 '>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-emerald-700' >SẢN PHẨM MỚI </h3>
      <div className='mt-4 mx-[-10px] '>
        <CustomSlider
          product={newProducts}
        />
          
      </div>
    </div>
    <div className='my-8 w-full'>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-emerald-700'> SƯU TẬP HOT</h3>
      <div className='flex flex-wrap gap-4 '>
        {danhmuc?.filter(el=> el.brand.length > 0)?.map(el => (
          <div
            key={el._id}
            className = 'w-1/4 flex-auto'
          >
            <div className='border flex gap-4 p-4 mt-4 min-h-[200px]'>
              <img src={el?.image} alt="" className='w-[144px] h-[129px] object-cover'/>
              <div className='flex-1 text-gray-700'>
                <h4 className='font-semibold uppercase'>{el?.title}</h4>
                <ul className='text-sm'>
                  {el?.brand?.map(item => (
                    <span className='flex gap-1 items-center text-gray-500'>
                      <IoIosArrowForward size ={14}/>
                      <li key={item}>{item}</li>
                    </span>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className=' w-full my-8 '>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-emerald-700'> BlOG POSTS</h3>
    </div>
  
    </>
  )
}

export default Trangchu