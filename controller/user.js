//Models
const User = require('../model/user')
const Team = require('../model/team');
const e = require('express');
const { find } = require('../model/user');


//home

exports.GetIndex = async (req, res, next) => {
    let userteam;
    if (req.session.IsLogin) {
        await req.user
            .populate('TeamID', 'name')
            .execPopulate()
            .then(user => {
                console.log(user)
                userteam = user
                res.render("home", {
                    IsLogin: req.session.IsLogin,
                    User: userteam
                });
            })
            .catch(err => {
                console.log(err)
                res.render('error', {
                    info: 'Sitemde Seflik Oldu',
                    info2: 'Yeniden Yoxlayin'
                })

            })
    }
    
};

exports.GetHome = async (req, res, next) => {

    res.render("duellozone");
};



//Register
exports.GetRegister = async (req, res, next) => {

    if(req.session.IsLogin)
    res.redirect('/home')
    else{
        res.render("register");
    }
};

exports.PostRegister = async (req, res, next) => {
    try {
        var body = req.body
        console.log(body)
        const password = req.body.password
        if (body.register_password === body.repeat_password) {
            const user = new User({
                name: body.first_name,
                surname: body.last_name,
                email: body.register_email,
                password: body.register_password,
                riotid: body.riotid,
                username: body.nick_name,
                rank: body.rank
            })
            user.save()
                .then(result => {
                    res.redirect('/login')
                })
                .catch(err => {
                    res.render('error', {
                        info: 'Sitemde Seflik Oldu',
                        info2: 'Yeniden Yoxlayin'
                    })
                })
        }
        else {
            res.render('error', {
                info: 'Parollar Uygun Deyil',
                info2: 'Yeniden Qeydiyyatdan Keçin'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('error', {
            info: 'Sitemde Problem YasANDI',
            info2: `${error}`
        })
    }
};

//Login
exports.GetLogin = async (req, res, next) => {

    if(req.session.IsLogin)
    res.redirect('/home')
    else{
        res.render("login");
    }
};

exports.PostLogin = async (req, res, next) => {
    console.log(req.body)
    let url = '';
    User.findOne({ email: req.body.login_email })
        .then(user => {
            if (user) {
                if (user.password === req.body.login_password) {
                    req.session.user = user
                    req.session.IsLogin = true

                    if (req.session.redirectTo == undefined) {
                        url = "/home";
                    }
                    else {
                        url = req.session.redirectTo;
                        console.log(url)
                    }
                    delete req.session.redirectTo;
                    res.redirect(url);

                }
                else {
                    res.render('error', {
                        info: 'Şifrə yalnisdir',
                        info2: 'Sifre Yalnisdir'
                    })
                }
            }
            else {
                res.render('error', {
                    info: 'Email Qeydiyatda yoxdur',
                    info2: 'Email Qeydiyyatda yoxdur'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.render('error', {
                info: 'Sitemde Seflik Oldu',
                info2: 'Yeniden Yoxlayin'
            })
        })
};

//CreateTeam
exports.GetCreateTeam = async (req, res, next) => {
    try {
        let userteam;
        await req.user
        .populate('TeamID', 'name')
        .execPopulate()
        .then(user => {
            console.log(user)
            userteam = user
            res.render("createteam", {
                IsLogin: req.session.IsLogin,
                User: userteam
            });
            
        })
    } catch (error) {
        console.log(error)
        res.render('error', {
            info: 'Sitemde Seflik Oldu',
            info2: 'Yeniden Yoxlayin'
        })
    }
   
};

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect("/login");
    });
  };

exports.PostCreateTeam = async (req, res, next) => {
    let TeamLogo;
    console.log(req.files.length)
    if (req.files.length === 0)
        TeamLogo = 'duello.zone.jpg'
    else {
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
            name: body.name,
            logo: TeamLogo,
            AdminId: req.user._id
        })
        team.save()
            .then(result => {
                User.findById(req.user._id)
                    .then(user => {
                        user.TeamStatus = true;
                        user.TeamAdmin = true;
                        user.TeamID = team._id
                        user.save()
                        team.AddTeamMates(user)
                            .then(teamresult => {
                                res.redirect('/home')
                            })

                    })
                console.log(result)
                res.redirect('/home')
            })
    } catch (error) {
        console.log(error)
        res.render('error', {
            info: 'Sitemde Seflik Oldu',
            info2: 'Yeniden Yoxlayin'
        })
    }

};


//account
exports.GetAccount = async (req, res, next) => {
    console.log(req.query)
    let action = "empty";
    if (req.query.action) {
        if (req.query.action === "updatepwd") {
            console.log('salam isdedi')
            action = "Your password has been updated...";
        }
        else if (req.query.action === "erorpwd") {
            console.log('salam isdedi')
            action = "Your password is either short or not the same ...";
        }
        else if (req.query.action === "update") {
            console.log('salam isdedi')
            action = "Your account is update ...";
        }
    }
    res.render("account", {
        IsLogin: req.session.IsLogin,
        User: req.user,
        action: action

    });
};

exports.PostUpdateUser = async (req, res, next) => {


    User.findById(req.user._id)
        .then(user => {
            if (req.body.account_first_name)
                user.name = req.body.account_first_name
            if (req.body.account_last_name)
                user.surname = req.body.account_last_name
            if (req.body.account_email)
                user.email = req.body.account_email
            user.save()
                .then(result => {
                    res.redirect('/account?action=update')
                })
        })
}

exports.PostUpdatePassword = async (req, res, next) => {
    console.log(req.body)
    const body = req.body
    if (body.account_password === body.account_password_repeat && body.account_password.length > 4) {
        User.findById(req.user._id)
            .then(user => {
                user.password = body.account_password
                user.save()
                    .then(result => {
                        res.redirect('/account?action=updatepwd')
                    })
            })
    }
    else {
        res.redirect('/account?action=erorpwd')
    }
}


//GetTeam
exports.GetTeam = async (req, res, next) => {
    if (req.user.TeamAdmin) {

        let requseridarr = []
        let useridarr = []
        let inviteuserid = []
        // await req.user.RequestItem.forEach(element => {
        //     teamidarr.push(element.object.teamid)
        // });
        Team.findById(req.user.TeamID)
            .then(async team => {
                await team.RequestItem.forEach(element => {
                    requseridarr.push(element.object.userid)
                });
                console.log(requseridarr)
                User.find({
                    _id: {
                        $in: requseridarr
                    }
                })
                    .then(requsers => {
                        Team.findById(req.user.TeamID)
                            .then(async team => {
                                await team.teammates.items.forEach(element => {
                                    useridarr.push(element.userid)
                                });
                                User.find({
                                    _id: {
                                        $in: useridarr
                                    }
                                })
                                    .then( async users => {

                                        await team.InviteItem.forEach(element => {
                                            inviteuserid.push(element.object.userid)
                                        })
                                        User.find({_id : { $in : inviteuserid}})
                                        .then(inviteduser =>{
                                            console.log(inviteduser.length,1)
                                            res.render("getteam", {
                                                User: req.user,
                                                IsLogin: req.session.IsLogin,
                                                requsers: requsers,
                                                users : users,
                                                inviteduser : inviteduser
                                            });
                                        })
                                       
                                    })
                            })
                    })
            })




        // Team.findById(req.user.TeamID)
        // .then(team => {
        //     res.render("getteam",{
        //         User : req.user,
        //         IsLogin : req.session.IsLogin,
        //     });
        // })
    }
    else {
        res.render('error', {
            info: 'Peyserliy eleme sen bura girenmersen',
            info2: `Peyserliy eleme`,
            User: req.user,
            IsLogin: req.session.IsLogin,
        })
    }
};

exports.GetAddTeamMate = async (req, res, next) => {

    console.log(req.params.username)
    Team.findById(req.user.TeamID)
        .then(team => {
            User.findOne({ username: req.params.username })
                .then(async user => {
                    if (user) {
                        if (!user.TeamStatus) {
                            var obj = {
                                teamid: team._id, userid: user._id,
                            }
                            console.log(user)
                            await user.AddRequest(obj)
                            await team.AddRequest(obj)
                        }
                        else {
                            res.render('error', {
                                info: 'Qeydiyyat Problemi',
                                info2: `Bu username teami var direme`
                            })
                        }
                    }
                    else {
                        res.json({ data: false })
                    }

                    res.redirect('/getteam')
                })
        })
};


//RequestTeam 
exports.GetRequest = async (req, res, next) => {

    let teamidarr = []
    await req.user.RequestItem.forEach(element => {
        teamidarr.push(element.object.teamid)
    });
    console.log(teamidarr)
    Team.find({
        _id: {
            $in: teamidarr
        }
    }).populate("AdminId", "name")
        .then(teams => {
            console.log(teams)
            res.render("requestteam", {
                User: req.user,
                IsLogin: req.session.IsLogin,
                teams: teams
            });
        })

};

exports.AcceptTeam = async (req, res, next) => {

    Team.findById(req.params.Id)
        .then(team => {
            User.findById(req.user._id)
                .then(async user => {
                    team.AddTeamMates(user)
                    user.TeamStatus = true;
                    user.TeamID = team._id
                    await user.clearRequest()
                    await team.RemoveRequest(user._id)
                    res.redirect('/requestteam')
                })

        })

};

exports.DeclineTeam = async (req, res, next) => {

    User.findById(req.user._id)
        .then(async user => {
            await user.RemoveRequest(req.params.Id)
            Team.findById(req.params.Id)
            .then(async team => {
                console.log(team)
                await team.RemoveRequest(req.user._id)
                res.redirect('/requestteam')
            })
            
        })

};

exports.DeclineUserRequest = async (req, res, next) => {

    User.findById(req.params.Id)
        .then(async user => {
            console.log(req.user.TeamID)
            Team.findById(req.user.TeamID)
            .then(async team => {
                console.log(team)
                await user.RemoveRequest(req.user.TeamID)
                await team.RemoveRequest(req.params.Id)
                res.redirect('/getteam')
            })
            
        })
        

};

//GetTeam

exports.GetTeamOverviews = async (req, res, next) => {
    let userteam;
    if (req.session.IsLogin) {
        await req.user
            .populate('TeamID', 'name')
            .execPopulate()
            .then(user => {
                userteam = user
            })
    }
    Team.findOne({ name: req.params.team })
        .then(team => {
            console.log(userteam)
            team.populate('teammates.items.userid')
                .execPopulate()
                .then(result => {
                    console.log(result)
                    res.render('teamoverviews', {
                        team: result,
                        teammates: result.teammates.items,
                        IsLogin: req.session.IsLogin,
                        User: userteam
                    })
                })
        })
};

//GetPlayer
exports.GetPlayerOverviews = async (req, res, next) => {
    let userteam;
    let teamlength
    if (req.session.IsLogin) {
        await req.user
            .populate('TeamID', 'name')
            .execPopulate()
            .then(user => {
                userteam = user
                console.log(userteam)
                Team.findById(userteam.TeamID._id)
                    .then(team => {
                        teamlength = team.teammates.items.length
                        User.findOne({ username: req.params.player })
                            .then(player => {
                                res.render('playeroverview', {
                                    player: player,
                                    IsLogin: req.session.IsLogin,
                                    User: userteam,
                                    teamlength: teamlength
                                })
                            })
                    })
            })
    }

};

exports.GetSendRequestTeam = async (req, res, next) => {

    Team.findOne({name : req.params.teamname})
        .then(team => {
            User.findOne({ username: req.params.username })
                .then(async user => {
                    if (user) {
                        if (!user.TeamStatus) {
                            var obj = {
                                teamid: team._id, userid: user._id,
                            }
                            console.log(user)
                            await user.AddInvite(obj)
                            await team.AddInvite(obj)
                        }
                        else {
                            res.render('error', {
                                info: 'Qeydiyyat Problemi',
                                info2: `Bu username teami var direme`
                            })
                        }
                    }
                    else {
                        res.json({ data: false })
                    }

                    res.redirect('/getteam')
                })
        })
};


//TeamInviteControl
exports.AcceptUser = async (req, res, next) => {

    Team.findById(req.user.TeamID)
        .then(team => {
            User.findById(req.params.Id)
                .then(async user => {
                    team.AddTeamMates(user)
                    user.TeamStatus = true;
                    user.TeamID = team._id
                    await user.clearRequest()
                    await team.RemoveInvite(user._id)
                    res.redirect('/getteam')
                })

        })

};

exports.DeclineUser = async (req, res, next) => {

    User.findById(req.params.Id)
        .then(async user => {
            await user.RemoveInvite(req.user.TeamID)
            Team.findById(req.user.TeamID)
            .then(async team => {
                console.log(team)
                await team.RemoveInvite(user._id)
                res.redirect('/getteam')
            })
            
        })

};