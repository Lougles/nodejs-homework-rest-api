const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService
} = require('../services/contactsService')
const {v4} = require('uuid')


const listContactsController = async (req,res) => {
    const result = await listContactsService();
    res.json(result);
}

const getContactByIdController = async (req,res) => {  
  const {status, message} = await getContactByIdService(req.params.id);
  res.status(status).json(message);
}

const removeContactController = async (req,res) => {
  const {status, message} = await removeContactService(req.params.id);
  res.status(status).json(message);
}

const addContactController = async (req,res) => {
    const {name, email, phone} = req.body;
    const user = { id: v4(), name, email, phone }
    const result = await addContactService(user)
    res.status(201).json(result);
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
