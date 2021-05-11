//Models
const User = require('../model/user')
const Team = require('../model/team');
const e = require('express');


//home
exports.GetIndex = async (req, res, next) => {
    console.log(req.user)
    res.render("home",{
        IsLogin : req.session.IsLogin
    });
};



//Register
exports.GetRegister = async (req, res, next) => {

    res.render("register");
};

exports.PostRegister = async (req, res, next) => {
    try {
        var body = req.body
        console.log(body)
        const password = req.body.password
        if(body.register_password === body.repeat_password)
        {
            const user = new User({
                name :body.first_name,
                surname : body.last_name,
                email : body.register_email,
                password : body.register_password,
                riotid : body.riotid,
                username : body.nick_name,
                rank : body.rank
            })
            user.save()
            .then( result => {
                res.redirect('/login')
            })
        }
        else{
            res.render('error',{
                info : 'Parollar Uygun Deyil',
                info2 : 'Yeniden Qeydiyyatdan Keçin'
            })
    }
    } catch (error) {
        console.log(error)
        res.render('error',{
            info : 'Sitemde Problem YasANDI',
            info2 : `${error}`
        })
    }
};

//Login
exports.GetLogin = async (req, res, next) => {

    res.render("login");
};

exports.PostLogin = async (req, res, next) => {
    console.log(req.body)
    User.findOne({email : req.body.login_email})
    .then(user => {
        if(user)
        {
            if(user.password === req.body.login_password)
            {
                req.session.user = user
                req.session.IsLogin = true
                
                res.redirect('/home')
            }
            else{
                res.json({data : "Sifre yalnisdir"})
            }
        }
        else{
            res.json({data : "bele qeydiyyat yoxdu"})
        }
    })
    .catch(err => {
        console.log(err)
    })
};

//CreateTeam
exports.GetCreateTeam = async (req, res, next) => {

    res.render("createteam");
};


exports.PostCreateTeam = async (req, res, next) => {
    let TeamLogo;
    console.log(req.files.length)
    if(req.files.length === 0)
     TeamLogo = 'duello.zone.jpg'
    else{
        TeamLogo = req.files[0].filename
    }
    console.log(req.body)
    // User.findById(req.body.playerid1)
    // .then(user => {
    //     console.log(user)
    // })
    try {
        const body = req.body
        console.log(req.body)
        const team = new Team({
            name : body.name,
            logo : TeamLogo,
        })
        team.save()
        .then(result => {
            console.log(result)
            res.redirect('/home')
        })
    } catch (error) {
        console.log(error)
    }
        
};


//account
exports.GetAccount = async (req, res, next) => {
    console.log(req.user)
    res.render("account",{
        IsLogin : req.session.IsLogin,
        User : req.user
    });
};

exports.GetUpdateUser = async (req,res,next) => {
    console.log(req.body)
}