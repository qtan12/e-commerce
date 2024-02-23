const router = require('express').Router()
const ctrls = require('../controllers/nhanhang')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrls.themnhanhang)
router.get('/',ctrls.layAllnhanhang)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.suanhanhang)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.xoanhanhang)

module.exports = router
