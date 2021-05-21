const mongoose = require('mongoose');
const User = require('./user')


const teamSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true
    },
    imgUrl : {
        type : String,
        required : true
    },
    ligid : {
        type : String,
    },
});
// userSchema.methods.clearCart = function () {
//     this.cart = { items: [] };
//     return this.save();
// }



module.exports = mongoose.model('News', teamSchema);
