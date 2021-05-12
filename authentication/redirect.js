
let url = '';

if (req.session.redirectTo == undefined) url = "/";
else {
  url = req.session.redirectTo;
}




module.exports = (req,res,next) => {

    if (req.session.redirectTo == undefined)
    next();
    else {
        url = req.session.redirectTo;
        res.redirect(url);
        delete req.session.redirectTo;
      }

}