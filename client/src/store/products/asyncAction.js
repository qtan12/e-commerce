import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'
                                            // product tên tương ứng với name bên productSlice 
export const getNewProducts = createAsyncThunk('product/newProducts', async(data, {rejectWithValue}) =>{
    const response = await apis.apiGetSanpham({sort: '-createdAt'})
    // console.log(response)

    if(!response.success) return rejectWithValue(response)
    return response.products
})