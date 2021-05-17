//Models
const User = require('../model/user')
const Team = require('../model/team');
const e = require('express');
const { find } = require('../model/user');


//home
exports.GetIndex = async (req, res, next) => {
    res.render('adminpug/index')
    
};

//users

exports.GetUsers = async (req, res, next) => {
    res.render('adminpug/getuser')
    
};