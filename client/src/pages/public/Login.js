import React, { useState, useCallback} from 'react'
import { Outlet } from 'react-router-dom' // component con của Public
import { Hearder, Navigation, InputField, Button, Footer } from '../../components' // dùng chung không đổi
import { apiRegister, apiLogin } from '../../apis/user'
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router-dom'
import path from '../../ultils/path'
import {register} from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  console.log(location)
  const [payload, setPayload] = useState({
    firstname:'',
    lastname:'',
    mobile: '',
    email: '',
    password: '',
  })
  const [isRegister, setIsRegister ] = useState(false)
  const resetPayload = () => {
    setPayload({
      firstname:'',
      lastname:'',
      mobile: '',
      email: '',
      password: '',
    })
  }
  const handleSubmit = useCallback(async() =>{
    const {firstname, lastname, phone, ...data} = payload
    // Đăng ký
    if (isRegister) {
      const response = await apiRegister(payload) 
      if (response.success ){
        Swal.fire('Congratulation', response.mes, 'success').then (() => {
          setIsRegister(false)
          resetPayload()
        })
        } else Swal.fire('Oops!', response.mes, 'error')    
    // Đăng nhập
    } else {
      const rs = await apiLogin(data)
      if (rs.success) {
        dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
        navigate(`/${path.TRANGCHU}`)
      } else Swal.fire('Oops!', rs.mes, 'error')
    }
  },[payload, isRegister])
  
  return (
    <div className='w-full flex flex-col items-center'>
        <Hearder/>
        <Navigation/>
      <div className='w-main'>
        <Outlet />
      </div>
      {/* login */}
      <div className='w-screen h-screen relative'>
        <img
          src='https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
          alt=''
          className='w-full h-full object-cover'
        />
        <div className='absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex'>
          <div className='p-8 bg-white rounded-md min-w-[500px] items-center flex flex-col '>
            <h1 className='text-[28px] font-semibold text-emerald-700'>{isRegister? 'Đăng ký' : 'Đăng nhập'}</h1>
           
            { isRegister && <div className='flex items-center gap-2'>

              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey='firstname'
              /> 
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey='lastname'
              />
              
              </div> }
              { isRegister && <InputField
                value={payload.mobile}
                setValue={setPayload}
                nameKey='mobile'
              />}
              <InputField
                value={payload.email}
                setValue={setPayload}
                nameKey='email'
              />
              <InputField
                value={payload.password}
                setValue={setPayload}
                nameKey='password'
                type='password'
              />
              <Button
              name={isRegister ? 'Đăng ký' : 'Tiếp Tục'}
              handleOnClick={handleSubmit}
              fw
              />
              <div className='flex items-center justify-between my-2 w-full text-sm'>
                { !isRegister && <span className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu</span>}
                {/* nếu không có */}
                { !isRegister && <span 
                className='text-blue-500 hover:underline cursor-pointer'
                onClick={() => setIsRegister(true)} 
                >Tạo tài khoản</span> }

                {/* Nếu có */}
                { isRegister && <span 
                className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                onClick={() => setIsRegister(false)} 
                >Quay lại</span> }
              </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Login