const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin');
const ControlAdmin = require('../authentication/controladmin');

//index
router.get('/index' ,ControlAdmin, AdminController.GetIndex);


//user
router.get('/users' ,ControlAdmin, AdminController.GetUsers);

//ban
router.get('/banuser/:Id' ,ControlAdmin, AdminController.GetUserBan);
//router.get('/unbanuser/:Id', AdminController.GetUserDeleteBan);

//edit
router.get('/edit/:Id' ,ControlAdmin, AdminController.GetEditUser);
router.post('/edit' ,ControlAdmin, AdminController.PostEditUser);

//League
router.get('/league' ,ControlAdmin, AdminController.GetLeague);
router.get('/startmatch' ,ControlAdmin, AdminController.GetStartMacth);
router.post('/addleague' ,ControlAdmin, AdminController.AddLeague);
router.post('/creategame' ,ControlAdmin,AdminController.PostCreateGame)


//Team
router.get('/teams' ,ControlAdmin, AdminController.GetTeams);
router.get('/editteam/:Id' ,ControlAdmin, AdminController.GetEditTeam);
router.post('/editteam',ControlAdmin,AdminController.PostEditTeam);


//Post
router.get('/posts' ,ControlAdmin, AdminController.GetPost);
router.post('/addpost' ,ControlAdmin, AdminController.PostPost);
router.get('/editpost/:Id' ,ControlAdmin, AdminController.GetEditPost);
router.post('/editpost' ,ControlAdmin, AdminController.PostEditPost);

module.exports = router;