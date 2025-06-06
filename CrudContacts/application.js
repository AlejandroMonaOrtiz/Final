'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var routesContact = require('./routes/contacts');
var routesUser = require('./routes/users');
var cors = require('cors')

var application = express();

application.use(cors())
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({'extended': false}));
application.use(routesContact);
application.use(routesUser);

module.exports = application;
 