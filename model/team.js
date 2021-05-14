const mongoose = require('mongoose');
const User = require('./user')


const teamSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true
    },
    logo : {
        type : String,
        required : true
    },
    ligid : {
        type : String,
    },
    createDate : {
        type : Date,
        default : Date.now,
        required : true
    },
    AdminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    teammates: {
        items: [
            {
                userid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
            }
        ]
    },
});

teamSchema.methods.AddTeamMates = function (user) {
    const index = this.teammates.items.findIndex(cp => {
        return cp.userid.toString() === user._id.toString()
    });

    const updatedCartItems = [...this.teammates.items];

    if (index >= 0) {
        // cart zaten eklenmek istenen product var: quantity'i arttır

    } else {
        // updatedCartItems!a yeni bir eleman ekle
        updatedCartItems.push({
            userid: user._id,
        });
    }

    this.teammates = {
        items: updatedCartItems
    };

    return this.save();
}

teamSchema.methods.GetTeamMates = function () {

    const ids = this.teammates.items.map(i => {
        return i.userid;
    });
    return User.find()
        .then(users => {
            return users.map(p => {
                return {
                    name: p.name,
                    email: p.email,
                    riotid: p.riotid,
                    username: p.username,
                    rank: p.rank,
                    surname: p.surname
                }
            });
        });
}

teamSchema.methods.deleteCartItem = function (productid) {
    const cartItems = this.cart.items.filter(item => {
        console.log(String(item.productId),String(productid));
        return String(item.productId) !== String(productid)
    });
    
    this.cart.items = cartItems;
    return this.save();
}

// userSchema.methods.clearCart = function () {
//     this.cart = { items: [] };
//     return this.save();
// }



module.exports = mongoose.model('Team', teamSchema);
