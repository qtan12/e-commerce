const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const ctrls = require('../controllers/donhang')

router.post('/', verifyAccessToken, ctrls.themdonhang)
router.put('/status/:dhid',[ verifyAccessToken, isAdmin ], ctrls.capnhattrangthai)
router.get('/', verifyAccessToken, ctrls.laydonhang)
router.get('/admin', [verifyAccessToken, isAdmin], ctrls.layAlldonhang)

module.exports = router