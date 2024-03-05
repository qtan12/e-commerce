const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('..//middlewares//jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')
const makeToken = require('uniqid')
//-----------đăng kí người dùng-----------//
// const register = asyncHandler(async(req,res) =>{
//     const {email, password, firstname, lastname} = req.body
//     if(!email || !password || !firstname || !lastname) 
//         return res.status(400).json({
//             success: false,
//             mes: 'Missing input'
//         })
//     const user = await User.findOne({ email: email})
//     if (user)  throw new Error('Người dùng đã tồn tại!')
    
//     else {
//         const newUser = await User.create(req.body)
//         return res.status(200).json({
//             success: newUser ? true : false,
//             mes: newUser ? 'Đăng ký thành công. Tiếp tục' : 'đã xảy ra sự cố'
//         })
//     }
// })
const register = asyncHandler(async(req, res) => {
    const { email, password, firstname, lastname, mobile} = req.body
    if(!email || !password || !firstname || !lastname || !mobile)
    return res.status(400).json({
        success: false,
        mes: 'Điền vào chỗ trống'
    })
    const user = await User.findOne({ email: email})
    if (user)  throw new Error('Người dùng đã tồn tại!')
    
    else {
        const token = makeToken() 
        res.cookie('dataRegister', {...req.body, token}, {httpOnly: true, maxAge:  15 * 60 * 1000})
        const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
        <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`
        await sendMail({email, html, subject: 'Hoàn tất đăng ký'})
        return res.json({
            success: true,
            mes: 'Hãy kiểm tra mail của bạn '
        })
    }
   
})
const finalRegister = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    const { token } = req.params
    if (!cookie ||cookie?.dataregister?.token !== token ) return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    const newUser = await User.create({
        email: cookie?.dataregister?.email,
        password: cookie?.dataregister?.password,
        mobile: cookie?.dataregister?.mobile,
        firstname: cookie?.dataregister?.firstname,
        lastname: cookie?.dataregister?.lastname,
    })
    if (newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
})
//-----------Login----------//
// Refresh token => cấp mới access token
// Access token => xác thực người dùng, phân quyền người dùng
const login = asyncHandler(async(req,res) =>{
    const {email, password} = req.body
    if(!email || !password) 
        return res.status(400).json({
            success: false,
            mes: 'Missing input'
        })

    const response = await User.findOne({email: email})
    if (response && await response.isCorrectPassword(password)){
        // tach password va role ra khoi response
        const {password, role, refreshToken, ...userData} = response.toObject()
        // tao acc token 
        const accessToken = generateAccessToken(response._id, role)
        // tao refresh token
        const newrefreshToken = generateRefreshToken(response._id)
        // Luu refresh token vao database
        await User.findByIdAndUpdate(response._id, {refreshToken: newrefreshToken}, {new: true})
        // luu refesh token vao cookie 
        res.cookie('refreshToken', newrefreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000})

        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else{
        throw new Error('xac thuc khong hop le!')
    }
})
// lấy thông tin của 1 user
const getCurrent = asyncHandler(async(req,res) =>{
    const { _id} = req.user              // select - loại bỏ
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user: 'User not found'
    })
})

const refreshAccessToken = asyncHandler(async(req,res) =>{
    //Lấy token từ cookies
    const cookie = req.cookies
    // check xem có token hay khôngkhông
    if (cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // check token có hợp lệ ko 
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token khong khop'
        })
})
//--------Đăng xuất---------//
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Xóa refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})
//---------OTP password-----------//
// client gửi email
// server check email có hợp lệ hay không => gửi email + kèm theo link ( password thay đổi token)
// client check mail => click link
// client gửi api kèm token
// ckeck token có giống với token mà server gửi mail hay không 
// change password

const forgotPassword  = asyncHandler(async(req, res) => {
    const {email} = req.query
    if (!email) throw new Error ('Missing email')
    const user = await User.findOne ({email})
    if (!user) throw new Error ('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save() // lưu trong db

    //
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`
    const data = {
        email,
        html,
        subject: 'quên mật khẩu'
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('lỗi đầu vào')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined // xóa
    user.passwordChangeAt = Date.now()
    user.passwordResetExpires = undefined // xóa
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'cập nhật mật khẩu thành công' : 'đã xảy ra lỗi'
    })
})
const getAllusers = asyncHandler(async(req, res) => {
    const response = await User.find()
    return res.status(200).json({
        success: response ? true : false,
        user: response
    })
})
const deletetUser = asyncHandler(async(req, res) => {
    const { _id} = req.query
    if (!_id) throw new Error('Missing inputs')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} delete` : 'No user delete'
    })
})
const updateUser = asyncHandler(async(req, res) => {
    const { _id} = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs( lỗi truyền vào)')
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'some thing wrong'
    })
})
const updateUserByAdmin = asyncHandler(async(req, res) => {
    const { uid} = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs( lỗi truyền vào)')
    const response = await User.findByIdAndUpdate(uid, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'some thing wrong'
    })
})
const updateUserAddress = asyncHandler(async(req, res) => {
    const { _id } = req.user
    if (!req.body.address ) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, {$push: { address: req.body.address }}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'some thing wrong'
    })
})
const updateCart = asyncHandler(async(req, res) => {
    const { _id } = req.user    
    const {pid, quantity, color } = req.body
    if (!pid || !quantity || !color) throw new Error('Missing input')
    const user = await User.findById(_id).select('cart') //Lấy trường cart trong User
    //-- kiểm tra sản phẩm đã có trong giỏ hàng chưa?
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
    if (alreadyProduct){
        if (alreadyProduct.color === color) {
            const response = await User.updateOne({cart: {$elemMatch:alreadyProduct}}, {$set: {"cart.$.quantity": quantity}}, {new: true})
            return res.status(200).json({
                success: response ? true : false,
                rs: response ? response: 'Lỗi'
            })
        }else{
            const response = await User.findByIdAndUpdate(_id, {$push: {cart: { product: pid, quantity, color}}}, {new: true})
            return res.status(200).json({
                success: response ? true : false,
                rs: response ? response : 'Lỗi'
        })
        }
    }else { // nếu chưa có
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: { product: pid, quantity, color}}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            rs: response ? response : 'Lỗi'
        })
    }
})

module.exports ={
    register,
    login,
    getCurrent,
    refreshAccessToken, 
    logout,
    forgotPassword,
    resetPassword,
    getAllusers,
    deletetUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart,
    finalRegister,
}