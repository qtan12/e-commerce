const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var danhmucSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true, // không đc trùng
        index: true,
    },
    brand: {
        type: Array,
        required: true,
        
    },
    image: {
        type: String,
        required: true,
    }
    
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Danhmuc', danhmucSchema);