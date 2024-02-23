const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogdanhmucSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true, // không đc trùng
        index: true,
    },
    
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Blogdanhmuc', blogdanhmucSchema);