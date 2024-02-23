const router = require('express').Router()
const ctrls = require('../controllers/danhmuc')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrls.themdanhmuc)
router.get('/',ctrls.layAlldanhmuc)
router.put('/:cid', [verifyAccessToken, isAdmin], ctrls.suadanhmuc)
router.delete('/:cid', [verifyAccessToken, isAdmin], ctrls.xoadanhmuc)

module.exports = router
