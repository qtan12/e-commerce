// const {notFound, errHandler} = require('../middleware/errHandler')
const userRouter = require('./user')
const productRouter = require('./product')
const danhmucRouter = require('./danhmuc')
const blogdanhmucRouter = require('./blogdanhmuc')
const blogRouter = require('./blog')
const nhanhangRouter = require('./nhanhang')
const giamgiaRouter = require('./giamgia')
const donhang = require('./donhang')
const insertDataRouter = require('./insertData')
// const donhangRouter = require('./donhang')



function initRoutes(app) {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/danhmuc', danhmucRouter)
    app.use('/api/blogdanhmuc', blogdanhmucRouter)
    app.use('/api/blog', blogRouter)
    app.use('/api/nhanhang', nhanhangRouter)
    app.use('/api/giamgia', giamgiaRouter)
    app.use('/api/donhang', donhang)
    app.use('/api/insertdata', insertDataRouter)
    
    // app.use('/api/donhang', donhangRouter)
    // app.use(notFound)
    // app.use(errHandler)
}

module.exports =initRoutes