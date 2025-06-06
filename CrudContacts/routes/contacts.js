'use strict'

var express = require('express');
var contactController = require('../controllers/contacts');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/contact', token.validateToken , contactController.createContact); 
routes.put('/api/contact/:_id', token.validateToken , contactController.editContact); 
routes.delete('/api/contact/:_id', token.validateToken , contactController.deleteContact);
routes.get('/api/contact/:_id', token.validateToken , contactController.findContactById); 
routes.get('/api/contacts', token.validateToken , contactController.findAllContacts);

module.exports = routes;
