const mongoose = require('mongoose');


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
    RequestTeam : {
        type : Object,
    },
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
});




// userSchema.methods.addToCart = function (product) {
//     const index = this.cart.items.findIndex(cp => {
//         return cp.productId.toString() === product._id.toString()
//     });

//     const updatedCartItems = [...this.cart.items];

//     let itemQuantity = 1;
//     if (index >= 0) {
//         // cart zaten eklenmek istenen product var: quantity'i arttır
//         itemQuantity = this.cart.items[index].quantity + 1;
//         updatedCartItems[index].quantity = itemQuantity;

//     } else {
//         // updatedCartItems!a yeni bir eleman ekle
//         updatedCartItems.push({
//             productId: product._id,
//             quantity: itemQuantity
//         });
//     }

//     this.cart = {
//         items: updatedCartItems
//     };

//     return this.save();
// }

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
