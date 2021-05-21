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
        type : String,
        required : true,
    }, 
    CreateDate : {
        type : Date,
        default : Date.now,
        required : true
    },
    Paragraf : {
        type : Date,
        default : Date.now,
        required : true
    },
}
);
module.exports = mongoose.model('Post', postSchema);