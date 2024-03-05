import React, {memo} from 'react'

const Button = ({name, handleOnClick, style, iconBefore, iconAfter, fw}) => {
  return (
    <button 
        type='button'
        className={style ? style: `px-4 py-2 rounded-md text-white bg-emerald-700 text-semibold my-2 ${fw ? 'w-full' : 'w-fit' }`}
        onClick={() => {handleOnClick && handleOnClick()}}
    >
        {iconBefore}
        <span>{name}</span>
        {iconAfter}
    </button>
  )
}

export default memo(Button)