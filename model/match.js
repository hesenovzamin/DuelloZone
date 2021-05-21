const mongoose = require('mongoose');
const User = require('./user')


const GameSchema = mongoose.Schema({
    Team1Score :{
        type: Number,
        required : true,
    },
    Team2Score :{
        type: Number,
        required : true,
    },
    LeagueId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required : true,
    },
    Team1Id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required : true,
    },
    Team2Id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required : true,
    },
    WinTeamId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required : true,
    },
    CreateDate : {
        type : Date,
        default : Date.now,
        required : true
    },
    Team1Players: {
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
    Team2Players: {
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
GameSchema.methods.AddTeam1Player = function (user) {
    const index = this.Team1Players.items.findIndex(cp => {
        return cp.userid.toString() === user._id.toString()
    });

    const updatedCartItems = [...this.Team1Players.items];

    if (index >= 0) {
        // cart zaten eklenmek istenen product var: quantity'i arttır

    } else {
        // updatedCartItems!a yeni bir eleman ekle
        updatedCartItems.push({
            userid: user._id,
        });
    }

    this.Team1Players = {
        items: updatedCartItems
    };

    return this.save();
}

GameSchema.methods.AddTeam2Player = function (user) {
    const index = this.Team2Players.items.findIndex(cp => {
        return cp.userid.toString() === user._id.toString()
    });

    const updatedCartItems = [...this.Team2Players.items];

    if (index >= 0) {
        // cart zaten eklenmek istenen product var: quantity'i arttır

    } else {
        // updatedCartItems!a yeni bir eleman ekle
        updatedCartItems.push({
            userid: user._id,
        });
    }

    this.Team2Players = {
        items: updatedCartItems
    };

    return this.save();
}


module.exports = mongoose.model('Match', GameSchema);
