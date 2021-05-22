const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    
    name : {
        type : String,
        required : true,
    },
    ImgUrl : {
        type : String,
        required : true,
    }, 
    ShowCount : {
        type : Number,
    }, 
    CreateDate : {
        type : Date,
        default : Date.now,
        required : true
    },
    Paragraf : {
        type : String,
        required : true
    },
}
);
module.exports = mongoose.model('Post', postSchema);