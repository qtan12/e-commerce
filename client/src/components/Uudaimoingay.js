import React, { useEffect, useState } from 'react'
import icons from '../ultils/icons'
import { apiGetSanpham } from '../apis/product'
import {formatMoney, renderStar} from '../ultils/helpers'
import { Countdown} from './'
import moment from 'moment/moment'
import { secondsToHms } from '../ultils/helpers'


const { FaStar } = icons 
const { FiMenu } = icons 

let idInterval

const Uudaimoingay = () => {
  const [Uudaimoingay, setUudaimoingay] = useState(null)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [expireTime, setExpireTime] = useState(false)

  const fetchUudaimoingay = async () => {
    const response = await apiGetSanpham({limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5})
    if (response.success ) {
      setUudaimoingay(response.products[0])
      
      const today = `${moment().format('MM/DD/YYYY')} 0:00:00`
      const seconds= new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
      const number = secondsToHms(seconds)

      setHour(number.h) 
      setMinute(number.m)
      setSecond(number.s)
    }else{
      setHour(0) 
      setMinute(59)
      setSecond(59)
    }
  }
  // useEffect(() => {
  //   fetchUudaimoingay()
  // }, [])
  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchUudaimoingay() 
    
  },[expireTime])
  useEffect(() => {
    idInterval = setInterval(() => {
      if(second > 0) setSecond(prev => prev-1)
      else {
        if (minute > 0) {
          setMinute(prev => prev - 1)
          setSecond (59)
        } else {
          if(hour > 0){
            setHour(prev => prev - 1)
            setMinute(59)
            setSecond(59)
          }else {
            setExpireTime(!expireTime)
          }
        }
        
      }
    },1000)
    return () =>{
      clearInterval(idInterval)
    }
  }, [second, minute, hour, expireTime])
  return (
    <div className='border w-full flex-auto'>
      <div className='flex items-center justify-between p-3 '>
        <span className='flex-1 flex justify-center'><FaStar size={20} color='#DD1111'/></span>
        <span className='flex-8 font-semibold text-[20px] text-center '>ƯU ĐÃI MÕI NGÀY</span>
        <span className='flex-1'></span>
      </div>     

       {/* render ra san pham Ưu đãi */}
      <div className='w-full flex flex-col items-center pt-2 gap-2 px-4'>
        <img 
          src={Uudaimoingay?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} 
          alt="" 
          className='w-full object-contain'
        />
        <span className='line-clamp-1'>{Uudaimoingay?.title }</span>
        <span className='flex h-4'> {renderStar(Uudaimoingay?.totalRatings, 20)} </span>
        <span>{`${formatMoney(Uudaimoingay?.price)} VNĐ`}</span>
      </div>

      {/* Bộ đếm giờ ngược, button Options */}
      <div className='px-4 mt-6'>
        <div className='flex justify-center gap-2 items-center mb-8'>
          <Countdown unit={'Hours'} number={hour}/>
          <Countdown unit={'Minutes'} number={minute}/>
          <Countdown unit={'Seconds'} number={second}/>
        </div>
        <button
          type='button'
          className='flex gap-2 items-center justify-center w-full bg-emerald-700 hover:bg-gray-800 text-white font-medium py-2'
          >
          <FiMenu/>
          <span>Options</span>
        </button>
      </div>
    </div>
  )
}

export default Uudaimoingay