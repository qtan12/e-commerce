const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numberViews:{
        type: Number,
        default: 0, // cho trc la 0
    },
    likes:[ //render like
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes:[ //render like
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    image:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/01/31/16/34/blogging-1171731_1280.jpg'
    },
    author:{
        type: String,
        default: 'Admin'
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true}, //
    toObject: {virtuals: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);