const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


//dinh nghia API
router.post('/', [verifyAccessToken, isAdmin], ctrls.themsanpham)
router.get('/:pid', ctrls.lay1sanpham)
router.get('/', ctrls.layAllsanpham)
router.put('/ratings', verifyAccessToken, ctrls.danhgia)
router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.suasanpham)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.xoasanpham)
router.put('/uploadimg/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), ctrls.uploadImgProduct)

module.exports = router

//CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - body => data gửi đi sẽ được giấu đi ko bi lộ ra trên trình duyêt
// GET + DELETE - query