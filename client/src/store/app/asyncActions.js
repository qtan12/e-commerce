import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const layDanhmuc = createAsyncThunk('app/danhmuc', async(data, {rejectWithValue}) =>{
    const response = await apis.apiGetDanhmuc()
    // console.log(response)

    if(!response.success) return rejectWithValue(response)
    return response.danhmuc // payload bên appSlice
})