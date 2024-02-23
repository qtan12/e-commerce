const Blogdanhmuc = require('../models/blogdanhmuc')
const asyncHandler = require('express-async-handler')

const themBlogdm = asyncHandler(async (req, res) => {
    const newBlog = await Blogdanhmuc.create(req.body)
    return res.status(200).json({
        success: newBlog ? true : false,
        createdBlog: newBlog ? newBlog: ' khong the tao blog'
    })
})

const layAllBlogsdm = asyncHandler(async (req, res) => {
    const response = await Blogdanhmuc.find().select('title _id')
    return res.json({
        success: response ? true : false,
        allBlogs: response ? response: ' Khong the lay blog'
    })
})
const suaBlogdm = asyncHandler(async (req, res) => {
    const { bdid } = req.params
    const response = await Blogdanhmuc.findByIdAndUpdate(bdid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedBlog: response ? response : ' Khong the update'
    })
})
const xoaBlogdm = asyncHandler(async (req, res) => {
    const { bdid } = req.params
    const response = await Blogdanhmuc.findByIdAndDelete(bdid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        deletedBlogdm: response ? `đã xóa thành công: ${response.title}` : 'No delete'
    })
})
module.exports = {
    themBlogdm,
    layAllBlogsdm,
    suaBlogdm,
    xoaBlogdm
}