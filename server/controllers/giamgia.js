const GiamGia = require('../models/giamgia')
const asyncHandler = require('express-async-handler')

const themgiamgia = asyncHandler(async(req, res) => {
    const {name, discount, expiry} = req.body
    if(!name || !discount || !expiry) throw new Error('Missing input')
    const response = await GiamGia.create({
        ...req.body,
        // set ngay het han
        expiry: Date.now() + expiry * 24 * 60 * 60 * 1000
    })
    return res.json({
        success: response ? true : false,
        rs: response ? response: 'không thể tạo giảm giá'
    }) 
})
const layAllgiamgia = asyncHandler(async(req, res) => {
    const response = await GiamGia.find().select('-createdAt -updatedAt')
    return res.json({
        success: response ? true : false,
        rs: response ? response: 'không thể lấy giảm giá'
    }) 
})
const suagiamgia = asyncHandler(async(req, res) => {
    const { gid } = req.params
    if(Object.keys(req.body).length === 0) throw new Error ('Missing input')
        if (req.body.expiry) req.body.expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000
    const response = await GiamGia.findByIdAndUpdate(gid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        rs: response ? response: 'không thể sửa giảm giá'
    }) 
})
const xoagiamgia = asyncHandler(async(req, res) => {
    const { gid } = req.params
    const response = await GiamGia.findByIdAndDelete(gid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        deleted: response ? response: 'không thể xóa giảm giá'
    }) 
})
module.exports = {
    themgiamgia,
    layAllgiamgia,
    suagiamgia,
    xoagiamgia
}