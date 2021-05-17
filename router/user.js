


const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const ControlSession = require('../authentication/authentication');
const ControlTeamAdmin = require('../authentication/redirect');


//home
router.get('/zone', UserController.GetHome);
router.get('/home',ControlSession, UserController.GetIndex);

//Register
router.get('/register', UserController.GetRegister);
router.post('/register', UserController.PostRegister);


//Login
router.get('/login', UserController.GetLogin);
router.get('/logout', UserController.Logout);
router.post('/login', UserController.PostLogin);


//CreateTeam
router.get('/createteam',ControlSession, UserController.GetCreateTeam);
router.post('/createteam',ControlSession, UserController.PostCreateTeam);

//Acount
router.get('/account',ControlSession,UserController.GetAccount)
router.post('/updateuser',ControlSession,UserController.PostUpdateUser)
router.post('/updatepassword',ControlSession,UserController.PostUpdatePassword)



//GetTeam
router.get('/getteam',ControlSession,ControlTeamAdmin,UserController.GetTeam)
router.get('/closeinvite',ControlSession,ControlTeamAdmin,UserController.GetCloseTeamInvite)
router.get('/openinvite',ControlSession,ControlTeamAdmin,UserController.GetOpenTeamInvite)
router.get('/addteammate/:username',ControlSession,ControlTeamAdmin,UserController.GetAddTeamMate)

//RequestTeam
router.get('/requestteam',ControlSession,UserController.GetRequest)
router.get('/acceptteam/:Id',ControlSession,UserController.AcceptTeam)
router.get('/declineteam/:Id',ControlSession,UserController.DeclineTeam)
//RequestTeam
router.get('/acceptinvite/:Id',ControlSession,UserController.AcceptUser)
router.get('/removeinvite/:Id',ControlSession,UserController.DeclineUser)
router.get('/removerequest/:Id',ControlSession,UserController.DeclineUserRequest)

//TeamOverviews
router.get('/team/:team',UserController.GetTeamOverviews)

//PlayerOverviews
router.get('/player/:player',ControlSession,UserController.GetPlayerOverviews)
router.get('/sendrequest/:username/:teamname',ControlSession,UserController.GetSendRequestTeam)


//League

router.get('/league',ControlSession,UserController.GetPlayerOverviews)

module.exports = router;