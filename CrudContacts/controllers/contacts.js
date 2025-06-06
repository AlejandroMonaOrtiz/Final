'use strict'

var Contact = require("../models/contacts");

function createContact(req, resp){
    var contactReqBody = req.body;

    console.log('req.user:', req.user);
    
    var newContact = new Contact();
    newContact.name = contactReqBody.name;
    newContact.lastName = contactReqBody.lastName;
    newContact.landline = contactReqBody.landline;
    newContact.mobilePhone = contactReqBody.mobilePhone;
    newContact.email = contactReqBody.email;
    newContact.userId = req.user._id;

    if( newContact.name === null || newContact.name.trim() === ''
        || newContact.lastName === null || newContact.lastName.trim() === ''
        || newContact.landline === null || newContact.landline <= 0
        || newContact.mobilePhone === null || newContact.mobilePhone <= 0
        || newContact.email === null || newContact.email.trim() === ''
    ){
        resp.status(400).send({'message':'One or more required variables were not sent ' });
    }

    newContact.save().then(
        (savedContact) => {
            resp.status(200).send({'message': 'Contact was created succesfully', 'contact': savedContact});
        },
        err => {
            resp.status(500).send({'message':'An error ocurred while creating the contact', 'error': err });
        }
    );
}

function editContact(req, resp) {
    const contactId = req.params._id;
    const updatedFields = req.body;

    Contact.findOneAndUpdate(
        { _id: contactId, userId: req.user._id }, 
        updatedFields,
        { new: true }
    ).then(
        (editedContact) => {
            if (!editedContact) {
                return resp.status(404).send({ message: 'Contact not found or unauthorized' });
            }

            resp.status(200).send({
                message: 'Contact was edited successfully',
                contact: editedContact
            });
        },
        err => {
            resp.status(500).send({
                message: 'An error occurred while editing the contact',
                error: err
            });
        }
    );
}

function deleteContact(req, resp) {
    const contactId = req.params._id;

    Contact.findOneAndDelete({ _id: contactId, userId: req.user._id }).then(
        (deletedContact) => {
            if (!deletedContact) {
                return resp.status(404).send({ message: 'Contact not found or unauthorized' });
            }

            resp.status(200).send({
                message: 'Contact was deleted successfully',
                contact: deletedContact
            });
        },
        err => {
            resp.status(500).send({
                message: 'An error occurred while deleting the contact',
                error: err
            });
        }
    );
}

function findContactById(req, resp) {
    const contactId = req.params._id;

    Contact.findOne({ _id: contactId, userId: req.user._id }).then(
        (foundContact) => {
            if (!foundContact) {
                return resp.status(404).send({ message: 'Contact not found or unauthorized' });
            }

            resp.status(200).send({ contact: foundContact });
        },
        err => {
            resp.status(500).send({
                message: 'An error occurred while searching the contact',
                error: err
            });
        }
    );
}

function findAllContacts(req, resp) {
    Contact.find({ userId: req.user._id }).then(
        (foundContacts) => {
            resp.status(200).send({ contacts: foundContacts });
        },
        err => {
            resp.status(500).send({
                message: 'An error occurred while searching the contacts',
                error: err
            });
        }
    );
}

module.exports = {
    createContact, editContact, deleteContact, findContactById, findAllContacts
}
