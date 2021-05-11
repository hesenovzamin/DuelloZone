


const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');


//home
router.get('/home', UserController.GetIndex);

//Register
router.get('/register', UserController.GetRegister);
router.post('/register', UserController.PostRegister);


//Login
router.get('/login', UserController.GetLogin);
router.post('/login', UserController.PostLogin);


//CreateTeam
router.get('/createteam', UserController.GetCreateTeam);
router.post('/createteam', UserController.PostCreateTeam);

//Acount
router.get('/account',UserController.GetAccount)
router.post('/updateuser',UserController.GetUpdateUser)
module.exports = router;