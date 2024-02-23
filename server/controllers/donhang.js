const User =require('../models/User')
const DonHang = require('../models/donhang')
const asyncHandler = require('express-async-handler')
const GiamGia = require('../models/giamgia')



const themdonhang = asyncHandler(async(req, res) => {
    const { _id } = req.user   
    const { coupon } = req.body              //chỉ chọn trường cart và sử dụng phương thức populate để lấy chi tiết thông tin của sản phẩm trong giỏ hàng.
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color
    }))
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
    const createData = {products, total, orderBy:_id}
    if (coupon) {
        const chonmagiamgia = await GiamGia.findById(coupon)
        total = Math.round(total * (1 - +chonmagiamgia?.discount / 100) /1000) * 1000 || total
        createData.total = total
        createData.coupon = coupon
    }
    console.log(total)
    const rs = await DonHang.create(createData)
    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'không thể tạo đơn hàng'

    })
})
const capnhattrangthai = asyncHandler(async(req, res) => {
    const { dhid } = req.params
    const { status } = req.body
    if ( !status ) throw new Error ('Lỗi truyền vào')
    const rs = await DonHang.findByIdAndUpdate(dhid, {status}, {new: true})
    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'Lỗi'
    })
})
const laydonhang = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const response = await DonHang.find({orderBy: _id})
    return res.json({
        success: response ? true : false,
        rs: response ? response : ' Lỗi '
    })
})
const layAlldonhang = asyncHandler(async(req, res) => {
    const response = await DonHang.find()
    return res.json({
        success: response ? true : false,
        rs: response ? response : ' Lỗi '
    })
})


module.exports = {
    themdonhang,
    capnhattrangthai,
    laydonhang,
    layAlldonhang

}