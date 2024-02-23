const cloudinary = require('cloudinary').v2; // thư viện quản lý hình ảnh hoàn chỉnh
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // giúp mình lấy ảnh từ client bằng "multer" chọc lên "cloudinary lưu ảnh
const multer = require('multer'); // node.js middleware để xử lý multipart/form-data, được dùng để upload file

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  // lưu ảnh trong folder mình muốn 
  params:{
    folder: 'VTshop'
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
