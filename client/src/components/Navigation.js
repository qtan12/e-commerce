import React from 'react'
import { navigation } from '../ultils/Navigation'
import { NavLink } from 'react-router-dom'

// const notActivedStyle = ''
// const activedStyle = ''

const Navigation = () => {
  return (
    <div className='w-main h-[48px] py-2 border-y mb-8 text-sm flex items-center'>
      {navigation.map(el => (
        <NavLink 
          to={el.path}
          key={el.id}
          className= {({isActive}) => isActive ? 'pr-12 hover:text-emerald-700': 'pr-12 hover:text-emerald-700'}
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default Navigation