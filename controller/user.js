//Models
const User = require('../model/user')
const Team = require('../model/team');
const e = require('express');


//home
exports.GetIndex = async (req, res, next) => {
    console.log(req.user)
    res.render("home",{
        IsLogin : req.session.IsLogin,
        User : req.user
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
    let url = '';
    User.findOne({email : req.body.login_email})
    .then(user => {
        if(user)
        {
            if(user.password === req.body.login_password)
            {
                req.session.user = user
                req.session.IsLogin = true

                if (req.session.redirectTo == undefined)
                {
                    url = "/home";
                }   
                else {
                  url = req.session.redirectTo;
                  console.log(url)
                }
                delete req.session.redirectTo;
                res.redirect(url);
                
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

    res.render("createteam",{
        User : req.user
    });
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
            AdminId : req.user._id
        })
        team.save()
        .then(result => {
            User.findById(req.user._id)
            .then(user => {
                user.TeamStatus = true;
                user.TeamAdmin = true;
                user.TeamID = team._id
                user.save()
                .then( teamresult => {
                    res.redirect('/home')
                })

            })
            console.log(result)
            res.redirect('/home')
        })
    } catch (error) {
        console.log(error)
    }
        
};


//account
exports.GetAccount = async (req, res, next) => {
    console.log(req.query)
    let action = "empty";
    if(req.query.action)
    {
        if(req.query.action === "updatepwd")
        {   
            console.log('salam isdedi')
             action = "Your password has been updated..."; 
        }
        else if(req.query.action === "erorpwd")
        {   
            console.log('salam isdedi')
             action = "Your password is either short or not the same ..."; 
        }
        else if(req.query.action === "update")
        {   
            console.log('salam isdedi')
             action = "Your account is update ..."; 
        }
    }
    res.render("account",{
        IsLogin : req.session.IsLogin,
        User : req.user,
        action : action

    });
};

exports.PostUpdateUser = async (req,res,next) => {


    User.findById(req.user._id)
    .then(user => {
        if(req.body.account_first_name)
        user.name = req.body.account_first_name
        if(req.body.account_last_name)
        user.surname = req.body.account_last_name
        if(req.body.account_email)
        user.email = req.body.account_email
        user.save()
        .then(result => {
            res.redirect('/account?action=update')
        })
    })
}

exports.PostUpdatePassword = async (req,res,next) => {
    console.log(req.body)
    const body = req.body
    if(body.account_password === body.account_password_repeat && body.account_password.length > 4)
    {
        User.findById(req.user._id)
        .then(user => {
            user.password = body.account_password 
            user.save()
            .then(result => {
                res.redirect('/account?action=updatepwd')
            })
        })
    }
    else{
        res.redirect('/account?action=erorpwd')
    }
}


//GetTeam
exports.GetTeam = async (req, res, next) => {

    Team.findById(req.user.TeamID)
    .then(team => {
        team.GetTeamMates()
        .then(result => {
            console.log(result)
        })
    })

    res.render("getteam",{
        User : req.user,
        IsLogin : req.session.IsLogin,
    });
};

exports.PostAddTeamMate = async (req, res, next) => {

    console.log(req.body)
    Team.findById(req.user.TeamID)
    .then(team => {
        User.findOne({username : req.body.teammate})
        .then(user => {
            // if(user)
            // {
            //     user.TeamStatus = true;
            //     user.TeamID = team._id
            //     user.save()
            //     .then(result => {
            //         team.AddTeamMates(user)
            //     })
            // }
            // else{
            //     res.json({data : false})
            // }
            var obj = {
                teamid : team._id , userid : req.user._id, 
            }
            user.RequestTeam = obj
            user.save()
            .then(result => {
                res.redirect('/getteam')
            })
        })
    })
};
