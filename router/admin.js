const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin');
const ControlSession = require('../authentication/authentication');
const ControlTeamAdmin = require('../authentication/redirect');

//index
router.get('/index', AdminController.GetIndex);


//user
router.get('/users', AdminController.GetUsers);

//ban
router.get('/banuser/:Id', AdminController.GetUserBan);
//router.get('/unbanuser/:Id', AdminController.GetUserDeleteBan);

//edit
router.get('/edit/:Id', AdminController.GetEditUser);
router.post('/edit', AdminController.PostEditUser);

//League
router.get('/league', AdminController.GetLeague);
router.get('/startmatch', AdminController.GetStartMacth);
router.post('/addleague', AdminController.AddLeague);
router.post('/creategame',AdminController.PostCreateGame)


//Team
router.get('/teams', AdminController.GetTeams);
router.get('/editteam/:Id', AdminController.GetEditTeam);
router.post('/editteam', AdminController.PostEditTeam);


//Post
router.get('/posts', AdminController.GetPost);

module.exports = router;