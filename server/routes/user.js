const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('..//middlewares/verifyToken')

//dinh nghia API
router.post('/register', ctrls.register)
router.get('/finalregister/:token', ctrls.finalRegister)

router.post('/login', ctrls.login)
router.get('/current', verifyAccessToken, ctrls.getCurrent)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.get ('/logout', ctrls.logout)
router.get ('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], ctrls.getAllusers)
router.delete('/', [verifyAccessToken, isAdmin], ctrls.deletetUser)
router.put('/current', verifyAccessToken, ctrls.updateUser)
router.put('/address', [verifyAccessToken], ctrls.updateUserAddress)
router.put('/cart', verifyAccessToken, ctrls.updateCart)
router.put('/:uid', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin)




module.exports = router

//CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - body => data gửi đi sẽ được giấu đi ko bi lộ ra trên trình duyêt
// GET + DELETE - query