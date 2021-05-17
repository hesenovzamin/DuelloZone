


const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin');
const ControlSession = require('../authentication/authentication');
const ControlTeamAdmin = require('../authentication/redirect');

//index
router.get('/index', AdminController.GetIndex);


//user
router.get('/users', AdminController.GetUsers);

module.exports = router;