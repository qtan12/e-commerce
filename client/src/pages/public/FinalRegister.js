import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import path from '../../ultils/path'
import Swal from 'sweetalert2'


const FinalRegister = () => {
    const {status} = useParams()
    const navigate = useNavigate()

    useEffect (() => {
        if (status ==='failed') Swal.fire('Ối!', 'Đăng ký thất bại, hãy thử lại', 'lỗi').then(() => {
            navigate(`/${path.LOGIN}`)
        })
        if (status ==='success') Swal.fire('Chúc Mừng!', 'Đăng ký thành công', 'Đăng nhập ngay', 'thành công').then(() => {
            navigate(`/${path.LOGIN}`)
        })
    }, [])
    return (
        <div className='h-screen w-scren bg-gray-100'>

        </div>
  )
}

export default FinalRegister