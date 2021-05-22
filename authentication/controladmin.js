
const User = require('../model/user')
module.exports = async (req,res,next) => {
    
    if(req.session.IsLogin)
    {
           await User.findById(req.user._id)
            .then(user => {
                if(user.Admin === true)
                next()
                else{
                    return res.redirect('/home');
                }
            })
        
    }
    else{
        next();
    }
}