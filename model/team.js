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
    RequestStatus : {
        type : Boolean,
        default : true
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
    RequestItem : [
        
    ],
    InviteItem : [
        
    ],
});


teamSchema.methods.AddRequest = async function (object) {
    const updated = [...this.RequestItem];
    
    const index = await this.RequestItem.findIndex(cp => {

        return cp.object.userid.toString() === object.userid.toString()
    });
    if(index < 0)
    {
        console.log('isdedi')
        updated.push({object});
    }
    this.RequestItem = updated

    return this.save();
}

teamSchema.methods.RemoveRequest = async function (object) {
    
    const updated = await this.RequestItem.filter(item => {

        return String(item.object.userid) !== String(object)
    });
    this.RequestItem = updated
    console.log(updated,1)

    return this.save();
}

teamSchema.methods.clearRequest = function () {
    this.RequestItem = [];
    return this.save();
}


teamSchema.methods.AddInvite = async function (object) {
    const updated = [...this.InviteItem];
    
    const index = await this.InviteItem.findIndex(cp => {

        return cp.object.userid.toString() === object.userid.toString()
    });
    if(index < 0)
    {
        console.log('isdedi')
        updated.push({object});
    }
    this.InviteItem = updated

    return this.save();
}

teamSchema.methods.RemoveInvite = async function (object) {
    
    const updated = await this.InviteItem.filter(item => {

        return String(item.object.userid) !== String(object)
    });
    this.InviteItem = updated
    console.log(updated,1)

    return this.save();
}

teamSchema.methods.clearInvite = function () {
    this.InviteItem = [];
    return this.save();
}



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
