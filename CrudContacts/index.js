'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://localhost:27017/desarrolloweb').then(
    () => {
        console.log("Database connection succesful. Starting application");
        application.listen(6549, function(){
            console.log("Application started");
        });
    },
    err => {
        console.log("Error when connecting to database. Application not started. " + err);
    }
);
