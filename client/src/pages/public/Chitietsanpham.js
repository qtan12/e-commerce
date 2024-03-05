import React from 'react'
import { useParams } from 'react-router-dom'

const Chitietsanpham = () => {
    const {pid, title } = useParams()
    // console.log(pid, title)
    return (
        <div>Chitietsanpham</div>
    )
}

export default Chitietsanpham