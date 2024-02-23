import axios from '../axios';

export const apiGetSanpham = (params) => axios({
    url: '/product/', //.env
    method: 'get',
    params : params,
})