import React from 'react'
import logo from '../assets/logo.jpg'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const Hearder = () => {
    const {FaPhoneAlt, MdEmail, FaShoppingCart, FaUser } = icons
  return (
    <div className='w-main flex justify-between h-[132px] py-[35px]'>
            {/* dấu `` tượng trưng cho locoalhost xong / cái tính tới */}
        <Link to={`/${path.TRANGCHU}`}>
            <img src={logo} alt="logo" className='w-[176px] object-contain'/>
        </Link>

        <div className='flex text-[13px] '>
            <div className='flex flex-col px-5 items-center border-r'>
                <span className='flex gap-4 items-center'>
                    <FaPhoneAlt color='red'/>
                    <span className='font-semibold'>(+84) 3333 521 69</span>
                </span>
                <span>Thu2-Thu7 9:00AM - 9:00PM</span>
            </div>

            <div className='flex flex-col items-center px-5 border-r'>
                <span className='flex gap-4 items-center'>
                    <MdEmail color='red'/>
                    <span className='font-semibold'>qtan8089@gmail.com</span>
                </span>
                <span>Online Support 24/7</span>
            </div>

            <div className='flex items-center justify-center gap-2 px-5 border-r'>
                <FaShoppingCart color='red'/>
                <span>0 item(s)</span>
            </div>
            <div className='flex items-center justify-center px-5'>
                <FaUser size={18} />
            </div>
        </div>
    </div>
  )
}

export default Hearder