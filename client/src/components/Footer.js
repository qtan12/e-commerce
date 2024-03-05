import React, {memo} from 'react'
import icons from '../ultils/icons'

const {MdEmail} = icons

const Footer = () => {
  return (
    // footer mail
    <div className='w-full '>
        <div className='h-[103px] w-full bg-emerald-700 flex items-center justify-center'>
          <div className='w-main flex items-center justify-between'>
            <div className='flex flex-col flex-1'>
              <span className='text-[20px] text-white'>Đăng ký nhanh với email</span>
              <small className='text-[13px] text-gray-300'>Đăng ký ngay và nhận bản tin hàng tuần</small>
            </div>
            <div className='flex-1 flex items-center'>
              <input 
                className=' p-2 pr-1 rounded-l-full w-full bg-[#70BA76] outline-none text-gray-200 placeholder:text-sm placeholder:text-gray-100 placeholder:italic placeholder:opacity-50 '
                type="text" 
                placeholder='Email address'
                />
                <div className='h-[40px] w-[50px] bg-[#70BA76] rounded-r-full justify-center items-center flex text-white  '>
                  <MdEmail size={18} />
                </div>
            </div>
          </div>
        </div>

        {/* footer copyright */}
        <div className='h-[407px] w-full bg-gray-800 flex justify-center py-2 text-white text-[13px]'>
          <div className='w-main flex'>
              {/* ABOUT US */}
            <div className='flex-2 flex flex-col gap-2'>
              <h3 className='mb-[18px] text-[16px] font-medium border-l-2 border-[#EE3131] pl-[15px]'>ABOUT US</h3>
              <span>
                <span>Address: </span>
                <span className='opacity-60'>117, Nguyễn Đệ, An Hòa, Ninh Kiều, Cần Thơ</span>
              </span>

              <span>
                <span>Phone: </span>
                <span className='opacity-60'>(+84) 333352169</span>
              </span>

              <span>
                <span>Mail: </span>
                <span className='opacity-60'>qtan8089@gmail.com</span>
              </span>
            </div>

            {/* INFORMATION */}
            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[16px] font-medium border-l-2 border-[#EE3131] pl-[15px]'>THÔNG TIN</h3>
              <span className='opacity-60'>Địa chỉ cửa hàng</span>
              <span className='opacity-60'>Ưu đãi mõi ngày</span>
              <span className='opacity-60'>Liên hệ</span>
            </div>

            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[16px] font-medium border-l-2 border-[#EE3131] pl-[15px]'>HJJKH</h3>
              <span className='opacity-60'>Giúp đỡ</span>
              <span className='opacity-60'>Free ship</span>
              <span className='opacity-60'>Câu hỏi thường gặp</span>
        
            </div>
            <div>
            <h3 className='mb-[20px] text-[16px] font-medium border-l-2 border-[#EE3131] pl-[15px]'>#VT SHOP</h3>
            </div>
          </div>
        </div>
      </div>
  )
}

export default memo(Footer)