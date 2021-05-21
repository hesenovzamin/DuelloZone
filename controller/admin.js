//Models
const League = require('../model/league')
const User = require('../model/user')
const Team = require('../model/team');
const Match = require('../model/match');
const Post = require('../model/post')
const e = require('express');



//home
exports.GetIndex = async (req, res, next) => {
    res.render('adminpug/index')
    
};

//users

exports.GetUsers = async (req, res, next) => {

    User.find()
    .then(users => {
        
        res.render('adminpug/getuser',{
            users : users
        })
    })
};

//ban
exports.GetUserBan = async (req, res, next) => {

    User.findById(req.params.Id)
    .then(user => {
        if(user)
        {
            var date = new Date();
            console.log(date)
            date.setDate(date.getDate() + 1);
            if(user.BanStatus)
            {
                user.BanDate = user.BanDate.getDate()-1;
                user.BanStatus = false;
            }
            else{
                user.BanStatus = true;
                user.BanDate = date
            }
            user.save()
            .then(result => {
                res.redirect('/admin/users')
            })
        }
        else{
            res.redirect('/admin/users')
        }
    })
};

//Edit
exports.GetEditUser = async (req, res, next) => {

    User.findById(req.params.Id)
    .then(user => {
        if(user)
        {
            res.render('adminpug/edituser',{
                user : user
            }) 
        }
        else{
            res.redirect('/admin/users')
        }
        
    })
};

exports.PostEditUser = async (req, res, next) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.body.Id,req.body)
    .then(result => {
        res.redirect('/admin/users')
    })
    // User.findById(req.params.Id)
    // .then(user => {
    //     if(user)
    //     {
    //         res.render('adminpug/edituser',{
    //             user : user
    //         }) 
    //     }
    //     else{
    //         res.redirect('/admin/users')
    //     }
        
    // })
};


exports.GetLeague = async (req, res, next) => {

    League.find()
    .then(league => {
        
        Team.find()
        .then(teams => {
            res.render('adminpug/getleague',{
                league : league,
                teams : teams
            })
        })
    })
};


exports.AddLeague = async (req, res, next) => {

    const league = new League(req.body)
    league.save()
    .then(result => {
        res.redirect('/admin/league')
    })
};

exports.GetStartMacth = async (req, res, next) => {
    let team1mates
    let team2mates
    //console.log(req.query)
    let team1  = await Team.findById(req.query.Team1Id)
    let team2  = await Team.findById(req.query.Team2Id)
    await  team1.populate('teammates.items.userid').execPopulate()
      .then(mates => {
          team1mates = mates
      })
    await  team2.populate('teammates.items.userid').execPopulate()
     .then(mates => {
         team2mates = mates
     })
    console.log(team2)
    res.render('adminpug/creategame',{
                team1 : team1,
                team2 : team2,

            })
    
};

exports.PostCreateGame = async (req, res, next) => {

    // console.log(req.body)
    // const body = req.body
    // const match = Match({})
};

// GetTeams

exports.PostCreateGame = async (req, res, next) => {

    // console.log(req.body)
    // const body = req.body
    // const match = Match({})
};

//Team
exports.GetTeams = async (req, res, next) => {


        Team.find().populate('teammates.items.userid')
        .populate('AdminId', 'username')
        .then(teams => {
            console.log(teams[0])
                res.render('adminpug/teams',{
                    teams : teams
                })
            
        })
};

exports.GetEditTeam = async (req, res, next) => {

    Team.findById(req.params.Id)
    .populate('teammates.items.userid')
    .populate('AdminId', 'username')
    .then(team => {
        if(team)
        {
            res.render('adminpug/editteam',{
                team : team
            }) 
        }
        else{
            res.redirect('/admin/teams')
        }
        
    })
};





exports.PostEditTeam = async (req, res, next) => {

    Team.findById(req.body.Id)
    .then(async team => {
        if(team)
        {
            console.log(req.files)
            if (!req.files)
            {
                console.log('b')
                team.name = req.body.name
               await team.save();
                res.redirect(`/admin/editteam/${req.body.Id}`)
            }
            else {
                console.log('a')
                team.logo = req.files[0].filename
                team.name = req.body.name
                await team.save();
                res.redirect(`/admin/editteam/${req.body.Id}`)
            }
        }
        else{
            res.redirect('/admin/teams')
        }
        
    })
};

//Post
exports.GetPost = async (req, res, next) => {

    Post.find()
    .then(post => {
        if(post)
        {
            res.render('adminpug/posts',{
                post : post
            }) 
        }
        else{
            res.redirect('/admin/index')
        }
        
    })
};