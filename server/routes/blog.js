const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const ctrls = require('../controllers/blog')
const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], ctrls.themBlog)
router.get('/', ctrls.layAllBlogs)
router.put('/likes/:bid', [verifyAccessToken], ctrls.likeBlog)
router.put('/dislikes/:bid', [verifyAccessToken], ctrls.dislikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.suaBlog)
router.put('/img/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImgBlog)

router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.xoaBlog)
router.get('/one/:bid', ctrls.layBlog)

module.exports = router