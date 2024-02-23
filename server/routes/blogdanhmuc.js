const router = require('express').Router()
const ctrls = require('../controllers/blogdanhmuc')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrls.themBlogdm)
router.get('/',ctrls.layAllBlogsdm)
router.put('/:bdid', [verifyAccessToken, isAdmin], ctrls.suaBlogdm)
router.delete('/:bdid', [verifyAccessToken, isAdmin], ctrls.xoaBlogdm)

module.exports = router
