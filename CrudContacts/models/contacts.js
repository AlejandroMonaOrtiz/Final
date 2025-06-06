'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = Schema({
    name: String,
    lastName: String,
    landline: Number, // Telefono fijo
    mobilePhone: Number, // celular
    email: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', //
        required: true
    }
});

module.exports = mongoose.model('contacts', ContactSchema);

