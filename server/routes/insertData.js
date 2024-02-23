const router = require('express').Router()
const ctrls = require('../controllers/insertData')


router.post('/sanpham', ctrls.chensanpham)
router.post('/danhmuc', ctrls.chendanhmuc)


module.exports = router