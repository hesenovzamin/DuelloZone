const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
    
    name : {
        type : String,
        required : true,
        unique: true
    },  
}
);
module.exports = mongoose.model('League', leagueSchema);