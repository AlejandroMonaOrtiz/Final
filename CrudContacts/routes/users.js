'use strict'

var express = require('express');
var userController = require('../controllers/users');
var routes = express.Router();

routes.post('/api/user', userController.createUser);
routes.post('/api/login', userController.loginUser);

module.exports = routes;
