const mongoose = require('mongoose');
const Team = require('./team')


const userSchema = mongoose.Schema({
    name : {
        type : String,
    },
    surname : {
        type : String,
    },
    username : {
        type : String,
        required : true,
        unique: true
    },
    TeamStatus :{
        type : Boolean,
    },
    TeamAdmin :{
        type : Boolean,
    },
    TeamID :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    
    ProfilImg : {
        type : String,
    },
    riotid : {
        type : String,
        required : true,
        unique: true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true 
    },
    rank : {
        type : String,
        required : true
    },
    RequestItem : [

    ],
    CreateDate : {
        type : Date,
        default : Date.now,
        required : true
    },
    resetToken : String,
    // cart: {
    //     items: [
    //         {
    //             productId: {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: 'Product',
    //                 required: true
    //             },
    //             quantity: {
    //                 type: Number,
    //                 required: true
    //             }
    //         }
    //     ]
    // }
    
    
}
);





userSchema.methods.AddRequest = async function (object) {
    const updated = [...this.RequestItem];
    
    const index = await this.RequestItem.findIndex(cp => {

        return cp.object.teamid.toString() === object.teamid.toString()
    });
    if(index < 0)
    {
        console.log('isdedi')
        updated.push({object});
    }
    this.RequestItem = updated

    return this.save();
}

userSchema.methods.RemoveRequest = async function (object) {
    
    const updated = await this.RequestItem.filter(item => {

        return String(item.object.teamid) !== String(object)
    });
    this.RequestItem = updated
    console.log(updated,1)

    return this.save();
}

userSchema.methods.clearRequest = function () {
    this.RequestItem = [];
    return this.save();
}

// userSchema.methods.getCart = function (product) {

//     const ids = this.cart.items.map(i => {
//         return i.productId;
//     });

//     return Product
//         .find({
//             _id: {
//                 $in: ids
//             }
//         })
//         .select('Name Price ImgUrl1')
//         .then(products => {
//             return products.map(p => {
//                 return {
//                     name: p.name,
//                     price: p.price,
//                     imageUrl: p.imageUrl,
//                     quantity: this.cart.items.find(i => {
//                         return i.productId.toString() === p._id.toString()
//                     }).quantity
//                 }
//             });
//         });

// }

// userSchema.methods.deleteCartItem = function (productid) {
//     const cartItems = this.cart.items.filter(item => {
//         console.log(String(item.productId),String(productid));
//         return String(item.productId) !== String(productid)
//     });
    
//     this.cart.items = cartItems;
//     return this.save();
// }

// userSchema.methods.clearCart = function () {
//     this.cart = { items: [] };
//     return this.save();
// }

module.exports = mongoose.model('User', userSchema);
