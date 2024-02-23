const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true, //bỏ dấu cách hai đầu
    },
    slug:{
        type:String,
        required:true,
        // unique:true,
        lowercase:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:Array,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    thumb: {
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        // type:mongoose.Types.ObjectId, // ObjectId liên kết đến Id của bảng nào?
        // ref: 'Category' // liên kết đến bảng Category này
    },
    quantity:{
        type:Number,
        default: 0,
    },
    sold:{
        type:Number,
        default: 0,
    },
    images:{
        type:Array,
    },
    color:{
        type:String,
        require: true
    },
    ratings:[ // đánh giá,
        {
            //số sao
            star: {type: Number},
            // người đánh giá
            postedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
            comment: {type: String}
        }
    ],
    // số điểm đánh giá
    totalRatings: { 
        type: Number,
        default: 0,
    }

}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);