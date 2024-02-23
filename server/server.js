const express =  require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(cookieParser())
const port = process.env.PORT || 8888
// đọc data gửi về
app.use(express.json())
app.use(express.urlencoded({extended : true}))
dbConnect()
initRoutes(app)

// chạy app 
app.listen(port, () =>{
    console.log('sever running on the port' + port);

})