const NhanHang = require('../models/nhanhang')
const asyncHandler = require('express-async-handler')

const themnhanhang = asyncHandler(async (req, res) => {
    const {title} = req.body
    if (!title) throw new Error ('Missing input')
    const newBrand = await NhanHang.create(req.body)
    return res.status(200).json({
        success: newBrand ? true : false,
        createdBlog: newBrand ? newBrand: ' khong the tao Brand'
    })
})

const layAllnhanhang = asyncHandler(async (req, res) => {
    const response = await NhanHang.find()
    return res.json({
        success: response ? true : false,
        allBrand: response ? response: ' Khong the lay Brand'
    })
})
const suanhanhang = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await NhanHang.findByIdAndUpdate(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedBrand: response ? response : ' Khong the update'
    })
})
const xoanhanhang = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await NhanHang.findByIdAndDelete(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        deletedBrand: response ? `đã xóa thành công: ${response.title}` : 'No delete'
    })
})
module.exports = {
    themnhanhang,
    layAllnhanhang,
    suanhanhang,
    xoanhanhang,
}