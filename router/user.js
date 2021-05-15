


const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const ControlSession = require('../authentication/authentication');


//home
router.get('/home', UserController.GetIndex);

//Register
router.get('/register', UserController.GetRegister);
router.post('/register', UserController.PostRegister);


//Login
router.get('/login', UserController.GetLogin);
router.post('/login', UserController.PostLogin);


//CreateTeam
router.get('/createteam',ControlSession, UserController.GetCreateTeam);
router.post('/createteam',ControlSession, UserController.PostCreateTeam);

//Acount
router.get('/account',ControlSession,UserController.GetAccount)
router.post('/updateuser',ControlSession,UserController.PostUpdateUser)
router.post('/updatepassword',ControlSession,UserController.PostUpdatePassword)



//GetTeam
router.get('/getteam',ControlSession,UserController.GetTeam)
router.get('/addteammate/:username',ControlSession,UserController.GetAddTeamMate)

//RequestTeam
router.get('/requestteam',ControlSession,UserController.GetRequest)
router.get('/acceptteam/:Id',ControlSession,UserController.AcceptTeam)
router.get('/declineteam/:Id',ControlSession,UserController.DeclineTeam)

//TeamOverviews
router.get('/team/:team',UserController.GetTeamOverviews)

//PlayerOverviews
router.get('/player/:player',ControlSession,UserController.GetPlayerOverviews)


//League

router.get('/league',ControlSession,UserController.GetPlayerOverviews)

module.exports = router;