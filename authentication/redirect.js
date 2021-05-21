
module.exports = (req,res,next) => {

    if (req.user.TeamAdmin)
    next();
    else {
       res.render('error', {
        info: 'Admin Olmalisan',
        info2: 'Yeniden Yoxlayin'
    })
      }

}