import React, {memo} from 'react'

const Countdown = ({unit, number}) => {
  return (
    <div className='w-[30%] h-[60px] flex flex-col justify-center text-center items-center bg-[#f4f4f4]'>
        <span>{number}</span>
        <span className='text-xs text-gray-700'>{unit}</span>
    </div>
    
  )
}

export default memo (Countdown)