              //useState: để lưu giá trị, //useEffect: để gọi
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
const Sidebar = () => {
  const {danhmuc } = useSelector(state => state.app )
  // console.log(danhmuc);

  return (
    <div className='flex flex-col border'>
      {danhmuc?.map(el => (
        <NavLink 
        className={({isActive}) => isActive ? 
        'bg-from-green-600 px-5 pt-[15px] pb-[14px] text-sm hover:text-emerald-700' : 
        'px-5 pt-[15px] pb-[14px] hover:text-emerald-700' }  >
          {el.title}
             
          

        </NavLink>
      ))}

    </div>
  )
}


export default Sidebar