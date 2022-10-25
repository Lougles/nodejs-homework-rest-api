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
  try {
    const {status, message} = await getContactByIdService(req.params.id);
    res.status(status).json(message);
  } catch (e) {
    res.json(e.message)
  }
}

const removeContactController = async (req,res) => {
  try {
    const {status, message} = await removeContactService(req.params.id);
    res.status(status).json(message);
  } catch (e) {
    res.json(e.message)
  }
}

const addContactController = async (req,res) => {
      const {name, email, phone} = req.body;
      const user = { name, email, phone }
      const {status, message} = await addContactService(user)
      res.status(status).json(message);
}

const updateContactController = async (req,res) => {
    const {name, email, phone} = req.body;
    const user = {name, email, phone};
    const {status, message} = await updateContactService(req.params.id, user)
    res.status(status).json(message);
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
}
