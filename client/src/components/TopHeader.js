import React, {memo} from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const TopHeader = () => {
  return (
    <div className='h-[100px] w-full bg-emerald-700 flex items-center justify-center'>
      <div className='w-main flex items-center justify-between text-xs text-white'>
        <span>MUA HÀNG ONLINE HOẶC GỌI TÔI (+84) 333352169</span>
        <Link className=' hover:text-gray-700 h-[25px] ' to={`/${path.LOGIN}`}>ĐĂNG NHẬP</Link>
      </div>
    </div>
  )
}

export default memo(TopHeader)