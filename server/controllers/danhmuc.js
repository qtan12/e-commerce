const Danhmuc = require('../models/danhmuc')
const asyncHandler = require('express-async-handler')

const themdanhmuc = asyncHandler(async (req, res) => {
    const newCategory = await Danhmuc.create(req.body)
    return res.status(200).json({
        success: newCategory ? true : false,
        taodanhmuc: newCategory ? newCategory: ' khong the tao danh muc'
    })
})

const layAlldanhmuc = asyncHandler(async (req, res) => {
    const response = await Danhmuc.find()
    return res.json({
        success: response ? true : false,
        danhmuc: response ? response: ' Khong the lay danh muc'
    })
})
const suadanhmuc = asyncHandler(async (req, res) => {
    const { cid } = req.params
    const response = await Danhmuc.findByIdAndUpdate(cid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        capnhatdanhmuc: response ? response : ' Khong the update'
    })
})
const xoadanhmuc = asyncHandler(async (req, res) => {
    const { cid } = req.params
    const deletedCategory = await Danhmuc.findByIdAndDelete(cid, req.body, {new: true})
    return res.json({
        success: deletedCategory ? true : false,
        daxoadanhmuc: deletedCategory ? `đã xóa thành công: ${deletedCategory.title}` : 'No delete'
    })
})
module.exports = {
    themdanhmuc,
    layAlldanhmuc,
    suadanhmuc,
    xoadanhmuc,
    
}