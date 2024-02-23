import axios from '../axios'

export const apiGetDanhmuc = () => axios ({
    url: '/danhmuc/',
    method: 'get'
})