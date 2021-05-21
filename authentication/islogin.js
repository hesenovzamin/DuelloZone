module.exports = (req,res,next) => {
    
    if(req.session.IsLogin)
    {
        
        return res.redirect('/home');
    }
    next();
}