const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const themBlog = asyncHandler(async (req, res) => {
    const {title, description, category} = req.body
    if (!title || !description || !category) throw new Error ('Missing input')
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response: ' khong the tao blog'
    })
})
const layAllBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.json({
        success: response ? true : false,
        allBlogs: response ? response: ' Khong the lay blog'
    })
})
const suaBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error ('Missing input')
    const response = await Blog.findByIdAndUpdate(bid, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response: ' khong the tao blog'
    })
})

const xoaBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await Blog.findByIdAndDelete(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        deletedBlog: response ? `đã xóa thành công: ${response.title}` : 'No delete'
    })
})
/* LIKE // DISLIKE
    khi người dùng like một bài blog thì:
    1. Check xem người dùng đó trước đó có dislike hay không (tức là like like lại khi bỏ dislike trc đó)
    => bỏ dislike ( bỏ trạng thái trước đó mới cập nhật trạng thái kế tiếp)
    2. Check xem người dùng trước đó có like hay không :
        + Nếu like => bỏ like
        + Nếu chưa => thêm like
*/
const likeBlog = asyncHandler(async(req, res) =>{
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing input')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true: false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid,{ $pull: { likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }

})
const dislikeBlog = asyncHandler(async(req, res) =>{
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing input')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true: false,
            rs: response
        })
    }
    const isDisLiked = blog?.dislikes?.find(el => el.toString() === _id)
    if (isDisLiked) {
        const response = await Blog.findByIdAndUpdate(bid,{ $pull: { dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }

})
const layBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params 
    //trong bảng likes và dislikes lấy những trường sau
    const blog = await Blog.findByIdAndUpdate(bid /*, { $inc: {numberViews: 1} }, { new: true } */ )
        .populate('likes', 'firstname lastname email ')
        .populate('dislikes', 'firstname lastname email')
    return res.json({
        success: blog ? true : false,
        rs: blog
    })
})
const uploadImgBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params
    if(!req.file) throw new Error ('Missing input')
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true})
    return res.status(200).json({
        success: response ? true : false,
        rs: response ? response : 'không thể up ảnh blog'
    })
})
module.exports = {
    themBlog,
    layAllBlogs,
    suaBlog,
    xoaBlog,
    likeBlog,
    dislikeBlog,
    layBlog,
    uploadImgBlog,



}
