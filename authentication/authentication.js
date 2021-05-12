module.exports = (req,res,next) => {
    
    if(!req.session.IsLogin)
    {
        console.log('xarabdi',req.session.IsLogin)
        req.session.redirectTo = req.url;
        console.log(req.url)
        return res.redirect('/login');
    }
    next();
}