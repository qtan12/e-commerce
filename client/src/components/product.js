import React, {useState} from 'react'
import {formatMoney} from '../ultils/helpers'
import labelnew from '../assets/new.png'
import labeltrending from '../assets/trending.png'
import {renderStar} from '../ultils/helpers'
import {SelectOption} from './'
import icons from '../ultils/icons'

const { FaEye, FiMenu, FaHeart } = icons

const Product = ({productData, isNew}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px] py-[8px]'>
      <div 
      className='w-full border p-[15px] flex flex-col items-center'
      onMouseEnter={e => {
        e.stopPropagation()
        setIsShowOption(true)
      }}
      onMouseLeave={e => {
        e.stopPropagation()
        setIsShowOption(false)
      }}
      >

        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-4 animate-slide-top'>
            <SelectOption icon= {<FaHeart/>} />
            <SelectOption icon= {<FiMenu/>} />
            <SelectOption icon = {<FaEye/>} />
          </div>}
          <img src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} 
              alt="" 
              className='w-[274px] h-[274px] object-cover'
            />
            
            <img src={isNew ? labelnew : labeltrending} alt="" className= {`absolute object-contain ${isNew ? 'top-[-48px] left-[-26px] w-[94px] h-[100px]' : 'top-[-48px] left-[-26px] w-[94px] h-[100px]'}`}/>
        </div>
        {/* sao đáng giá, giá tiền */}
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
          <span className='flex h-4'> {renderStar(productData?.totalRatings)?.map((el, index) => (
                  <span key={index}> {el} </span>
                ))} </span>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
          
        </div>
      </div>
    </div>

  )
}

export default Product