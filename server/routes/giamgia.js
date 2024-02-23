const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const ctrls = require('../controllers/giamgia')

router.post('/', [verifyAccessToken, isAdmin], ctrls.themgiamgia)
router.get('/', ctrls.layAllgiamgia)
router.put('/:gid', [verifyAccessToken, isAdmin] ,ctrls.suagiamgia)
router.delete('/:gid', [verifyAccessToken, isAdmin] ,ctrls.xoagiamgia)

module.exports = router