'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var {response} = require('express');
var secret = 'secret@777';

function generateToken(user){
    var payload = {
        sub : user._id,
        name : user.email,
        iat : moment().unix(),
        exp : moment().add('2', 'hours').unix()
    }

    return jwt.encode(payload, secret);
}

function validateToken(req, resp, nextStep){
    try{
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);

        console.log('Token decodificado:', payload);

        req.user = { _id: payload.sub };

        console.log('req.user en middleware:', req.user);
        
        nextStep();
    }
    catch(ex){
        resp.status(403).send({message: 'Invalid token'});
    }
}

module.exports = { generateToken, validateToken }
