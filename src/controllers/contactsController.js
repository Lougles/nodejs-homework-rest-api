const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService
} = require('../services/contactsService')

const listContactsController = async (req,res) => {
    const result = await listContactsService();
    res.json(result);
}

const getContactByIdController = async (req,res) => {
  
}

const removeContactController = async (req,res) => {
  
}

const addContactController = async (req,res) => {
  
}

const updateContactController = async (req,res) => {
  
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
}
