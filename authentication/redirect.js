
module.exports = (req,res,next) => {

    if (req.session.user.TeamAdmin)
    next();
    else {
       res.render('error', {
        info: 'Admin Olmalisan',
        info2: 'Yeniden Yoxlayin'
    })
      }

}